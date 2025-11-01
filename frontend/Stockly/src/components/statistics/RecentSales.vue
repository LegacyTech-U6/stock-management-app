<template>
  <div class="bg-white rounded-xl border border-gray-200">
    <div class="flex items-center border-b border-gray-200 p-6 justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-pink-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <h2 class="text-lg font-semibold text-gray-800">Recent Sales</h2>
      </div>
      <button
        class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <span>{{ selectedPeriod }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>

    <div class="space-y-3 px-6">
      <div
        v-for="(sale, index) in sales"
        :key="index"
        class="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
      >
        <div
          :class="`w-12 h-12 ${sale.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`"
        >
          {{ sale.image }}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-gray-800 text-sm truncate">{{ sale.name }}</h3>
          <p class="text-xs text-gray-500">{{ sale.category }} • ${{ sale.price }}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-500 mb-1.5">{{ sale.date }}</p>
          <span :class="`px-3 py-1 rounded-lg text-xs font-medium text-white ${sale.statusColor}`">
            {{ sale.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentSales',
  data() {
    return {
      selectedPeriod: 'Weekly',
      sales: [
        {
          name: 'Apple Watch Series 9',
          category: 'Electronics',
          price: 640,
          date: 'Today',
          status: 'Processing',
          statusColor: 'bg-purple-500',
          image: '⌚',
          color: 'bg-gray-700',
        },
        {
          name: 'Gold Bracelet',
          category: 'Fashion',
          price: 126,
          date: 'Today',
          status: 'Cancelled',
          statusColor: 'bg-red-500',
          image: '💍',
          color: 'bg-gray-600',
        },
        {
          name: 'Parachute Down Duvet',
          category: 'Health',
          price: 69,
          date: '15 Jan 2025',
          status: 'Onhold',
          statusColor: 'bg-cyan-500',
          image: '🛏️',
          color: 'bg-yellow-700',
        },
        {
          name: 'YETI Rambler Tumbler',
          category: 'Sports',
          price: 65,
          date: '12 Jan 2025',
          status: 'Processing',
          statusColor: 'bg-purple-500',
          image: '🥤',
          color: 'bg-teal-600',
        },
        {
          name: 'Osmo Genius Starter Kit',
          category: 'Lifestyles',
          price: 87.56,
          date: '11 Jan 2025',
          status: 'Completed',
          statusColor: 'bg-green-500',
          image: '🎮',
          color: 'bg-gradient-to-br from-red-500 to-cyan-500',
        },
      ],
    }
  },
}
</script>

<style scoped>
/* Add Tailwind CSS or custom styles */
</style>
