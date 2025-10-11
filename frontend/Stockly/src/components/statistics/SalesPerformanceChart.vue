<template>
  <div class="h-64">
    <Line v-if="chartReady" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { Line } from 'vue-chartjs'
import { useStatisticsStore } from '@/stores/statisticStore'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
)

const statsStore = useStatisticsStore()
const chartReady = ref(false)

onMounted(async () => {
  await statsStore.fetchSalesTrend('month')
  chartReady.value = true // only render chart after data fetched
})

// Computed chart data with safe defaults
const chartData = computed(() => ({
  labels: statsStore.salesTrend?.map((d) => d.label) || [],
  datasets: [
    {
      label: 'Revenue',
      data: statsStore.salesTrend?.map((d) => d.revenue) || [],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.3,
      fill: true,
      pointRadius: 3,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { callback: (v) => `$${v.toLocaleString()}` },
    },
    x: { ticks: { autoSkip: true, maxTicksLimit: 10 } },
  },
}
</script>
