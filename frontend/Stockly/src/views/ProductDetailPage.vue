<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class=" mx-auto px-6 py-4">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900 mb-1">
              {{ product?.Prod_name || 'Product Details' }}
            </h1>
            <div class="flex items-center gap-4 text-sm text-gray-500">
              <span>SKU: {{ product?.code_bar }}</span>
              <span>•</span>
              <span>{{ product?.category_id }}</span>
            </div>
          </div>
          <span :class="stockBadgeClass" class="text-sm px-3 py-1.5 rounded-lg font-medium">
            {{ stockStatus }}
          </span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div v-if="!product" class="bg-white border border-gray-200 rounded-lg py-20">
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No product data found</h3>
            <p class="text-sm text-gray-500 mb-6">Please select a product from the inventory list</p>
            <button
              @click="goBack"
              class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Go Back to Products
            </button>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column - Product Image -->
          <div class="lg:col-span-1">
            <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
              <div class="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <div v-if="product.Prod_image" class="relative w-full h-full">
                  <img
                    :src="product.Prod_image"
                    :alt="product.Prod_name"
                    class="w-full h-full object-contain p-4"
                  />
                </div>
                <div v-else class="text-center">
                  <div class="text-6xl mb-2 opacity-20">📦</div>
                  <p class="text-sm text-gray-400">No image</p>
                </div>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div class="text-xs text-gray-500 mb-1">Selling Price</div>
                  <div class="text-2xl font-semibold text-gray-900">
                    ${{ formatPrice(product.selling_price) }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-500 mb-1">Profit Margin</div>
                  <div class="text-lg font-semibold text-green-600">+{{ profitMargin }}%</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Details -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Stock Information -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-base font-semibold text-gray-900 mb-4">Stock Information</h3>

              <div class="mb-6">
                <div class="flex items-baseline justify-between mb-2">
                  <span class="text-sm text-gray-600">Current Inventory</span>
                  <div>
                    <span class="text-3xl font-semibold text-gray-900">{{ product.quantity }}</span>
                    <span class="text-sm text-gray-500 ml-1">units</span>
                  </div>
                </div>

                <div class="relative">
                  <div class="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>Min: 10</span>
                    <span :class="stockPercentageColor">{{ stockPercentage.toFixed(1) }}%</span>
                    <span>Max: 100</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      :class="stockLevelColor"
                      class="h-2 rounded-full transition-all"
                      :style="{ width: stockPercentage + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="text-xs text-gray-500 mb-1">Supplier</div>
                  <div class="text-sm font-medium text-gray-900">{{ product.supplier_name || 'N/A' }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Last Restocked</div>
                  <div class="text-sm font-medium text-gray-900">{{ formatDate(product.date_of_arrival) }}</div>
                </div>
              </div>
            </div>

            <!-- Product Details -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-base font-semibold text-gray-900 mb-4">Product Details</h3>

              <div class="mb-6">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p class="text-sm text-gray-600 leading-relaxed">
                  {{ product.Prod_Description || 'No description available for this product.' }}
                </p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-3">Specifications</h4>
                <div class="space-y-2">
                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span class="text-sm text-gray-600">Battery Life</span>
                    <span class="text-sm font-medium text-gray-900">30 hours</span>
                  </div>
                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span class="text-sm text-gray-600">Connectivity</span>
                    <span class="text-sm font-medium text-gray-900">Bluetooth 5.3</span>
                  </div>
                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span class="text-sm text-gray-600">Weight</span>
                    <span class="text-sm font-medium text-gray-900">250g</span>
                  </div>
                  <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span class="text-sm text-gray-600">Driver Size</span>
                    <span class="text-sm font-medium text-gray-900">40mm</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pricing Information -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <h3 class="text-base font-semibold text-gray-900 mb-4">Pricing Information</h3>

              <div class="space-y-3">
                <div class="flex items-center justify-between py-2">
                  <span class="text-sm text-gray-600">Cost Price</span>
                  <span class="text-base font-semibold text-gray-900">${{ formatPrice(product.cost_price) }}</span>
                </div>
                <div class="flex items-center justify-between py-2">
                  <span class="text-sm text-gray-600">Selling Price</span>
                  <span class="text-base font-semibold text-gray-900">${{ formatPrice(product.selling_price) }}</span>
                </div>
                <div class="flex items-center justify-between py-3 bg-green-50 border border-green-100 rounded-lg px-3">
                  <span class="text-sm font-medium text-green-700">Profit Margin</span>
                  <span class="text-lg font-semibold text-green-700">+{{ profitMargin }}%</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button
                @click="handleEdit"
                class="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Details
              </button>
              <button
                @click="handleRestock"
                class="flex-1 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Restock Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getOneProduct as fetchProductById } from '@/service/api'

interface Product {
  id?: string | number
  Prod_name: string
  quantity: string | number
  cost_price: string | number
  selling_price: string | number
  category_id: string | number
  Prod_Description: string
  code_bar: string | number
  date_of_arrival: string
  supplier_name: string | number
  Prod_image?: string
}

const router = useRouter()
const route = useRoute()

const product = ref<Product | null>(null)

onMounted(async () => {
  if (route.params.id) {
    try {
      const response = await fetchProductById(route.params.id)
      console.log('Full API response:', response)

      if (response.data) {
        product.value = Array.isArray(response.data) ? response.data[0] : response.data
      } else if (Array.isArray(response)) {
        product.value = response[0]
      } else {
        product.value = response
      }

      console.log('Processed product:', product.value)
    } catch (error) {
      console.error('Error fetching product:', error)
    }
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
  const baseClasses = 'text-sm px-4 py-2 rounded-xl font-semibold whitespace-nowrap flex items-center shadow-sm'

  if (qty === 0) {
    return `${baseClasses} bg-red-50 text-red-700 border border-red-200`
  }
  if (qty <= 10) {
    return `${baseClasses} bg-yellow-50 text-yellow-700 border border-yellow-200`
  }
  return `${baseClasses} bg-green-50 text-green-700 border border-green-200`
})

const stockPulseClass = computed(() => {
  const qty = quantityNum.value
  if (qty === 0) return 'bg-red-500'
  if (qty <= 10) return 'bg-yellow-500'
  return 'bg-green-500'
})

const stockDotClass = computed(() => {
  const qty = quantityNum.value
  if (qty === 0) return 'bg-red-500'
  if (qty <= 10) return 'bg-yellow-500'
  return 'bg-green-500'
})


const stockPercentage = computed(() => {
  const qty = quantityNum.value
  const max = 100
  return Math.min((qty / max) * 100, 100)
})
const stockPercentageColor = computed(() => {
  if (stockPercentage.value < 20) return 'red';
  if (stockPercentage.value < 50) return 'orange';
  return 'green';
});
const stockLevelColor = computed(() => {
  const qty = quantityNum.value
  if (qty === 0) return 'bg-gradient-to-r from-red-500 to-red-600'
  if (qty <= 10) return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
  return 'bg-gradient-to-r from-green-500 to-green-600'
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
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const handleEdit = () => {
  console.log('Edit product:', product.value)
}

const handleRestock = () => {
  if (!product.value) return console.error("❌ No product loaded")

  router.push({
    name: 'restock',
    params: { reStockId: product.value.id }
  })
  console.log('Restock product:', product.value.id)
}


const formatPrice = (value: any) => {
  const num = parseFloat(value)
  return isNaN(num) ? '0.00' : num.toFixed(2)
}
</script>
