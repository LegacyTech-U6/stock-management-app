<template>
  <div class="bg-white rounded-2xl p-6">
    <h2 class="text-lg font-semibold mb-6 text-gray-700">
      Product Distribution
    </h2>

    <!-- Chart container -->
    <div class="relative w-full max-w-sm mx-auto" style="height:250px">
      <canvas ref="doughnutCanvas" class="w-full h-full"></canvas>
    </div>

    <div v-if="totalProducts === 0" class="text-gray-500 text-sm text-center mt-4">
      No products found for this enterprise.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useStatisticsStore } from '@/stores/statisticStore'

const statsStore = useStatisticsStore()
const doughnutCanvas = ref(null)
let doughnutChart = null

// Total products for percentage calculation
const totalProducts = computed(() => {
  return statsStore.revenueByCategory?.reduce((sum, item) => sum + item.revenue, 0) || 0
})

// Fetch data
onMounted(async () => {
  await statsStore.fetchRevenueByCategory()
  renderChart()
})

// Watch for data changes
watch(() => statsStore.revenueByCategory, () => {
  renderChart()
}, { deep: true })

function renderChart() {
  if (!doughnutCanvas.value) return
  if (doughnutChart) doughnutChart.destroy()

  const labels = statsStore.revenueByCategory?.map(item => item.category_name.toUpperCase()) || []
  const dataValues = statsStore.revenueByCategory?.map(item => item.revenue) || []

  // Vibrant colors
  const colors = ["#6366F1", "#EC4899", "#FBBF24", "#10B981", "#F43F5E", "#8B5CF6", "#14B8A6"]

  doughnutChart = new Chart(doughnutCanvas.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '0%', // FULL pie
      plugins: {
        legend: { display: false }, // hide default legend
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw
              const percentage = totalProducts.value === 0 ? 0 : Math.round((value / totalProducts.value) * 100)
              return `${context.label}: ${value} (${percentage}%)`
            }
          }
        },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 12 },
          anchor: 'center',
          align: 'center',
          formatter: (value, ctx) => {
            const percentage = totalProducts.value === 0 ? 0 : Math.round((value / totalProducts.value) * 100)
            return `${ctx.chart.data.labels[ctx.dataIndex]}: ${percentage}%`
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  })
}
</script>

<style scoped>
:deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
