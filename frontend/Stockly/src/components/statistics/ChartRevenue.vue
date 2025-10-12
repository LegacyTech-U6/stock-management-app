<template>
  <div class="w-full p-6 bg-gray-50">
    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- Header -->
      <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-2 mb-2">
          <div class="text-2xl">💰</div>
          <h1 class="text-2xl font-semibold text-gray-800">Profit Margin Analysis</h1>
        </div>

        <!-- 🔹 Period selector -->
        <select v-model="selectedPeriod" class="border rounded px-2 py-1">
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <p class="text-gray-600 mb-4">Revenue, costs, and profit trends</p>

      <!-- Chart -->
      <div class="mb-6 bg-white p-4 rounded border border-gray-200">
        <div style="width: 100%; height: 400px;">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <p class="text-gray-600 text-sm mb-1">Total Revenue</p>
          <p class="text-2xl font-bold text-green-700">{{ formatCurrency(totals.revenue) }}</p>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-gray-600 text-sm mb-1">Total Cost</p>
          <p class="text-2xl font-bold text-red-700">{{ formatCurrency(totals.cost) }}</p>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-gray-600 text-sm mb-1">Net Profit</p>
          <p class="text-2xl font-bold text-blue-700">{{ formatCurrency(totals.profit) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import Chart from "chart.js/auto";
import { useStatisticsStore } from "@/stores/statisticStore";
import { useEntrepriseStore } from "@/stores/entrepriseStore";

const chartCanvas = ref(null);
let chartInstance = null;

const statisticsStore = useStatisticsStore();
const entrepriseStore = useEntrepriseStore();

// 🔹 Dynamic period selector
const selectedPeriod = ref("month"); // day/week/month

// 🔹 Aggregate totals by period
const aggregatedTotals = computed(() => {
  const report = statisticsStore.salesReport || [];
  if (!report.length) return { labels: [], revenue: [], cost: [], profit: [] };

  const grouped = {};

  report.forEach((sale) => {
    const date = new Date(sale.sale_date);
    let label = "";

    // 🔹 Dynamic grouping by selected period
    if (selectedPeriod.value === "month") {
      // Group by day number (1–31)
      label = date.getDate().toString(); // e.g. "1", "2", "3"

    } else if (selectedPeriod.value === "week") {
      // Group by day of week
      label = date.toLocaleString("default", { weekday: "short" }); // e.g. "Mon", "Tue"

    } else if (selectedPeriod.value === "day") {
      // Group by hour of the day
      label = date.getHours().toString().padStart(2, "0") + ":00"; // e.g. "09:00"
    }

    if (!grouped[label]) grouped[label] = { revenue: 0, cost: 0, profit: 0 };
    grouped[label].revenue += Number(sale.total_revenue);
    grouped[label].cost += Number(sale.total_cost);
    grouped[label].profit += Number(sale.total_profit);
  });

  // 🔹 Sort labels in logical order
  let labels = Object.keys(grouped);

  if (selectedPeriod.value === "week") {
    const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    labels.sort((a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b));
  } else if (selectedPeriod.value === "day") {
    labels.sort((a, b) => a.localeCompare(b)); // Sort hours ascending
  } else if (selectedPeriod.value === "month") {
    labels = labels.map(Number).sort((a, b) => a - b); // Sort day numbers ascending
  }

  // 🔹 Build data arrays for chart
  const revenue = labels.map((l) => grouped[l].revenue);
  const cost = labels.map((l) => grouped[l].cost);
  const profit = labels.map((l) => grouped[l].profit);

  return { labels, revenue, cost, profit };
});

// 🔹 Compute overall totals
const totals = computed(() => ({
  revenue: aggregatedTotals.value.revenue.reduce((a, b) => a + b, 0),
  cost: aggregatedTotals.value.cost.reduce((a, b) => a + b, 0),
  profit: aggregatedTotals.value.profit.reduce((a, b) => a + b, 0),
}));

// 🔹 Format currency
const formatCurrency = (value) =>
  `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

// 🔹 Render chart
function renderChart(data) {
  if (!chartCanvas.value || !data.labels.length) return;
  const ctx = chartCanvas.value.getContext("2d");

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        { label: "Revenue ($)", data: data.revenue, backgroundColor: "#16a34a", borderRadius: 4 },
        { label: "Cost ($)", data: data.cost, backgroundColor: "#ef4444", borderRadius: 4 },
        { label: "Profit ($)", data: data.profit, backgroundColor: "#3b82f6", borderRadius: 4 },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: "bottom" } }, scales: { y: { beginAtZero: true } } },
  });
}

// 🔹 Load data from store
async function loadData() {
  if (!entrepriseStore.activeEntreprise) return;

  await statisticsStore.fetchSalesReport(selectedPeriod.value, {
    enterpriseId: entrepriseStore.activeEntreprise.id,
  });

  nextTick(() => renderChart(aggregatedTotals.value));
}

// 🔹 Watch for enterprise changes
watch(
  () => entrepriseStore.activeEntreprise,
  () => loadData(),
  { immediate: true }
);

// 🔹 Watch for period changes
watch(selectedPeriod, () => loadData());

// 🔹 Watch aggregatedTotals and re-render chart
watch(
  aggregatedTotals,
  (newData) => nextTick(() => renderChart(newData))
);

// 🔹 On mount
onMounted(loadData);
</script>
