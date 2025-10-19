<template>
  <div class="bg-white rounded-xl   border border-gray-200">
    <div class="flex items-center border-b border-gray-200 justify-between p-6 mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        </div>
        <h2 class="text-lg font-semibold text-gray-800">Top Selling Products</h2>
      </div>
      <button class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
        <span>{{ selectedPeriod }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>

    <div class="space-y-3 px-6">
      <div v-for="(product, index) in products" :key="index"
           class="flex items-center gap-4 p-3  hover:bg-gray-50 border-b border-gray-200 transition-colors">
        <div :class="`w-12 h-12 ${product.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`">
          {{ product.image }}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-gray-800 font-semibold text-sm truncate">{{ product.name }}</h3>
          <p class="text-xs text-gray-500">${{ product.price }} • {{ product.sales }}</p>
        </div>
        <div :class="`px-3 py-1 rounded-lg text-xs font-medium ${
          product.trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`">
          {{ product.trend > 0 ? '↑' : '↓' }} {{ Math.abs(product.trend) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopSellingProducts',
  data() {
    return {
      selectedPeriod: 'Today',
      products: [
        { name: 'Charger Cable - Lighting', price: 187, sales: '247+ Sales', trend: 25, image: '📱', color: 'bg-orange-100' },
        { name: 'Yves Saint Eau De Parfum', price: 145, sales: '289+ Sales', trend: 25, image: '💄', color: 'bg-red-100' },
        { name: 'Apple Airpods 2', price: 458, sales: '300+ Sales', trend: 25, image: '🎧', color: 'bg-green-900' },
        { name: 'Vacuum Cleaner', price: 139, sales: '225+ Sales', trend: -21, image: '🔌', color: 'bg-blue-900' },
        { name: 'Samsung Galaxy S21 Fe 5g', price: 898, sales: '365+ Sales', trend: 25, image: '📱', color: 'bg-purple-900' }
      ]
    }
  }
}
</script>

<style scoped>
/* Add Tailwind CSS or custom styles */
</style>
