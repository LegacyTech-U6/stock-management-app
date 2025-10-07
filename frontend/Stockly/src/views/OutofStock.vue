<template>
  <div class="out-of-stock-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Out of Stock Emergency</h1>
        <p class="page-subtitle">
          {{ outOfStockProducts.length }} products completely sold out -
          {{ highValueOutOfStockCount }} high-value items
        </p>
      </div>
      <div class="header-stats">
        <div class="stat-badge critical">
          <span class="stat-number">{{ outOfStockProducts.length }}</span>
          <span class="stat-label">Out of Stock</span>
        </div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <div class="summary-card critical">
        <div class="summary-icon">💰</div>
        <div class="summary-content">
          <div class="summary-value">${{ formatCurrency(totalLostRevenue) }}</div>
          <div class="summary-label">Est. Lost Revenue</div>
        </div>
      </div>
      <div class="summary-card warning">
        <div class="summary-icon">📅</div>
        <div class="summary-content">
          <div class="summary-value">{{ Math.round(averageDaysEmpty) }}</div>
          <div class="summary-label">Avg Days Empty</div>
        </div>
      </div>
      <div class="summary-card high-value">
        <div class="summary-icon">⚡</div>
        <div class="summary-content">
          <div class="summary-value">{{ highValueOutOfStockCount }}</div>
          <div class="summary-label">High Value Items</div>
        </div>
      </div>
    </div>

    <!-- Controls Section -->
    <div class="controls-section">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products, SKU, or supplier..."
          class="search-input"
        />
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="filter-controls">
        <div class="filter-group">
          <label class="filter-label">Categories:</label>
          <select v-model="selectedCategory" class="filter-select">
            <option value="all">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">Sort by:</label>
          <select v-model="sortBy" class="filter-select">
            <option value="daysEmpty">Longest Out of Stock</option>
            <option value="lostRevenue">Highest Lost Revenue</option>
            <option value="unitPrice">Highest Unit Price</option>
          </select>
        </div>

        <label class="checkbox-label">
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
          <span class="checkmark"></span>
          Select All
        </label>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <OutOfStockCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :selected="selectedProducts.includes(product.id)"
        @select="toggleProductSelection"
        @restock="handleRestock"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <div class="empty-icon">🎉</div>
      <h3>No Out of Stock Products</h3>
      <p>All products are currently in stock. Great job!</p>
    </div>

    <!-- Bulk Actions -->
    <div v-if="selectedProducts.length > 0" class="bulk-actions">
      <div class="bulk-info">
        {{ selectedProducts.length }} products selected
      </div>
      <div class="bulk-buttons">
        <button class="btn-secondary" @click="clearSelection">
          Clear Selection
        </button>
        <button class="btn-primary" @click="bulkRestock">
          <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 12V8H4v4m16 0H4m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2" stroke="currentColor" stroke-width="2"/>
          </svg>
          Restock Selected
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import OutOfStockCard from '@/components/OutOfStockCard.vue'

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('daysEmpty')
const selectAll = ref(false)
const selectedProducts = ref([])

// Mock data - replace with actual API call
const outOfStockProducts = ref([
  {
    id: 1,
    name: 'Wireless Gaming Mouse',
    sku: 'WGM-2024-RCB',
    category: 'Peripherals',
    unitPrice: 79.99,
    minStockNeeded: 15,
    supplier: 'Peripheral Plus',
    lastRestocked: '2023-12-28',
    daysEmpty: 649,
    lostRevenue: 1199.85,
    image: '/api/placeholder/80/80',
    isHighValue: true
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    sku: 'MK-2024-BLK',
    category: 'Peripherals',
    unitPrice: 129.99,
    minStockNeeded: 10,
    supplier: 'KeyTech Inc',
    lastRestocked: '2023-11-15',
    daysEmpty: 684,
    lostRevenue: 2599.80,
    image: '/api/placeholder/80/80',
    isHighValue: true
  }
])

// Computed properties
const categories = computed(() => {
  return [...new Set(outOfStockProducts.value.map(p => p.category))]
})

const highValueOutOfStockCount = computed(() => {
  return outOfStockProducts.value.filter(p => p.isHighValue).length
})

const totalLostRevenue = computed(() => {
  return outOfStockProducts.value.reduce((sum, p) => sum + p.lostRevenue, 0)
})

const averageDaysEmpty = computed(() => {
  if (outOfStockProducts.value.length === 0) return 0
  return outOfStockProducts.value.reduce((sum, p) => sum + p.daysEmpty, 0) / outOfStockProducts.value.length
})

const filteredProducts = computed(() => {
  let filtered = outOfStockProducts.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.supplier.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'daysEmpty':
        return b.daysEmpty - a.daysEmpty
      case 'lostRevenue':
        return b.lostRevenue - a.lostRevenue
      case 'unitPrice':
        return b.unitPrice - a.unitPrice
      default:
        return 0
    }
  })

  return filtered
})

// Methods
const toggleProductSelection = (productId) => {
  const index = selectedProducts.value.indexOf(productId)
  if (index > -1) {
    selectedProducts.value.splice(index, 1)
  } else {
    selectedProducts.value.push(productId)
  }
  updateSelectAllState()
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedProducts.value = filteredProducts.value.map(p => p.id)
  } else {
    selectedProducts.value = []
  }
}

const updateSelectAllState = () => {
  selectAll.value = selectedProducts.value.length === filteredProducts.value.length && filteredProducts.value.length > 0
}

const clearSelection = () => {
  selectedProducts.value = []
  selectAll.value = false
}

const handleRestock = (product) => {
  console.log('Restock product:', product)
  // Implement restock logic
}

const bulkRestock = () => {
  console.log('Bulk restock products:', selectedProducts.value)
  // Implement bulk restock logic
  clearSelection()
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

onMounted(() => {
  // Fetch out of stock products from API
})
</script>

<style scoped>
.out-of-stock-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #dc2626;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0;
}

.header-stats {
  flex-shrink: 0;
}

.stat-badge {
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  min-width: 120px;
}

.stat-badge.critical {
  background: #fef2f2;
  border: 2px solid #fecaca;
  color: #dc2626;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid;
}

.summary-card.critical {
  background: #fef2f2;
  border-color: #fecaca;
}

.summary-card.warning {
  background: #fffbeb;
  border-color: #fed7aa;
}

.summary-card.high-value {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.summary-icon {
  font-size: 2rem;
}

.summary-content {
  flex: 1;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.summary-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.controls-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
}

.search-box {
  position: relative;
  max-width: 400px;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.bulk-actions {
  position: sticky;
  bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bulk-info {
  font-weight: 600;
  color: #374151;
}

.bulk-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-secondary, .btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-primary {
  background: #dc2626;
  color: white;
}

.btn-primary:hover {
  background: #b91c1c;
}

.btn-icon {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .out-of-stock-page {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .bulk-actions {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
