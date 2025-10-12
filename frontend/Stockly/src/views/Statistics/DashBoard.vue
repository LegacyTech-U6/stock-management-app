[file name]: DashBoard.vue
[file content begin]
<template>
  <div class="px-30">
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- 🔹 Loop through stats array -->
      <StatsCards
        v-for="(stat, index) in stats"
        :key="index"
        :icon="stat.icon"
        :title="stat.title"
        :value="Number(stat.value)"
        :color="stat.color"
        :subtitle="stat.subtitle || ''"
        :containerClass="stat.containerClass"
        :trend="stat.trendPercent || 0"
      />
    </div>

    <div>
      <div class="grid grid-cols-4 gap-4 p-4">
        <div class="col-span-3 bg-white rounded-xl border-2 border-gray-300 p-10">
          <SalesPerformanceChart />
        </div>
        <div class="p-5 bg-white rounded-xl border-2 border-gray-300">
          <RevenueCatgeory />
        </div>
      </div>
      <!-- Sales Chart -->

      <TopSellingProducts />
      <ChartRevenue />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Users, DollarSign, TrendingUp, Percent, ArrowUp, ArrowDown } from 'lucide-vue-next'
import StatsCards from '@/components/StartsCards.vue'
import { useStatisticsStore } from '@/stores/statisticStore'
import SalesPerformanceChart from '@/components/statistics/SalesPerformanceChart.vue'
import RevenueCatgeory from '@/components/statistics/RevenueCatgeory.vue'
import TopSellingProducts from '@/components/statistics/TopSellingProducts.vue'
import ChartRevenue from '@/components/statistics/ChartRevenue.vue'

// 🔹 Store
const statsStore = useStatisticsStore()

// 🔹 Reactive stats
const totalSales = ref(0)
const avgRevenue = ref(0)
const profit = ref(0)
const margin = ref(0)

// 🔹 Trend percentages from backend
const revenueTrendPercent = ref(0)
const profitTrendPercent = ref(0)
const salesTrendPercent = ref(0)

// 🔹 Fetch stats from backend
onMounted(async () => {
  await statsStore.fetchSalesReport('month')
  await statsStore.fetchRevenue('day')
  await statsStore.fetchProfit('day')

  // Total Sales
  totalSales.value = statsStore.salesReport?.reduce(
    (sum, p) => sum + (p.total_sold || 0),
    0
  ) || 0

  // Revenue
  avgRevenue.value = statsStore.revenue?.total || 0
  revenueTrendPercent.value = statsStore.revenue?.history[statsStore.revenue.history.length - 1].growth_percent || 0

  // Profit
  profit.value = statsStore.profit?.total || 0
  profitTrendPercent.value = statsStore.profit.history[statsStore.profit.history.length - 1].growth_percent

  // Margin %
  margin.value =
    statsStore.profit?.total && statsStore.revenue?.total
      ? Number(((statsStore.profit.total / statsStore.revenue.total) * 100).toFixed(2))
      : 0

  // Calculate sales trend percentage (you might need to add this to your backend)
  // For now, using a placeholder calculation
  if (statsStore.salesReport && statsStore.salesReport.length > 1) {
    const currentPeriod = statsStore.salesReport[statsStore.salesReport.length - 1]?.total_sold || 0
    const previousPeriod = statsStore.salesReport[statsStore.salesReport.length - 2]?.total_sold || 0
    salesTrendPercent.value = previousPeriod > 0
      ? ((currentPeriod - previousPeriod) / previousPeriod) * 100
      : currentPeriod > 0 ? 100 : 0
  }
})

// 🔹 Stats array with trend percentages
const stats = computed(() => [
  {
    title: 'Total Sales',
    value: totalSales.value,
    color: 'bg-blue-600',
    containerClass: 'p-6 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white',
    icon: Users,
    trendPercent: salesTrendPercent.value
  },
  {
    title: 'Revenue',
    value: avgRevenue.value,
    color: 'bg-green-600',
    containerClass: 'p-6 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white',
    icon: DollarSign,
    trendPercent: revenueTrendPercent.value
  },
  {
    title: 'Profit',
    value: profit.value,
    color: 'bg-purple-600',
    containerClass: 'p-6 rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white',
    icon: TrendingUp,
    trendPercent: profitTrendPercent.value
  },
  {
    title: 'Margin %',
    value: margin.value,
    color: 'bg-red-600',
    subtitle: 'Profit / Revenue',
    containerClass: 'p-6 rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white',
    icon: Percent,
    trendPercent: 0 // Margin trend would need separate calculation
  },
])
</script>
[file content end]
