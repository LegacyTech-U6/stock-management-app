<template>
  <div class="sales-purchase-chart">
    <div class="time-filters">
      <button
        v-for="period in timePeriods"
        :key="period"
        :class="{ active: selectedPeriod === period }"
        @click="selectedPeriod = period"
      >
        {{ period }}
      </button>
    </div>

    <div class="stats-overview">
      <div class="stat-card">
        <h3>Total Purchase</h3>
        <p class="amount">3K</p>
      </div>
      <div class="stat-card">
        <h3>Total Sales</h3>
        <p class="amount">1K</p>
      </div>
    </div>

    <!-- Use the chart component correctly -->
    <Line
      v-if="chartData.labels?.length"
      :data="chartData"
      :options="chartOptions"
      :height="300"
    />
    <div v-else class="loading">Loading chart...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// Import Line and use it directly
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

const selectedPeriod = ref('1D')
const timePeriods = ref(['10', '1W', '1M', '3M', '6M', '1Y'])

const chartData = ref({
  labels: [],
  datasets: []
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 100000,
      ticks: {
        callback: function(value) {
          return value / 1000 + 'K'
        }
      }
    }
  }
})

onMounted(() => {
  initializeChartData()
})

function initializeChartData() {
  chartData.value = {
    labels: ['2 am', '4 am', '6 am', '8 am', '10 am', '12 pm', '2 pm', '4 pm', '6 pm', '8 pm', '10 pm', '12 am'],
    datasets: [
      {
        label: 'Purchase',
        data: [25000, 30000, 45000, 60000, 75000, 80000, 85000, 90000, 80000, 70000, 50000, 30000],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Sales',
        data: [15000, 20000, 30000, 40000, 50000, 55000, 60000, 65000, 60000, 50000, 40000, 25000],
        borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  }
}
</script>

<style scoped>
.sales-purchase-chart {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.time-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.time-filters button {
  padding: 5px 15px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.time-filters button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.stats-overview {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stat-card {
  padding: 15px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
  background: #fafafa;
}

.loading {
  text-align: center;
  padding: 50px;
  color: #666;
}
</style>
