<template>
  <div class="bg-white rounded-xl border border-gray-200">
    <div class="flex items-center justify-between border-b border-gray-200 p-6 mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2 class="text-lg font-semibold text-gray-800">Low Stock Products</h2>
      </div>
      <button class="text-sm text-purple-600 hover:text-purple-700 font-medium">
        View All
      </button>
    </div>

    <div class="space-y-3 px-6">
      <div v-for="(product, index) in products" :key="index"
           class="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
        <div :class="`w-12 h-12 ${product.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`">
          {{ product.image }}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-gray-800 text-sm truncate">{{ product.name }}</h3>
          <p class="text-xs text-gray-500">ID : {{ product.id }}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-400 mb-1">Instock</p>
          <p :class="`text-lg font-semibold ${getStockColor(product.stock)}`">
            {{ product.stock }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LowStockProducts',
  data() {
    return {
      products: [
        { name: 'Dell XPS 13', id: '#665814', stock: 8, image: '💻', color: 'bg-blue-900' },
        { name: 'Vacuum Cleaner Robot', id: '#940004', stock: 14, image: '🤖', color: 'bg-purple-900' },
        { name: 'KitchenAid Stand Mixer', id: '#325569', stock: 21, image: '🍴', color: 'bg-amber-900' },
        { name: "Levi's Trucker Jacket", id: '#124588', stock: 12, image: '👕', color: 'bg-blue-600' },
        { name: "Lay's Classic", id: '#365586', stock: 10, image: '🍟', color: 'bg-yellow-600' }
      ]
    }
  },
  methods: {
    getStockColor(stock) {
      if (stock < 10) return 'text-red-500';
      if (stock < 15) return 'text-orange-500';
      return 'text-yellow-600';
    }
  }
}
</script>

<style scoped>
/* Add Tailwind CSS or custom styles */
</style>
