<template>
  <div class="h-96 w-full">
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
  chartReady.value = true
})

const chartData = computed(() => ({
  labels: statsStore.salesTrend?.map((d) => d.label) || [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
  ],
  datasets: [
    {
      label: 'Sales ($)',
      data: statsStore.salesTrend?.map((d) => d.revenue) || [
        4000, 3000, 4500, 4000, 5500, 6000, 6500,
      ],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.3)',
      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointBackgroundColor: '#8B5CF6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      borderWidth: 3,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        font: {
          size: 12,
          weight: '500',
        },
        color: '#6B7280',
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(31, 41, 55, 0.95)',
      padding: 12,
      titleFont: {
        size: 13,
        weight: '600',
      },
      bodyFont: {
        size: 12,
      },
      cornerRadius: 8,
      displayColors: true,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 8000,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false,
      },
      ticks: {
        callback: (v) => v.toLocaleString(),
        stepSize: 2000,
        font: {
          size: 11,
        },
        color: '#9CA3AF',
      },
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        autoSkip: false,
        font: {
          size: 11,
        },
        color: '#9CA3AF',
      },
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
}
</script>
