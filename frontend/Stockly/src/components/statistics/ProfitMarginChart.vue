<template>
  <div class="bg-white rounded-2xl shadow-sm p-6">
    <h2 class="text-lg font-semibold mb-4 text-gray-700">📈 Profit Margin Analysis</h2>
    <div class="h-72">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js'
import { useStatisticsStore } from '@/stores/statisticStore'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale)

const statisticsStore = useStatisticsStore()

const chartData = computed(() => {
  const months = statisticsStore.profitTrend?.map((d) => d.month) || []
  const revenue = statisticsStore.profitTrend?.map((d) => d.revenue) || []
  const costs = statisticsStore.profitTrend?.map((d) => d.costs) || []
  const profit = statisticsStore.profitTrend?.map((d) => d.profit) || []

  return {
    labels: months,
    datasets: [
      {
        label: 'Revenue',
        data: revenue,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        tension: 0.3,
      },
      {
        label: 'Costs',
        data: costs,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        tension: 0.3,
      },
      {
        label: 'Profit',
        data: profit,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.1)',
        tension: 0.3,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        color: '#374151',
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month',
        color: '#6b7280',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Amount ($)',
        color: '#6b7280',
      },
      beginAtZero: true,
    },
  },
}
</script>

<style scoped>
canvas {
  max-height: 100%;
}
</style>
