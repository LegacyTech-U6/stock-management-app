<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Professional Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">Product Inventory</h1>
            <p class="text-sm text-gray-500 mt-1">
              Manage your product database
            </p>
          </div>

          <div class="flex items-center gap-3">
            <!-- View Mode Toggle -->
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                :class="viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'"
                class="p-2 transition-colors"
                @click="viewMode = 'grid'"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                </svg>
              </button>
              <button
                :class="viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'"
                class="p-2 transition-colors border-l border-gray-200"
                @click="viewMode = 'list'"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                </svg>
              </button>
            </div>

            <!-- Add Product Button -->
            <button
              @click="handleAddProduct"
              class="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="max-w-7xl mx-auto px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span class="text-sm text-gray-600">Total Products</span>
          </div>
          <div class="text-2xl font-semibold text-gray-900">{{ filteredProducts.length }}</div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-sm text-gray-600">In Stock</span>
          </div>
          <div class="text-2xl font-semibold text-gray-900">{{ inStockCount }}</div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span class="text-sm text-gray-600">Low Stock</span>
          </div>
          <div class="text-2xl font-semibold text-gray-900">{{ lowStockCount }}</div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <span class="text-sm text-gray-600">Categories</span>
          </div>
          <div class="text-2xl font-semibold text-gray-900">{{ categories.length }}</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-7xl mx-auto px-6 pb-6">
      <div class="flex flex-col sm:flex-row gap-3">
        <!-- Search -->
        <div class="flex-1 relative">
          <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products by name or SKU..."
            class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <!-- Category Filter -->
        <select
          v-model="selectedCategory"
          class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent min-w-[180px]"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <!-- Stock Filter -->
        <select
          v-model="selectedStock"
          class="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent min-w-[160px]"
        >
          <option value="">All Stock Levels</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
    </div>

    <!-- Product List -->
    <div class="max-w-7xl mx-auto px-6 pb-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="bg-white border border-gray-200 rounded-lg py-16">
        <div class="text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p class="text-sm text-gray-500 mb-6">Try adjusting your filters or search query</p>
          <button
            @click="searchQuery = ''; selectedCategory = ''; selectedStock = ''"
            class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Grid View -->
      <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProductListItem
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @view="handleViewProduct"
        />
      </div>

      <!-- List View -->
      <div v-else class="space-y-3">
        <ProductListItem
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @view="handleViewProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import ProductListItem from '@/components/Products/ProductListItem.vue'

const productStore = useProductStore()
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStock = ref('')
const viewMode = ref('list')
const loading = ref(false)

const categories = computed(() => {
  const cats = new Set(productStore.products.map(p => p.category_id))
  return Array.from(cats).filter(Boolean)
})

const filteredProducts = computed(() => {
  let products = productStore.products

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p =>
      p.Prod_name.toLowerCase().includes(query) ||
      p.code_bar.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    products = products.filter(p => p.category_id === selectedCategory.value)
  }

  if (selectedStock.value) {
    products = products.filter(p => {
      const qty = typeof p.quantity === 'string' ? parseInt(p.quantity) : p.quantity
      if (selectedStock.value === 'in-stock') return qty > 10
      if (selectedStock.value === 'low-stock') return qty > 0 && qty <= 10
      if (selectedStock.value === 'out-of-stock') return qty === 0
      return true
    })
  }

  return products
})

const inStockCount = computed(() => {
  return productStore.products.filter(p => {
    const qty = typeof p.quantity === 'string' ? parseInt(p.quantity) : p.quantity
    return qty > 10
  }).length
})

const lowStockCount = computed(() => {
  return productStore.products.filter(p => {
    const qty = typeof p.quantity === 'string' ? parseInt(p.quantity) : p.quantity
    return qty > 0 && qty <= 10
  }).length
})

const handleAddProduct = () => {
  router.push('/steper')
}

const handleViewProduct = (product) => {
  router.push({
    name: 'product-detail',
    params: { id: product.id }
  })
}

onMounted(async () => {
  loading.value = true
  await productStore.fetchProducts()
  loading.value = false
})
</script>
