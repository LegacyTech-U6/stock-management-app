<template>
  <div class="min-h-screen pt-20 bg-gray-50">
    <!-- Back Button & Header -->
    <div class="border-b border-gray-200 px-6 py-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ product?.Prod_name || 'Product Details' }}</h1>
            <p class="text-sm text-gray-500 mt-1">SKU: {{ product?.code_bar }}</p>
          </div>
          <span :class="stockBadgeClass">
            {{ stockStatus }}
          </span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div v-if="!product" class="text-center py-20">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No product data found</h3>
        <p class="text-gray-500 mb-4">Please select a product from the inventory list</p>
        <button
          @click="goBack"
          class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Go Back
        </button>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - 3D Product View -->
        <div class="bg-white border border-gray-200 rounded-xl p-8">
          <div class="flex items-center gap-2 mb-6">
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 class="text-lg font-semibold text-gray-900">3D Product View</h3>
          </div>

          <div class="bg-gray-50 rounded-lg p-8 mb-6 flex items-center justify-center min-h-[450px] relative">
            <div class="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-lg flex items-center gap-1">
              ${{ parseFloat(product.selling_price).toFixed(2) }}
            </div>
            <div class="absolute top-4 left-4 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
              {{ product.category_id }}
            </div>
            <img
              :src="product.image || 'https://via.placeholder.com/500'"
              :alt="product.Prod_name"
              class="max-w-full max-h-[400px] object-contain"
            />
          </div>

          <div class="flex items-center justify-center gap-3">
            <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Rotate X
            </button>
            <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Rotate Y
            </button>
            <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        <!-- Right Column - Stock & Details -->
        <div class="space-y-6">
          <!-- Stock Information -->
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 class="text-lg font-semibold text-gray-900">Stock Information</h3>
            </div>

            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Current Stock</span>
                  <span class="text-2xl font-bold text-gray-900">{{ product.quantity }} <span class="text-base font-normal text-gray-600">units</span></span>
                </div>
                <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Min: 10</span>
                  <span>Stock Level: {{ stockPercentage.toFixed(1) }}%</span>
                  <span>Max: 100</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                    :class="stockLevelColor"
                    class="h-3 rounded-full transition-all"
                    :style="{ width: stockPercentage + '%' }"
                  ></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div class="flex items-center gap-2 text-gray-600 mb-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="text-sm font-medium">Supplier</span>
                  </div>
                  <div class="text-gray-900">{{ product.supplier || 'N/A' }}</div>
                </div>
                <div>
                  <div class="flex items-center gap-2 text-gray-600 mb-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm font-medium">Last Restocked</span>
                  </div>
                  <div class="text-gray-900">{{ formatDate(product.date_of_arrival) }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Details -->
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>

            <div class="mb-6">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Description</h4>
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ product.Prod_Description || 'No description available for this product.' }}
              </p>
            </div>

            <div>
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Specifications</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Battery Life</span>
                  <span class="text-sm font-semibold text-gray-900">30 hours</span>
                </div>
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Connectivity</span>
                  <span class="text-sm font-semibold text-gray-900">Bluetooth 5.3</span>
                </div>
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Weight</span>
                  <span class="text-sm font-semibold text-gray-900">250g</span>
                </div>
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Driver Size</span>
                  <span class="text-sm font-semibold text-gray-900">40mm</span>
                </div>
                <div class="flex items-center justify-between py-3 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Frequency Response</span>
                  <span class="text-sm font-semibold text-gray-900">20Hz - 20kHz</span>
                </div>
                <div class="flex items-center justify-between py-3">
                  <span class="text-sm text-gray-600">Charging Time</span>
                  <span class="text-sm font-semibold text-gray-900">2 hours</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing Information -->
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <span class="text-sm text-gray-600">Cost Price</span>
                <span class="text-sm font-semibold text-gray-900">${{ parseFloat(product.cost_price).toFixed(2) }}</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <span class="text-sm text-gray-600">Selling Price</span>
                <span class="text-sm font-semibold text-gray-900">${{ parseFloat(product.selling_price).toFixed(2) }}</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <span class="text-sm text-gray-600">Profit Margin</span>
                <span class="text-sm font-semibold text-green-600">{{ profitMargin }}%</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="handleEdit"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Details
            </button>
            <button
              @click="handleRestock"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restock
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {getOneProduct as fetchProductById} from '@/service/api'

interface Product {
  id?: string | number
  Prod_name: string
  quantity: string | number
  cost_price: string | number
  selling_price: string | number
  category_id: string
  Prod_Description: string
  code_bar: string
  date_of_arrival: string
  supplier: string
  image?: string
}

const router = useRouter()
const route = useRoute()

// Get product data from route state
const product = ref<Product | null>(null)

onMounted(async () => {
  if (route.params.product) {
    product.value = route.params.product as unknown as Product
  } else if (route.params.id) {
    product.value = await fetchProductById(route.params.id)
  }
})


const goBack = () => {
  router.back()
}

const quantityNum = computed(() => {
  if (!product.value) return 0
  return typeof product.value.quantity === 'string'
    ? parseInt(product.value.quantity)
    : product.value.quantity
})

const stockStatus = computed(() => {
  const qty = quantityNum.value
  if (qty === 0) return 'Out of Stock'
  if (qty <= 10) return 'Low Stock'
  return 'In Stock'
})

const stockBadgeClass = computed(() => {
  const qty = quantityNum.value
  const baseClasses = 'text-sm px-4 py-2 rounded-lg font-semibold whitespace-nowrap'

  if (qty === 0) {
    return `${baseClasses} bg-red-100 text-red-700`
  }
  if (qty <= 10) {
    return `${baseClasses} bg-yellow-100 text-yellow-700`
  }
  return `${baseClasses} bg-gray-900 text-white`
})

const stockPercentage = computed(() => {
  const qty = quantityNum.value
  const max = 100
  return Math.min((qty / max) * 100, 100)
})

const stockLevelColor = computed(() => {
  const qty = quantityNum.value
  if (qty === 0) return 'bg-red-500'
  if (qty <= 10) return 'bg-yellow-500'
  return 'bg-gray-900'
})



const profitMargin = computed(() => {
  if (!product.value) return '0.00'
  const cost = parseFloat(product.value.cost_price?.toString() || '0')
  const selling = parseFloat(product.value.selling_price?.toString() || '0')
  if (cost === 0) return '0.00'
  const margin = ((selling - cost) / cost) * 100
  return margin.toFixed(2)
})


const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const handleEdit = () => {
  console.log('Edit product:', product.value)
  // Navigate to edit page or open edit modal
}

const handleRestock = () => {
  console.log('Restock product:', product.value)
  // Open restock modal or form
}
</script>
