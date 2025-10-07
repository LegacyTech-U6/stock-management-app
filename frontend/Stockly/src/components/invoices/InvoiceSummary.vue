<template>
  <div class="invoice-summary">
    <div class="summary-grid">
      <div class="summary-row">
        <span class="label">Subtotal:</span>
        <span class="value">${{ formatCurrency(subtotal) }}</span>
      </div>

      <div v-if="discount > 0" class="summary-row discount-row">
        <span class="label">
          Discount ({{ discount }}%):
        </span>
        <span class="value discount-value">- ${{ formatCurrency(discountAmount) }}</span>
      </div>

      <div class="summary-row">
        <span class="label">Tax ({{ taxRate }}%):</span>
        <span class="value">${{ formatCurrency(taxAmount) }}</span>
      </div>

      <div class="summary-divider"></div>

      <div class="summary-row total-row">
        <span class="total-label">Total Amount:</span>
        <span class="total-value">${{ formatCurrency(total) }}</span>
      </div>

      <div class="summary-row balance-row">
        <span class="label">Balance Due:</span>
        <span class="value balance-value">${{ formatCurrency(total) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  discount: { type: Number, default: 0 },
  taxRate: { type: Number, default: 0 }
})

const subtotal = computed(() =>
  props.items.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0)
)

const discountAmount = computed(() =>
  parseFloat(((subtotal.value * props.discount) / 100).toFixed(2))
)

const taxAmount = computed(() =>
  parseFloat(((subtotal.value - discountAmount.value) * props.taxRate / 100).toFixed(2))
)

const total = computed(() =>
  parseFloat((subtotal.value - discountAmount.value + taxAmount.value).toFixed(2))
)

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}
</script>

<style scoped>
.invoice-summary {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.summary-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.summary-row:not(.total-row):not(.balance-row) {
  border-bottom: 1px solid #f1f5f9;
}

.label {
  color: #64748b;
  font-weight: 500;
  font-size: 0.875rem;
}

.value {
  color: #475569;
  font-weight: 600;
  font-size: 0.875rem;
}

.discount-row .label {
  color: #dc2626;
}

.discount-value {
  color: #dc2626;
  font-weight: 600;
}

.summary-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
  margin: 0.5rem 0;
}

.total-row {
  padding: 1rem 0;
  background: white;
  margin: 0 -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.total-label {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.total-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #059669;
}

.balance-row {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #eff6ff;
  border-radius: 8px;
  border: 1px solid #dbeafe;
}

.balance-row .label {
  color: #1e40af;
  font-weight: 600;
}

.balance-value {
  color: #1e40af;
  font-weight: 700;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .invoice-summary {
    padding: 1rem;
  }

  .total-row {
    margin: 0 -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .total-value {
    font-size: 1.25rem;
  }
}

@media print {
  .invoice-summary {
    background: none;
    border: 1px solid #d1d5db;
  }

  .balance-row {
    background: #f3f4f6;
    border: 1px solid #d1d5db;
  }
}
</style>
