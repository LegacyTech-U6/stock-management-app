<template>
  <div class="low-stock-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Low Stock Alert</h1>
        <p class="page-subtitle">
          {{ lowStockProducts.length }} products below minimum stock levels
        </p>
      </div>
      <div class="header-stats">
        <div class="stat-badge warning">
          <span class="stat-number">{{ lowStockProducts.length }}</span>
          <span class="stat-label">Low Stock</span>
        </div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <div class="summary-card warning">
        <div class="summary-icon">📦</div>
        <div class="summary-content">
          <div class="summary-value">{{ totalUnitsNeeded }}</div>
          <div class="summary-label">Total Units Needed</div>
        </div>
      </div>
      <div class="summary-card info">
        <div class="summary-icon">💰</div>
        <div class="summary-content">
          <div class="summary-value">${{ formatCurrency(totalReorderCost) }}</div>
          <div class="summary-label">Est. Reorder Cost</div>
        </div>
      </div>
      <div class="summary-card critical">
        <div class="summary-icon">⚡</div>
        <div class="summary-content">
          <div class="summary-value">{{ urgentRestockCount }}</div>
          <div class="summary-label">Urgent Restocks</div>
        </div>
      </div>
    </div>

    <!-- Controls Section -->
    <div class="controls-section">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search low stock products..."
          class="search-input"
        />
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="filter-controls">
        <div class="filter-group">
          <label class="filter-label">Stock Level:</label>
          <select v-model="stockLevelFilter" class="filter-select">
            <option value="all">All Low Stock</option>
            <option value="critical">Critical Only</option>
            <option value="warning">Warning Only</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">Sort by:</label>
          <select v-model="sortBy" class="filter-select">
            <option value="urgency">Most Urgent</option>
            <option value="unitsNeeded">Most Units Needed</option>
            <option value="reorderCost">Highest Reorder Cost</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <LowStockCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @restock="handleRestock"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <div class="empty-icon">✅</div>
      <h3>No Low Stock Products</h3>
      <p>All products are adequately stocked. Excellent inventory management!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LowStockCard from '@/components/LowStockCard.vue'

// Reactive data
const searchQuery = ref('')
const stockLevelFilter = ref('all')
const sortBy = ref('urgency')

// Mock data - replace with actual API call
const lowStockProducts = ref([
  {
    id: 1,
    name: 'Wireless Earbuds',
    sku: 'WEB-2024-PRO',
    category: 'Audio Equipment',
    currentStock: 5,
    minStock: 20,
    unitPrice: 149.99,
    supplier: 'AudioTech Ltd',
    leadTime: 7,
    reorderCost: 2999.80,
    stockLevel: 'critical', // critical, warning
    lastSold: '2024-01-15',
    image: '/api/placeholder/80/80'
  },
  {
    id: 2,
    name: 'Gaming Monitor',
    sku: 'GM-27-144Hz',
    category: 'Peripherals',
    currentStock: 8,
    minStock: 15,
    unitPrice: 299.99,
    supplier: 'DisplayPro',
    leadTime: 14,
    reorderCost: 3599.88,
    stockLevel: 'warning',
    lastSold: '2024-01-10',
    image: '/api/placeholder/80/80'
  }
])

// Computed properties
const totalUnitsNeeded = computed(() => {
  return lowStockProducts.value.reduce((sum, p) => sum + (p.minStock - p.currentStock), 0)
})

const totalReorderCost = computed(() => {
  return lowStockProducts.value.reduce((sum, p) => sum + p.reorderCost, 0)
})

const urgentRestockCount = computed(() => {
  return lowStockProducts.value.filter(p => p.stockLevel === 'critical').length
})

const filteredProducts = computed(() => {
  let filtered = lowStockProducts.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.supplier.toLowerCase().includes(query)
    )
  }

  // Stock level filter
  if (stockLevelFilter.value !== 'all') {
    filtered = filtered.filter(p => p.stockLevel === stockLevelFilter.value)
  }

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'urgency':
        return (a.stockLevel === 'critical' ? 1 : 0) - (b.stockLevel === 'critical' ? 1 : 0) ||
               (b.minStock - b.currentStock) - (a.minStock - a.currentStock)
      case 'unitsNeeded':
        return (b.minStock - b.currentStock) - (a.minStock - a.currentStock)
      case 'reorderCost':
        return b.reorderCost - a.reorderCost
      default:
        return 0
    }
  })

  return filtered
})

// Methods
const handleRestock = (product) => {
  console.log('Restock low stock product:', product)
  // Implement restock logic
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

onMounted(() => {
  // Fetch low stock products from API
})
</script>

<style scoped>
.low-stock-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  color: #d97706;
}

.stat-badge.warning {
  background: #fffbeb;
  border: 2px solid #fed7aa;
  color: #d97706;
}

.summary-card.info {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.summary-card.warning {
  background: #fffbeb;
  border-color: #fed7aa;
}

.summary-card.critical {
  background: #fef2f2;
  border-color: #fecaca;
}

/* Reuse styles from OutOfStockPage with color adjustments */
.controls-section,
.products-grid,
.empty-state {
  /* Same styles as OutOfStockPage but with warning colors */
}

@media (max-width: 768px) {
  .low-stock-page {
    padding: 1rem;
  }
}
</style>
