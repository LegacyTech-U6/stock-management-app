<template>
  <div class="px-30">
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- 🔹 Loop through stats array -->
    <StatsCards
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :label="stat.title"
      :value="Number(stat.value)"
      :color="stat.valueColor"
      :subtext="stat.subtitle || ''"
      :containerClass="stat.containerClass"

    />
  </div>

  <ChartRevenue />

  <div>
    <div class="grid grid-cols-4 gap-4 p-4">
      <div class="col-span-3 bg-white rounded-xl border-2 border-gray-300 p-10">
           <SalesPerformanceChart />
      </div>
      <div class="p-5  bg-white rounded-xl border-2 border-gray-300">
           <RevenueCatgeory />
      </div>

    </div>
    <!-- Sales Chart -->



    <ProfitMarginChart />
    <TopSellingProducts />
  </div>
  </div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { ShoppingCart, Users, DollarSign, TrendingUp, Percent } from 'lucide-vue-next'
import StatsCards from '@/components/StartsCards.vue'
import { useStatisticsStore } from '@/stores/statisticStore'
import SalesPerformanceChart from '@/components/statistics/SalesPerformanceChart.vue'
import RevenueCatgeory from '@/components/statistics/RevenueCatgeory.vue'
import ProfitMarginChart from '@/components/statistics/ProfitMarginChart.vue'
import TopSellingProducts from '@/components/statistics/TopSellingProducts.vue'
import ChartRevenue from '@/components/statistics/ChartRevenue.vue'

const statsStore = useStatisticsStore()

// 🔹 Reactive stats values
const totalSales = ref(0)
const avgRevenue = ref(0)
const profit = ref(0)
const margin = ref(0)

// 🔹 Stats array for looping


onMounted(async () => {
  // Fetch stats from store
  await statsStore.fetchRevenue('month')
  await statsStore.fetchProfit('month')
  await statsStore.fetchSalesReport('month')

  totalSales.value = statsStore.salesReport.reduce((sum, p) => sum + (p.total_sold || 0), 0)
  avgRevenue.value = statsStore.revenue
  profit.value = statsStore.profit
  margin.value = statsStore.revenue
    ? ((statsStore.profit / statsStore.revenue) * 100).toFixed(2)
    : 0

  // 🔹 Fill stats array dynamically


})
  const stats = computed(() => [
  {
    title: 'Total Sales',
    value: totalSales.value,
    valueColor: 'bg-blue-600',
    containerClass: "p-6 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white",
    icon: Users,
  },
  {
    title: 'Average Revenue',

    value: avgRevenue.value,
    valueColor: 'bg-green-600',
    containerClass: "border-2 p-6 rounded-xl border-purple-200 bg-gradient-to-br from-purple-50 to-white",
    icon: DollarSign
  },
  {
    title: 'Profit',
    value: profit.value,
    valueColor: 'bg-purple-600',
    containerClass: "border-2  p-6 rounded-xl border-green-200 bg-gradient-to-br from-green-50 to-white",
    icon: TrendingUp
  },
  {
    title: 'Margin %',
    value: margin.value,
    valueColor: 'bg-red-600',
    subtitle: 'Profit / Revenue',
    containerClass: "p-6 rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white",
    icon: Percent
  },
])
</script>
