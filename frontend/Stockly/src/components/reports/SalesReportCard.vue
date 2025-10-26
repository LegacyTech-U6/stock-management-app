<template>
  <div class="bg-white shadow-md rounded-lg p-5 mb-5 hover:shadow-lg transition">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-lg font-semibold text-gray-800">{{ report.date }}</h3>
      <span class="text-sm text-gray-500">Transactions: {{ report.transactions }}</span>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
      <div>
        <p class="text-sm text-gray-500">Total Sales</p>
        <p class="text-xl font-bold text-green-600">{{ formatCurrency(report.total_sales) }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Items Sold</p>
        <p class="text-xl font-bold text-blue-600">{{ report.total_items_sold }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Average Sale</p>
        <p class="text-xl font-bold text-purple-600">{{ formatCurrency(report.average_sale) }}</p>
      </div>
    </div>

    <!-- Top Products -->
    <div class="mb-3">
      <h4 class="text-sm font-semibold text-gray-700 mb-1">Top Products</h4>
      <ul class="text-sm text-gray-600">
        <li v-for="product in report.top_products" :key="product.product_id">
          {{ product.product_name }} — {{ product.quantity_sold }} pcs ({{ formatCurrency(product.total_amount) }})
        </li>
      </ul>
    </div>

    <!-- Sales by Category -->
    <div class="mb-3">
      <h4 class="text-sm font-semibold text-gray-700 mb-1">Sales by Category</h4>
      <ul class="text-sm text-gray-600">
        <li v-for="cat in report.sales_by_category" :key="cat.category">
          {{ cat.category }} — {{ formatCurrency(cat.total) }}
        </li>
      </ul>
    </div>

    <!-- Detailed Transactions -->
    <div>
      <h4 class="text-sm font-semibold text-gray-700 mb-1">Transactions</h4>
      <ul class="text-sm text-gray-600">
        <li v-for="tx in report.details" :key="tx.invoice_id">
          {{ formatDate(tx.date) }} — {{ tx.customer_name }} — {{ formatCurrency(tx.amount) }} ({{ tx.payment_method }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  report: {
    type: Object,
    required: true
  }
})

const formatCurrency = (value) => {
  if (typeof value !== 'number') return value
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}
</script>

<style scoped>
/* Optional hover effect */
div:hover {
  transform: translateY(-2px);
  transition: 0.2s;
}
</style>
