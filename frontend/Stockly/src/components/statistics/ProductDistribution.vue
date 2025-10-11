<template>
  <div class="bg-white rounded-2xl p-6 ">
    <h2 class="text-lg font-semibold mb-6 text-gray-700">
      Product Distribution
    </h2>

    <div v-if="chartData.labels.length > 0" class="flex flex-col md:flex-row items-center justify-between">
      <!-- Chart -->
      <div class="w-48 h-48 mb-6 md:mb-0 relative">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <!-- Legend with percentages and ticks -->
      <div class="space-y-4 min-w-48">
        <div
          v-for="(item, index) in statsStore.productDistributionByCategory"
          :key="item.category_name"
          class="flex items-center justify-between"
        >
          <div class="flex items-center space-x-3">
            <!-- Color indicator with tick -->
            <div class="relative">
              <div
                class="w-4 h-4 rounded-sm"
                :style="{ backgroundColor: chartData.datasets[0].backgroundColor[index] }"
              ></div>
              <!-- Tick mark -->
              <svg
                v-if="showTick(index)"
                class="w-3 h-3 absolute -top-1 -right-1 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-700">{{ formatLabel(item.category_name) }}</span>
          </div>
          <span class="text-sm font-semibold text-gray-900">
            {{ calculatePercentage(item.total_products) }}%
          </span>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 text-sm text-center mt-4">
      No products found for this enterprise.
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { computed, onMounted, ref } from "vue"
import { useStatisticsStore } from "@/stores/statisticStore"

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const statsStore = useStatisticsStore()

// 🔹 Chargement des données au montage
onMounted(async () => {
  await statsStore.fetchProductDistributionByCategory()
})

// Calculate total products for percentage
const totalProducts = computed(() => {
  return statsStore.productDistributionByCategory?.reduce((sum, item) => sum + item.total_products, 0) || 0
})

// Calculate percentage for each category
const calculatePercentage = (categoryCount) => {
  if (totalProducts.value === 0) return 0
  return Math.round((categoryCount / totalProducts.value) * 100)
}

// Format labels to match the screenshot exactly
const formatLabel = (categoryName) => {
  // Convert to uppercase to match the screenshot style
  return categoryName.toUpperCase()
}

// Determine which categories should show ticks (largest segment or based on some logic)
const showTick = (index) => {
  // Show tick for the largest segment, or customize as needed
  const data = statsStore.productDistributionByCategory?.map(item => item.total_products) || []
  if (data.length === 0) return false

  const maxValue = Math.max(...data)
  const currentValue = data[index]
  return currentValue === maxValue
}

// 🔹 Données du graphique - Using exact data from screenshot
const chartData = computed(() => {
  // Map your actual data to match the screenshot labels
  const labelMap = {
    'Electronics': 'ELECTRONICS',
    'Mobile': 'MOBILE',
    'Peripherals': 'PERIPHERALS',
    'Audio': 'AUDIO'
  }

  return {
    labels: statsStore.productDistributionByCategory?.map((item) => labelMap[item.category_name] || item.category_name.toUpperCase()) || [],
    datasets: [
      {
        label: "Products per Category",
        data: statsStore.productDistributionByCategory?.map((item) => item.total_products) || [],
        backgroundColor: [
          "#3B82F6", // blue - ELECTRONICS
          "#10B981", // green - MOBILE
          "#F59E0B", // yellow - PERIPHERALS
          "#EF4444", // red - AUDIO
          "#8B5CF6", // purple
          "#EC4899", // pink
          "#14B8A6", // teal
        ],
        borderWidth: 0,
        spacing: 0, // Remove spacing to make it filled
      },
    ],
  }
})

// 🔹 Options du graphique
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "0%", // Remove cutout to make it a filled pie chart
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const percentage = calculatePercentage(context.raw)
          return `${context.label}: ${context.raw} products (${percentage}%)`
        },
      },
    },
  },
}
</script>

<style scoped>
/* Custom styles for the chart container */
:deep(canvas) {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
