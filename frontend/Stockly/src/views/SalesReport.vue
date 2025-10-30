<template>
  <div class="p-5 space-y-4 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Daily Sales Report</h1>

    <!-- Date filter -->
    <div class="mb-4 flex items-center gap-2">
      <label class="text-sm text-gray-700">Select Date:</label>
      <input type="date" v-model="selectedDate" class="border px-2 py-1 rounded" />
      <button @click="filterByDate" class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
        Filter
      </button>
      <button @click="resetFilter" class="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
        Reset
      </button>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="loader"></div>
    </div>

    <div v-else>
      <div v-if="filteredReports.length === 0" class="text-gray-500">No reports found.</div>

      <ul>
        <li
          v-for="report in filteredReports"
          :key="report.date"
          @click="openDetail(report)"
          class="cursor-pointer flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-2 hover:bg-blue-50 transition"
        >
          <span>{{ report.date }}</span>
          <span class="font-bold text-green-600">{{ formatCurrency(report.total_sales) }}</span>
        </li>
      </ul>
    </div>

    <!-- Detail Modal -->
    <SalesReportDetailModal
      v-if="selectedReport"
      :report="selectedReport"
      @close="selectedReport = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useActivityStore } from '@/stores/activityStore'
import SalesReportDetailModal from '@/components/reports/SalesReportDetailModal.vue'

const activityStore = useActivityStore()
const reports = ref([])
const filteredReports = ref([])
const selectedDate = ref('')
const selectedReport = ref(null)
const loading = ref(true)

const formatCurrency = (value) => {
  if (typeof value !== 'number') return value
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

onMounted(async () => {
  try {
    const data = await activityStore.fetchSalesReports()
    reports.value = Array.isArray(data) ? data : [data]
    filteredReports.value = reports.value
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const filterByDate = () => {
  if (selectedDate.value) {
    filteredReports.value = reports.value.filter(r => r.date === selectedDate.value)
  }
}

const resetFilter = () => {
  filteredReports.value = reports.value
  selectedDate.value = ''
}

const openDetail = (report) => {
  selectedReport.value = report
}
</script>

<style scoped>
.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3490dc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
