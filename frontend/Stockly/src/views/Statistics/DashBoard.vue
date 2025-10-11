<template>
  <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<StatsCard
  title="Total Sales"
  :value="Number(totalSales)"
  valueColor="text-blue-600"
/>
<StatsCard
  title="Average Revenue"
  :value="Number(avgRevenue)"
  valueColor="text-green-600"
/>
<StatsCard
  title="Profit"
  :value="Number(profit)"
  valueColor="text-purple-600"
/>
<StatsCard
  title="Margin %"
  :value="Number(margin)"
  valueColor="text-red-600"
  subtitle="Profit / Revenue"
/>



  </div>

  <div>

    <!-- Sales Chart -->
    <SalesPerformanceChart />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import StatsCard from "@/components/statistics/StatsCard.vue";
import { useStatisticsStore } from "@/stores/statisticStore";
import SalesPerformanceChart from "@/components/statistics/SalesPerformanceChart.vue";
const statsStore = useStatisticsStore();

const totalSales = ref(0);
const avgRevenue = ref(0);
const profit = ref(0);
const margin = ref(0);

onMounted(async () => {
  // Fetch stats from store
  await statsStore.fetchRevenue("month");
  await statsStore.fetchProfit("month");
  await statsStore.fetchSalesReport("month");

  totalSales.value = statsStore.salesReport.reduce(
    (sum, p) => sum + (p.total_sold || 0),
    0
  );
  avgRevenue.value = statsStore.revenue;
  profit.value = statsStore.profit;
  margin.value = statsStore.revenue
    ? ((statsStore.profit / statsStore.revenue) * 100).toFixed(2)
    : 0;
});
</script>
