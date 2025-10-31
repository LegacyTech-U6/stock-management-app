<template>
  <div class="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="bg-white shadow-sm z-10 flex-shrink-0">
      <div class="max-w-8xl mx-auto px-6 py-4">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-all hover:gap-3 group"
        >
          <ChevronLeft class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span class="text-sm font-medium">Back to Products</span>
        </button>

        <div class="flex items-start justify-between flex-wrap gap-4">
          <div class="flex-1 min-w-0">
            <h1 class="text-3xl font-bold text-gray-900 mb-2 truncate">
              {{ product?.Prod_name || 'Product Details' }}
            </h1>
            <div class="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
              <div class="flex items-center gap-1.5">
                <Barcode class="w-4 h-4" />
                <span>SKU: {{ product?.code_bar }}</span>
              </div>
              <span class="text-gray-300">•</span>
              <div class="flex items-center gap-1.5">
                <Tag class="w-4 h-4" />
                <span>{{ product?.category_id }}</span>
              </div>
            </div>
          </div>
          <span :class="stockBadgeClass" class="flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span :class="`absolute inline-flex h-full w-full rounded-full opacity-75 ${stockPulseClass} ${quantityNum <= 10 ? 'animate-ping' : ''}`"></span>
              <span :class="`relative inline-flex rounded-full h-2 w-2 ${stockDotClass}`"></span>
            </span>
            {{ stockStatus }}
          </span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <div class=" mx-auto px-5  py-8">
        <!-- Loading State -->
        <div v-if="loading" class="bg-white rounded-xl shadow-sm p-12">
          <div class="flex flex-col items-center justify-center">
            <Loader2 class="w-12 h-12 text-gray-400 animate-spin mb-4" />
            <p class="text-gray-500">Loading product details...</p>
          </div>
        </div>

        <!-- No Product State -->
        <div v-else-if="!product" class="bg-white rounded-xl shadow-sm p-12">
          <div class="text-center">
            <div class="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <PackageX class="w-10 h-10 text-gray-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">No product data found</h3>
            <p class="text-gray-500 mb-6">Please select a product from the inventory list</p>
            <button
              @click="goBack"
              class="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg inline-flex items-center gap-2"
            >
              <ArrowLeft class="w-4 h-4" />
              Go Back to Products
            </button>
          </div>
        </div>

        <!-- Product Content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <!-- Left Column - Product Image & Quick Stats -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Product Image Card -->
            <div class="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <div class="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden group">
                <div v-if="product.Prod_image" class="relative w-full h-full">
                  <img
                    :src="product.Prod_image"
                    :alt="product.Prod_name"
                    class="w-full h-full object-contain p-4 transition-transform group-hover:scale-105"
                  />
                </div>
                <div v-else class="text-center">
                  <ImageOff class="w-16 h-16 text-gray-300 mb-3" />
                  <p class="text-sm text-gray-400">No image available</p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div>
                    <div class="text-xs font-medium text-blue-600 mb-1 flex items-center gap-1">
                      <DollarSign class="w-3 h-3" />
                      Selling Price
                    </div>
                    <div class="text-3xl font-bold text-blue-900">
                      ${{ formatPrice(product.selling_price) }}
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs font-medium text-green-600 mb-1 flex items-center gap-1 justify-end">
                      <TrendingUp class="w-3 h-3" />
                      Profit
                    </div>
                    <div class="text-xl font-bold text-green-700">+{{ profitMargin }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Details -->
          <div class="lg:col-span-2 space-y-4">
            <!-- Stock Information -->
            <div class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-2 mb-6">
                <Package class="w-5 h-5 text-gray-700" />
                <h3 class="text-lg font-bold text-gray-900">Stock Information</h3>
              </div>

              <div class="mb-6">
                <div class="flex items-baseline justify-between mb-3">
                  <span class="text-sm font-medium text-gray-600">Current Inventory</span>
                  <div class="flex items-baseline gap-2">
                    <span class="text-4xl font-bold text-gray-900">{{ product.quantity }}</span>
                    <span class="text-sm text-gray-500">units</span>
                  </div>
                </div>

                <div class="relative">
                  <div class="flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
                    <span class="flex items-center gap-1">
                      <AlertCircle class="w-3 h-3" />
                      Min: 10
                    </span>
                    <span :class="`font-semibold ${stockPercentageColor}`">{{ stockPercentage.toFixed(1) }}%</span>
                    <span>Max: 100</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      :class="stockLevelColor"
                      class="h-3 rounded-full transition-all duration-500 shadow-sm"
                      :style="{ width: stockPercentage + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-gray-50 rounded-lg">
                  <div class="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                    <Truck class="w-3 h-3" />
                    Supplier
                  </div>
                  <div class="text-sm font-semibold text-gray-900">{{ product.supplier_name || 'N/A' }}</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                  <div class="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                    <Calendar class="w-3 h-3" />
                    Last Restocked
                  </div>
                  <div class="text-sm font-semibold text-gray-900">{{ formatDate(product.date_of_arrival) }}</div>
                </div>
              </div>
            </div>



            <!-- Pricing Information -->
            <div class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-2 mb-6">
                <DollarSign class="w-5 h-5 text-gray-700" />
                <h3 class="text-lg font-bold text-gray-900">Pricing Information</h3>
              </div>

              <div class="space-y-3">
                <!-- Unit Prices -->
                <div class="grid grid-cols-2 gap-3">
                  <div class="py-3 px-4 bg-gray-50 rounded-lg">
                    <span class="text-xs font-medium text-gray-500 flex items-center gap-1 mb-1">
                      <ArrowDown class="w-3 h-3 text-red-500" />
                      Cost Price (Unit)
                    </span>
                    <span class="text-lg font-bold text-gray-900">${{ formatPrice(product.cost_price) }}</span>
                  </div>
                  <div class="py-3 px-4 bg-gray-50 rounded-lg">
                    <span class="text-xs font-medium text-gray-500 flex items-center gap-1 mb-1">
                      <ArrowUp class="w-3 h-3 text-blue-500" />
                      Selling Price (Unit)
                    </span>
                    <span class="text-lg font-bold text-gray-900">${{ formatPrice(product.selling_price) }}</span>
                  </div>
                </div>

                <!-- Total Values -->
                <div class="grid grid-cols-2 gap-3">
                  <div class="py-3 px-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg">
                    <div class="flex items-center gap-1 mb-1">
                      <Layers class="w-3 h-3 text-red-600" />
                      <span class="text-xs font-medium text-red-600">Total Cost Value</span>
                    </div>
                    <div class="text-xl font-bold text-red-700">${{ formatPrice(totalCostValue) }}</div>
                    <div class="text-xs text-red-600 mt-0.5">{{ quantityNum }} units × ${{ formatPrice(product.cost_price) }}</div>
                  </div>
                  <div class="py-3 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                    <div class="flex items-center gap-1 mb-1">
                      <Layers class="w-3 h-3 text-blue-600" />
                      <span class="text-xs font-medium text-blue-600">Total Selling Value</span>
                    </div>
                    <div class="text-xl font-bold text-blue-700">${{ formatPrice(totalSellingValue) }}</div>
                    <div class="text-xs text-blue-600 mt-0.5">{{ quantityNum }} units × ${{ formatPrice(product.selling_price) }}</div>
                  </div>
                </div>

                <!-- Profit Summary -->
                <div class="space-y-2 pt-2">
                  <div class="flex items-center justify-between py-4 px-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
                    <span class="text-sm font-semibold text-green-700 flex items-center gap-2">
                      <TrendingUp class="w-4 h-4" />
                      Profit Margin
                    </span>
                    <span class="text-2xl font-bold text-green-700">+{{ profitMargin }}%</span>
                  </div>
                  <div class="flex items-center justify-between py-4 px-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-lg">
                    <span class="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                      <DollarSign class="w-4 h-4" />
                      Total Potential Profit
                    </span>
                    <span class="text-2xl font-bold text-emerald-700">${{ formatPrice(totalProfit) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                @click="handleEdit"
                class="px-6 py-3.5 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all hover:shadow-md flex items-center justify-center gap-2 group"
              >
                <Edit3 class="w-5 h-5 transition-transform group-hover:rotate-12" />
                Edit Details
              </button>
              <button
                @click="handleRestock"
                class="px-6 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <RefreshCw class="w-5 h-5 transition-transform group-hover:rotate-180" />
                Restock Item
              </button>
            </div>
          </div>
               <!-- Product Details -->
            <div class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-2 mb-6">
                <FileText class="w-5 h-5 text-gray-700" />
                <h3 class="text-lg font-bold text-gray-900">Product Details</h3>
              </div>

              <div class="mb-6">
                <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Info class="w-4 h-4" />
                  Description
                </h4>
                <p class="text-sm text-gray-600 leading-relaxed pl-6">
                  {{ product.Prod_Description || 'No description available for this product.' }}
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="showEditModal = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Edit3 class="w-5 h-5 text-blue-600" />
            </div>
            <h2 class="text-xl font-bold text-gray-900">Edit Product</h2>
          </div>
          <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <div class="p-4 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input
                v-model="editForm.Prod_name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">SKU / Barcode</label>
              <input
                v-model="editForm.code_bar"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter SKU"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input
                v-model="editForm.category_id"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter category"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <input
                v-model.number="editForm.quantity"
                type="number"
                required
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Cost Price ($)</label>
              <input
                v-model.number="editForm.cost_price"
                type="number"
                required
                min="0"
                step="0.01"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Selling Price ($)</label>
              <input
                v-model.number="editForm.selling_price"
                type="number"
                required
                min="0"
                step="0.01"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Supplier Name</label>
              <input
                v-model="editForm.supplier_name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter supplier name"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                v-model="editForm.Prod_Description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter product description"
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input
                v-model="editForm.Prod_image"
                type="url"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t border-gray-200">
            <button
              @click="showEditModal = false"
              class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              @click="handleSaveEdit"
              :disabled="saving"
              class="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save class="w-5 h-5" v-if="!saving" />
              <Loader2 class="w-5 h-5 animate-spin" v-else />
              {{ saving ? 'Saving...' : 'Save Changes' }}
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
import { getOneProduct as fetchProductById } from '@/service/api'
import { useActionMessage } from '@/composable/useActionMessage'
import {
  ChevronLeft,
  Barcode,
  Tag,
  PackageX,
  ArrowLeft,
  ImageOff,
  DollarSign,
  TrendingUp,
  Package,
  AlertCircle,
  Truck,
  Calendar,
  FileText,
  Info,
  ArrowDown,
  ArrowUp,
  Edit3,
  RefreshCw,
  Loader2,
  X,
  Save
} from 'lucide-vue-next'
import { useGlobalModal } from "@/composable/useValidation";
const { show } = useGlobalModal();
const { showSuccess, showError } = useActionMessage()

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
const loading = ref(true)
const showEditModal = ref(false)
const saving = ref(false)
const editForm = ref<Product>({
  Prod_name: '',
  quantity: 0,
  cost_price: 0,
  selling_price: 0,
  category_id: '',
  Prod_Description: '',
  code_bar: '',
  date_of_arrival: '',
  supplier_name: '',
  Prod_image: ''
})

onMounted(async () => {
  if (route.params.id) {
    try {
      loading.value = true
      const response = await fetchProductById(route.params.id)

      if (response.data) {
        product.value = Array.isArray(response.data) ? response.data[0] : response.data
      } else if (Array.isArray(response)) {
        product.value = response[0]
      } else {
        product.value = response
      }
    } catch (error) {
      show('Error fetching product details', 'error')
      console.error('Error fetching product:', error)
    } finally {
      loading.value = false
    }
  } else {
    loading.value = false
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
  const baseClasses = 'text-sm px-4 py-2 rounded-xl font-semibold whitespace-nowrap shadow-sm'

  if (qty === 0) {
    return `${baseClasses} bg-red-50 text-red-700 border-2 border-red-200`
  }
  if (qty <= 10) {
    return `${baseClasses} bg-yellow-50 text-yellow-700 border-2 border-yellow-200`
  }
  return `${baseClasses} bg-green-50 text-green-700 border-2 border-green-200`
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
  if (stockPercentage.value < 20) return 'text-red-600'
  if (stockPercentage.value < 50) return 'text-orange-600'
  return 'text-green-600'
})

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
  if (!product.value) return

  // Populate edit form with current product data
  editForm.value = {
    ...product.value,
    quantity: typeof product.value.quantity === 'string'
      ? parseInt(product.value.quantity)
      : product.value.quantity,
    cost_price: typeof product.value.cost_price === 'string'
      ? parseFloat(product.value.cost_price)
      : product.value.cost_price,
    selling_price: typeof product.value.selling_price === 'string'
      ? parseFloat(product.value.selling_price)
      : product.value.selling_price
  }

  showEditModal.value = true
}

const handleSaveEdit = async () => {
  try {
    saving.value = true

    // Here you would call your update API
    // await updateProduct(product.value.id, editForm.value)

    // Update local product data
    product.value = { ...editForm.value }

    show('Product updated successfully', 'success')
    showEditModal.value = false
  } catch (error) {
    show('Failed to update product', 'error')
    console.error('Error updating product:', error)
  } finally {
    saving.value = false
  }
}

const handleRestock = () => {
  if (!product.value) return console.error('❌ No product loaded')

  router.push({
    name: 'restock',
    params: { reStockId: product.value.id }
  })
}

const formatPrice = (value: any) => {
  const num = parseFloat(value)
  return isNaN(num) ? '0.00' : num.toFixed(2)
}
const totalCostValue = computed(() => {
  if (!product.value) return 0
  const qty = quantityNum.value
  const cost = parseFloat(product.value.cost_price?.toString() || '0')
  return qty * cost
})
const totalSellingValue = computed(() => {
  if (!product.value) return 0
  const qty = quantityNum.value
  const selling = parseFloat(product.value.selling_price?.toString() || '0')
  return qty * selling
})
const totalProfit = computed(() => {
  return totalSellingValue.value - totalCostValue.value
})
</script>
