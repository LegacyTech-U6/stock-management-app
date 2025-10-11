<template>
  <div class="bg-white rounded-2xl shadow-sm p-6">
    <h2 class="text-lg font-semibold mb-4 text-gray-700">🏆 Top Selling Products</h2>

    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-left text-sm font-medium text-gray-500">Product</th>
          <th class="px-4 py-2 text-right text-sm font-medium text-gray-500">Quantity Sold</th>
          <th class="px-4 py-2 text-right text-sm font-medium text-gray-500">Revenue ($)</th>
          <th class="px-4 py-2 text-right text-sm font-medium text-gray-500">Profit ($)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="product in topProducts" :key="product.id">
          <td class="px-4 py-2 text-gray-700">{{ product.name }}</td>
          <td class="px-4 py-2 text-right">{{ product.quantity_sold }}</td>
          <td class="px-4 py-2 text-right">{{ product.revenue.toFixed(2) }}</td>
          <td class="px-4 py-2 text-right">{{ product.profit.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="topProducts.length === 0" class="mt-4 text-gray-500 text-sm">
      No products sold yet.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStatisticsStore } from '@/stores/statisticStore'

const statisticsStore = useStatisticsStore()
const topProducts = ref([])

onMounted(async () => {
  // Fetch top products from the store or API
  await statisticsStore.fetchBestSellingProduct()
  topProducts.value = statisticsStore.bestSellingProduct
})
</script>

<style scoped>
table th,
table td {
  white-space: nowrap;
}
</style>
