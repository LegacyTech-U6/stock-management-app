// Vue.js Component - RestockView.vue
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="  px-6 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-semibold text-gray-900">Restock Management</h1>
            <p class="text-sm text-gray-500 mt-1">Manage product inventory and stock levels</p>
          </div>
          <div class="flex gap-3">
            <button class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Cancel
            </button>
            <button @click="Restock" class="px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Confirm Restock
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class=" px-6 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Current Stock</p>
              <p class="text-3xl font-semibold text-gray-900">{{ product?.quantity || 0 }}</p>
            </div>
            <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Units to Add</p>
              <p class="text-3xl font-semibold text-blue-600">+{{ quantity }}</p>
            </div>
            <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">New Stock Level</p>
              <p class="text-3xl font-semibold text-green-600">{{ newStockLevel }}</p>
            </div>
            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Status</p>
              <p :class="`text-sm font-semibold ${getStatusColor(newStatus)}`">{{ newStatus }}</p>
            </div>
            <svg class="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Product Info -->
        <div class="lg:col-span-1">
          <!-- Product Information Card -->
          <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 class="font-semibold text-gray-900 mb-4">Product Information</h3>

            <div class="flex gap-4 mb-6">
              <img
                :src="product?.image || 'https://via.placeholder.com/80'"
                :alt="product?.Prod_name"
                class="w-20 h-20 rounded-lg object-cover bg-gray-100"
              />
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 mb-1">{{ product?.Prod_name || 'Unknown Product' }}</h4>
                <p class="text-sm text-gray-500 mb-1">SKU: {{ product?.Barcode || 'N/A' }}</p>
                <p class="text-sm text-gray-500">{{ product?.category_name || 'Unknown Category' }}</p>
              </div>
            </div>

            <div class="space-y-3 text-sm border-t border-gray-200 pt-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Unit Cost:</span>
                <span class="font-medium text-gray-900">${{ product?.cost_price || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Min. Stock:</span>
                <span class="font-medium text-gray-900">{{ product?.min_stock_level || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Max. Stock:</span>
                <span class="font-medium text-gray-900">{{ product?.max_stock_level || 0 }}</span>
              </div>
            </div>
          </div>

          <!-- Stock Status Card -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Status Overview</h3>

            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span class="text-sm text-gray-600">Current Status:</span>
                <span :class="`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(currentStatus)}`">
                  {{ currentStatus }}
                </span>
              </div>
              <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span class="text-sm text-gray-600">New Status:</span>
                <span :class="`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(newStatus)}`">
                  {{ newStatus }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle Column - Restock Details -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="font-semibold text-gray-900 mb-6">Restock Details</h3>

          <div class="space-y-6">
            <!-- Quantity to Add -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">
                Quantity to Add <span class="text-red-500">*</span>
              </label>
              <div class="flex items-center gap-3">
                <button
                  @click="handleDecrement"
                  class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <input
                  type="number"
                  v-model.number="quantity"
                  @input="validateQuantity"
                  class="flex-1 text-center text-2xl font-bold border border-gray-300 rounded-lg py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  @click="handleIncrement"
                  class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-2">
                New stock level will be <span class="font-semibold text-gray-900">{{ newStockLevel }} units</span>
              </p>
            </div>

            <!-- Supplier -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">
                Supplier <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="supplier"
                  class="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="Peripheral Plus">Peripheral Plus</option>
                  <option value="Tech Suppliers Inc">Tech Suppliers Inc</option>
                  <option value="Global Electronics">Global Electronics</option>
                </select>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <!-- Unit Cost -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">
                Unit Cost (USD)
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  v-model.number="unitCost"
                  class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <!-- Restock Reason -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">
                Restock Reason
              </label>
              <div class="relative">
                <select
                  v-model="restockReason"
                  class="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Scheduled Restock">Scheduled Restock</option>
                  <option value="High Demand">High Demand</option>
                </select>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">
                Notes (Optional)
              </label>
              <textarea
                v-model="notes"
                placeholder="Additional notes about this restock..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                rows="4"
              />
            </div>
          </div>
        </div>

        <!-- Right Column - Summary & Actions -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            <h3 class="font-semibold text-gray-900 mb-6">Summary</h3>

            <div class="space-y-4 mb-6">
              <div class="p-4 bg-blue-50 rounded-lg">
                <p class="text-xs text-blue-600 mb-1">Units to Add</p>
                <p class="text-2xl font-bold text-blue-600">+{{ quantity }}</p>
              </div>

              <div class="p-4 bg-green-50 rounded-lg">
                <p class="text-xs text-green-600 mb-1">New Stock Level</p>
                <p class="text-2xl font-bold text-green-600">{{ newStockLevel }}</p>
              </div>

              <div class="p-4 bg-orange-50 rounded-lg">
                <p class="text-xs text-orange-600 mb-1">Total Cost</p>
                <p class="text-2xl font-bold text-orange-600">${{ (quantity * product?.cost_price).toFixed(2) }}</p>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4 mb-6 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Supplier:</span>
                <span class="font-medium text-gray-900">{{ supplier }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Reason:</span>
                <span class="font-medium text-gray-900">{{ restockReason }}</span>
              </div>
            </div>

            <div v-if="submitError" class="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p class="text-sm text-red-700">{{ submitError }}</p>
            </div>

            <div class="space-y-3">
              <button @click="Restock" class="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Confirm Restock
              </button>
              <button class="w-full bg-white text-gray-700 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {  useRoute } from 'vue-router'
import { getOneProduct as fetchProductById } from '@/service/api'
import { useProductStore } from '@/stores/productStore'
import { useActionMessage } from '@/composable/useActionMessage'
import router from '@/router'
const { showSuccess, showError } = useActionMessage()
const quantity = ref(1)
const unitCost = ref(0)
const supplier = ref('Peripheral Plus')
const notes = ref('')
const restockReason = ref('Out of Stock')
const submitError = ref('')


const route = useRoute()
const productStore = useProductStore()
const product = ref(null)

let realqty = null
const reStockId = route.params.reStockId;
onMounted(async () => {
  const id = route.params.reStockId
  if (!reStockId) return console.error("No product ID found in route")

  try {
    const response = await fetchProductById(id)
    if (response?.data) {
      product.value = Array.isArray(response.data) ? response.data[0] : response.data
    } else if (Array.isArray(response)) {
      product.value = response[0]
    } else {
      product.value = response
    }
  } catch (error) {
    showError('Error fetching products')
    console.error("Error fetching product:", error)
  }
})

const newStockLevel = computed(() => {
  if (!product.value) return quantity.value
  const qty = Number(product.value.quantity || 0)
  realqty = qty + quantity.value
  return realqty
})

const currentStatus = computed(() => {
  if (!product.value) return 'Loading...'
  const stock = Number(product.value.quantity || 0)
  if (stock === 0) return 'Out of Stock'
  if (stock < product.value.min_stock_level) return 'Low Stock'
  return 'In Stock'
})

const newStatus = computed(() => {
  if (!product.value) return 'Loading...'
  const total = newStockLevel.value
  if (total === 0) return 'Out of Stock'
  if (total < product.value.min_stock_level) return 'Low Stock'
  return 'In Stock'
})

const handleIncrement = () => {
  quantity.value++
}

const handleDecrement = () => {
  quantity.value = Math.max(1, quantity.value - 1)
}

const validateQuantity = (e) => {
  const value = parseInt(e.target.value)
  if (isNaN(value) || value < 1) {
    quantity.value = 1
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'In Stock':
      return 'text-green-600'
    case 'Low Stock':
      return 'text-orange-600'
    case 'Out of Stock':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

const getStatusBadge = (status) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-700'
    case 'Low Stock':
      return 'bg-orange-100 text-orange-700'
    case 'Out of Stock':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const Restock = async () => {

  submitError.value = ''
  try {
    await productStore.addStockLevel(product.value.id, realqty)

      showSuccess('Restock successful')
    

  } catch (error) {
    submitError.value =
      error?.response?.data?.message ||
      error.message ||
      'An error occurred while restocking the product.'
    console.error('Error restocking:', error)
  }
}
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
