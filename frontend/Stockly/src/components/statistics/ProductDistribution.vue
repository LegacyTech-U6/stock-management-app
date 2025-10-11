<template>
  <div class="bg-white rounded-2xl p-6">
    <h2 class="text-lg font-semibold mb-6 text-gray-700">
      Product Distribution
    </h2>

    <canvas ref="doughnutCanvas" class="w-full h-64"></canvas>

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

const totalProducts = computed(() => {
  return statsStore.productDistributionByCategory?.reduce(
    (sum, item) => sum + item.total_products,
    0
  ) || 0
})

onMounted(async () => {
  await statsStore.fetchProductDistributionByCategory()
  renderChart()
})

watch(() => statsStore.productDistributionByCategory, () => {
  renderChart()
}, { deep: true })

function renderChart() {
  if (!doughnutCanvas.value) return

  if (doughnutChart) {
    doughnutChart.destroy()
  }

  const labels = statsStore.productDistributionByCategory?.map(item => item.category_name.toUpperCase()) || []
  const dataValues = statsStore.productDistributionByCategory?.map(item => item.total_products) || []

  const colors = [
    "#3B82F3", // blue
    "#10B986", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#8B5CF6", // purple
    "#EC4899", // pink
    "#14B8A6", // teal
  ]

  doughnutChart = new Chart(doughnutCanvas.value, {
    type: 'doughnut', // still doughnut type
    data: {
      labels,
      datasets: [{
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '0%', // FULL doughnut (looks like a pie chart)
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw
              const percentage = totalProducts.value === 0 ? 0 : Math.round((value / totalProducts.value) * 100)
              return `${context.label}: ${value} products (${percentage}%)`
            }
          }
        },
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold',
            size: 14
          },
          textAlign: 'center',
          formatter: (value, ctx) => {
            const percentage = totalProducts.value === 0 ? 0 : Math.round((value / totalProducts.value) * 100)
            const label = ctx.chart.data.labels[ctx.dataIndex]
            return `${label}\n${percentage}%`
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
  max-width: 100%;
  max-height: 100%;
}
</style>
