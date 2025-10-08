<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Out of Stock</h1>
          <p class="text-sm text-gray-500 mt-1">Manage inventory shortages</p>
        </div>
        <button
          class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Restock Selected
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Out of Stock</p>
              <p class="text-2xl font-semibold text-gray-900">{{ outOfStockProducts?.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Lost Revenue</p>
              <p class="text-2xl font-semibold text-gray-900">
                ${{ formatNumber(totalLostRevenue) }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Avg Days Empty</p>
              <p class="text-2xl font-semibold text-gray-900">{{ Math.round(averageDaysEmpty) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">High Value</p>
              <p class="text-2xl font-semibold text-gray-900">{{ highValueCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products by name or SKU..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <select
            v-model="selectedCategory"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="all">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="daysEmpty">Days Empty</option>
            <option value="lostRevenue">Lost Revenue</option>
            <option value="unitPrice">Unit Price</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-1">{{ product.Prod_name }}</h3>
              <span
                class="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded"
                >{{ product.sku }}</span
              >
            </div>
            <span
              v-if="product.isHighValue"
              class="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded border border-amber-200"
            >
              HIGH VALUE
            </span>
          </div>

          <div class="space-y-2 mb-4 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Category</span>
              <span class="text-gray-900 font-medium">{{ product.category_name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Selling price</span>
              <span class="text-gray-900 font-medium">${{ formatNumber(product.selling_price) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Supplier</span>
              <span class="text-gray-900 font-medium">{{ product.supplier_name }}</span>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p class="text-xs text-red-600 font-semibold mb-1">Cost price</p>
            <p class="text-xl font-bold text-red-600">${{ formatNumber(product.cost_price) }}</p>
          </div>

          <button
            @click="handleRestock(product)"
            class="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Restock Now
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="finishedProducts?.length === 0"
        class="bg-white rounded-lg border border-gray-200 p-12 text-center"
      >
        <div class="text-5xl mb-4">🎉</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">All Stocked Up!</h3>
        <p class="text-gray-500">No out of stock products found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { OutOfStock } from '@/service/api'

const finishedProducts = ref([]) // ✅ Start as an empty array
const message = ref('')
const orders = ref([])

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('daysEmpty')

onMounted(async () => {
  await fetchFinishedProducts()
})

async function fetchFinishedProducts() {
  try {
    const data = await OutOfStock()
    console.log('✅ API Response:', data)

    // ✅ Store data properly
    message.value = data.message
    orders.value = data.orders
    finishedProducts.value = data.products || [] // Important
  } catch (err) {
    console.error('❌ Error fetching out-of-stock products:', err)
  }
}

// 🧠 Filtering logic
const filteredProducts = computed(() => {
  let filtered = [...finishedProducts.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((p) => p.Prod_name.toLowerCase().includes(query))
  }

  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory.value)
  }

  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'daysEmpty':
        return (b.daysEmpty || 0) - (a.daysEmpty || 0)
      case 'lostRevenue':
        return (b.lostRevenue || 0) - (a.lostRevenue || 0)
      case 'unitPrice':
        return (b.selling_price || 0) - (a.selling_price || 0)
      default:
        return 0
    }
  })

  return filtered
})

// 💰 Formatting
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

const handleRestock = (product) => {
  console.log('Restock:', product)
}
</script>
