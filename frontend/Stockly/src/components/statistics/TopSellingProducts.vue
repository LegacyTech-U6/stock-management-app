<template>
  <div class="bg-white rounded-2xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-700 flex items-center gap-2">
        🏆 Top Selling Products
      </h2>
      <div class="flex items-center gap-4">
        <p class="text-gray-500 text-sm">Best performing products across all enterprises</p>
        <!-- Period Selector -->
        <select v-model="selectedPeriod" class="border border-gray-300 rounded px-2 py-1 text-sm">
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
    </div>

    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Rank</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Product</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Enterprise</th>
          <th class="px-4 py-2 text-right text-sm font-medium text-gray-500">Units Sold</th>
          <th class="px-4 py-2 text-right text-sm font-medium text-gray-500">Revenue</th>
          <th class="px-4 py-2 text-right text-sm font-medium text-gray-500">Trend</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(product, index) in topProducts" :key="product.product_id">
          <td class="px-4 py-2">
            <span
              :class="[
                'px-2 py-1 rounded text-white font-semibold',
                index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-gray-400' :
                index === 2 ? 'bg-orange-500' : 'bg-gray-300'
              ]"
            >
              #{{ index + 1 }}
            </span>
          </td>
          <td class="px-4 py-2 text-gray-700">{{ product.Prod_name }}</td>
          <td class="px-4 py-2 text-gray-700">{{ product.category_name || 'N/A' }}</td>
          <td class="px-4 py-2 text-gray-700">{{ product.enterprise_name || 'N/A' }}</td>
          <td class="px-4 py-2 text-right">{{ product.total_sold || 0 }}</td>
          <td class="px-4 py-2 text-right text-green-600 font-semibold">
            ${{ (product.total_revenue ?? 0).toLocaleString() }}
          </td>
          <td class="px-4 py-2 text-right flex items-center gap-2 justify-end">
            <!-- Sparkline -->
            <svg v-if="product.sales_history?.length" width="80" height="20" viewBox="0 0 80 20">
              <polyline
                :points="getSparklinePoints(product.sales_history)"
                fill="none"
                :stroke="product.trend >= 0 ? '#16a34a' : '#dc2626'"
                stroke-width="2"
              />
            </svg>
            <!-- Percentage -->
            <span :class="product.trend >= 0 ? 'text-green-600' : 'text-red-500'" class="font-semibold text-sm">
              <span v-if="product.trend >= 0">⬆ +{{ product.trend.toFixed(1) }}%</span>
              <span v-else>⬇ {{ product.trend.toFixed(1) }}%</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="topProducts.length === 0" class="mt-4 text-gray-500 text-sm text-center">
      No products sold yet.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStatisticsStore } from "@/stores/statisticStore";

const statisticsStore = useStatisticsStore();
const topProducts = ref([]);
const selectedPeriod = ref("month");

async function fetchProducts() {
  await statisticsStore.fetchProductSales(selectedPeriod.value);

  topProducts.value = statisticsStore.topProducts.map(p => ({
    ...p,
    enterprise_name: p.enterprise_name || 'Default Enterprise',
    category_name: p.category_name || 'N/A',
    trend: p.overall_growth_percent ?? 0,
    sales_history: p.sales_history || []
  }));
}

// Initial load
onMounted(fetchProducts);

// Watch for period changes
watch(selectedPeriod, async (newVal, oldVal) => {
  if (newVal !== oldVal) await fetchProducts();
});

// Sparkline helper
function getSparklinePoints(history) {
  if (!history || history.length === 0) return "";

  const values = history.map(h => h.sold);
  const max = Math.max(...values);
  const min = Math.min(...values);

  return values.map((v, i) => {
    const x = (i / (values.length - 1)) * 80;
    const y = 20 - ((v - min) / (max - min || 1)) * 20;
    return `${x},${y}`;
  }).join(" ");
}
</script>
