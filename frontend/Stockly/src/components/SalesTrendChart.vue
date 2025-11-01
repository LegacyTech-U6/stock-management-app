[file name]: SalesTrendChart.vue [file content begin]
<template>
  <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <h3 class="font-bold text-gray-900 mb-2">Sales Trend</h3>
    <p class="text-sm text-gray-600 mb-4">Revenue evolution over selected period</p>

    <!-- Chart -->
    <div v-if="chartDataReady" class="w-full h-72">
      <Line :chart-data="chartData" :chart-options="chartOptions" />
    </div>
    <div v-else class="w-full h-72 flex items-center justify-center">
      <p class="text-gray-500">Loading chart data...</p>
    </div>

    <!-- Metrics -->
    <div class="grid grid-cols-3 gap-4 mt-6">
      <div class="text-center">
        <p class="text-sm text-gray-600">Peak Day</p>
        <p class="text-xl font-bold text-green-600">{{ peakDay }}</p>
        <p class="text-xs text-gray-600">${{ peakSales.toLocaleString() }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-600">Avg Daily</p>
        <p class="text-xl font-bold">${{ avgDaily }}k</p>
        <p class="text-xs text-gray-600">across {{ dataLength }} days</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-600">Total Orders</p>
        <p class="text-xl font-bold text-purple-600">{{ totalOrders }}</p>
        <p class="text-xs text-gray-600">this period</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Line } from 'vue-chartjs'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// Props with default value
const props = defineProps({
  data: {
    type: Array,
    default: () => [], // Provide empty array as default
  },
})

const chartDataReady = ref(false)

// Reactive Chart.js data with safe defaults
const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Sales',
      data: [],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true,
      borderWidth: 2,
      pointRadius: 0,
    },
  ],
})

// Chart options
const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        callback: function (value) {
          return '$' + value.toLocaleString()
        },
      },
    },
  },
})

// Initialize chart data
const initializeChartData = () => {
  if (props.data && props.data.length > 0) {
    chartData.labels = props.data.map((d) => d.day || d.label || '')
    chartData.datasets[0].data = props.data.map((d) => d.sales || d.revenue || 0)
    chartDataReady.value = true
  } else {
    // Fallback data if no data provided
    chartData.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    chartData.datasets[0].data = [3000, 4000, 2000, 5000, 8000, 6000, 7000]
    chartDataReady.value = true
  }
}

// Update chart data whenever props.data changes
watch(
  () => props.data,
  () => {
    initializeChartData()
  },
  { deep: true },
)

// Computed metrics with safe defaults
const safeData = computed(() => props.data || [])

const totalSales = computed(() =>
  safeData.value.reduce((sum, d) => sum + (d.sales || d.revenue || 0), 0),
)

const avgDaily = computed(() => {
  const count = safeData.value.length || 1
  return (totalSales.value / count / 1000).toFixed(1)
})

const peak = computed(() =>
  safeData.value.reduce(
    (prev, curr) => {
      const currSales = curr.sales || curr.revenue || 0
      const prevSales = prev.sales || prev.revenue || 0
      return currSales > prevSales ? curr : prev
    },
    safeData.value[0] || { day: '-', sales: 0 },
  ),
)

const peakDay = computed(() => peak.value.day || peak.value.label || '-')
const peakSales = computed(() => peak.value.sales || peak.value.revenue || 0)

const totalOrders = computed(() => safeData.value.reduce((sum, d) => sum + (d.orders || 0), 0))

const dataLength = computed(() => safeData.value.length || 0)

// Initialize on mount
onMounted(() => {
  initializeChartData()
})
</script>
[file content end]
