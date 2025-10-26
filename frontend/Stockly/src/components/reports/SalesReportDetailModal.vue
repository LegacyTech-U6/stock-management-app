<template>
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div class="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg p-5 relative overflow-y-auto max-h-[90vh]">
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        ✕
      </button>

      <h2 class="text-xl font-bold mb-3 text-gray-800">Report Details - {{ report.date }}</h2>

      <!-- Summary Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500">Total Sales</p>
          <p class="text-lg font-bold text-green-600">{{ formatCurrency(report.total_sales) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Items Sold</p>
          <p class="text-lg font-bold text-blue-600">{{ report.total_items_sold }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Average Sale</p>
          <p class="text-lg font-bold text-purple-600">{{ formatCurrency(report.average_sale) }}</p>
        </div>
      </div>

      <!-- Charts -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-700 mb-2">Sales by Category</h4>
        <div class="w-full h-64 md:h-48">
          <Chart
            type="pie"
            :data="categoryChartData"
            :options="chartOptions"
          />
        </div>
      </div>

      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-700 mb-2">Top Products</h4>
         <div class="w-full h-64 md:h-48">
          <Chart
            type="bar"
            :data="topProductsChartData"
            :options="chartOptions"
          />
        </div>
      </div>

      <!-- Transactions Table -->
      <div>
        <h4 class="text-sm font-semibold text-gray-700 mb-1">Transactions</h4>
        <ul class="text-sm text-gray-600">
          <li v-for="tx in report.details" :key="tx.invoice_id">
            {{ formatDate(tx.date) }} — {{ tx.customer_name }} — {{ formatCurrency(tx.amount) }} ({{ tx.payment_method }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Chart } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement)

// Props
const props = defineProps({
  report: { type: Object, required: true }
})

// Helpers
const formatCurrency = (value) => {
  if (typeof value !== 'number') return value
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

// Charts data
const categoryChartData = computed(() => ({
  labels: props.report.sales_by_category.map(c => c.category),
  datasets: [
    {
      label: 'Sales by Category',
      data: props.report.sales_by_category.map(c => c.total),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    },
  ],
}))

const topProductsChartData = computed(() => ({
  labels: props.report.top_products.map(p => p.product_name),
  datasets: [
    {
      label: 'Top Products',
      data: props.report.top_products.map(p => p.total_amount),
      backgroundColor: ['#6366F1', '#EC4899', '#F97316', '#22D3EE', '#84CC16'],
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}
</script>

<style scoped>
/* optional modal fade-in */
</style>
