<template>
  <div class="low-stock-card" :class="product.stockLevel">
    <div class="card-header">
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <span class="product-sku">{{ product.sku }}</span>
      </div>
      <div class="stock-badge" :class="product.stockLevel">
        {{ product.stockLevel === 'critical' ? 'CRITICAL' : 'LOW STOCK' }}
      </div>
    </div>

    <div class="stock-indicator">
      <div class="stock-bar">
        <div
          class="stock-fill"
          :class="product.stockLevel"
          :style="{ width: stockPercentage + '%' }"
        ></div>
      </div>
      <div class="stock-numbers">
        <span class="current-stock">{{ product.currentStock }}</span>
        <span class="stock-separator">/</span>
        <span class="min-stock">{{ product.minStock }}</span>
      </div>
    </div>

    <div class="card-content">
      <div class="product-meta">
        <span class="category">{{ product.category }}</span>
        <span class="units-needed">{{ unitsNeeded }} units needed</span>
      </div>

      <div class="product-details">
        <div class="detail-row">
          <span class="detail-label">Unit Price:</span>
          <span class="detail-value">${{ formatCurrency(product.unitPrice) }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Supplier:</span>
          <span class="detail-value">{{ product.supplier }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Lead Time:</span>
          <span class="detail-value">{{ product.leadTime }} days</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Last Sold:</span>
          <span class="detail-value">{{ formatDate(product.lastSold) }}</span>
        </div>
      </div>

      <div class="reorder-info">
        <div class="reorder-label">Est. Reorder Cost</div>
        <div class="reorder-amount">${{ formatCurrency(product.reorderCost) }}</div>
      </div>
    </div>

    <div class="card-footer">
      <button class="btn-restock" @click="$emit('restock', product)">
        <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 12V8H4v4m16 0H4m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2" stroke="currentColor" stroke-width="2"/>
        </svg>
        Order Now
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['restock'])

const stockPercentage = computed(() => {
  return (props.product.currentStock / props.product.minStock) * 100
})

const unitsNeeded = computed(() => {
  return props.product.minStock - props.product.currentStock
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US')
}
</script>

<style scoped>
.low-stock-card {
  background: white;
  border: 2px solid #fed7aa;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.low-stock-card.critical {
  border-color: #fecaca;
  background: linear-gradient(135deg, #fef2f2 0%, #fef7ed 100%);
}

.low-stock-card.warning {
  border-color: #fed7aa;
  background: linear-gradient(135deg, #fffbeb 0%, #fef7ed 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.product-sku {
  font-size: 0.75rem;
  color: #6b7280;
  font-family: monospace;
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.stock-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stock-badge.critical {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.stock-badge.warning {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fed7aa;
}

.stock-indicator {
  margin-bottom: 1rem;
}

.stock-bar {
  width: 100%;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.stock-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.stock-fill.critical {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.stock-fill.warning {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.stock-numbers {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.current-stock {
  color: #dc2626;
}

.min-stock {
  color: #059669;
}

.stock-separator {
  color: #9ca3af;
}

.card-content {
  margin-bottom: 1.5rem;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
}

.category {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.units-needed {
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 600;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.reorder-info {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
}

.reorder-label {
  font-size: 0.75rem;
  color: #475569;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.reorder-amount {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-restock {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #d97706;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-restock:hover {
  background: #b45309;
}

.low-stock-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
