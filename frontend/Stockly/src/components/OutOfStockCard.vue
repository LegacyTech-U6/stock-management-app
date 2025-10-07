<template>
  <div class="out-of-stock-card" :class="{ 'high-value': product.isHighValue, 'selected': selected }">
    <div class="card-header">
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <span class="product-sku">{{ product.sku }}</span>
      </div>
      <div class="card-actions">
        <input
          type="checkbox"
          :checked="selected"
          @change="$emit('select', product.id)"
          class="selection-checkbox"
        />
        <span class="status-badge" :class="product.isHighValue ? 'high-value' : 'critical'">
          {{ product.isHighValue ? 'HIGH VALUE' : 'OUT OF STOCK' }}
        </span>
      </div>
    </div>

    <div class="card-content">
      <div class="product-meta">
        <span class="category">{{ product.category }}</span>
        <span class="days-empty">{{ product.daysEmpty }} days empty</span>
      </div>

      <div class="product-details">
        <div class="detail-row">
          <span class="detail-label">Unit Price:</span>
          <span class="detail-value">${{ formatCurrency(product.unitPrice) }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Min Stock Needed:</span>
          <span class="detail-value">{{ product.minStockNeeded }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Supplier:</span>
          <span class="detail-value">{{ product.supplier }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Last Restocked:</span>
          <span class="detail-value">{{ formatDate(product.lastRestocked) }}</span>
        </div>
      </div>

      <div class="revenue-loss">
        <div class="loss-label">Est. Lost Revenue</div>
        <div class="loss-amount">${{ formatCurrency(product.lostRevenue) }}</div>
      </div>
    </div>

    <div class="card-footer">
      <button class="btn-restock" @click="$emit('restock', product)">
        <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 12V8H4v4m16 0H4m16 0a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2" stroke="currentColor" stroke-width="2"/>
        </svg>
        Restock Now
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select', 'restock'])

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
.out-of-stock-card {
  background: white;
  border: 2px solid #fecaca;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.out-of-stock-card.high-value {
  border-color: #fcd34d;
  background: linear-gradient(135deg, #fffbf0 0%, #fff7ed 100%);
}

.out-of-stock-card.selected {
  border-color: #3b82f6;
  background: #eff6ff;
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

.card-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.selection-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.critical {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.status-badge.high-value {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fed7aa;
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

.days-empty {
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

.revenue-loss {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
}

.loss-label {
  font-size: 0.75rem;
  color: #dc2626;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.loss-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #dc2626;
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
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-restock:hover {
  background: #b91c1c;
}

.btn-icon {
  flex-shrink: 0;
}

.out-of-stock-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
