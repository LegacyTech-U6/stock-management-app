<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile-First Header -->
    <div class="bg-white border-b sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex-1">
            <button
              @click="$router.back()"
              class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-3 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span class="font-medium">Back to Products</span>
            </button>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Add New Product</h1>
            <p class="text-sm text-gray-500 mt-1">Create and manage your inventory</p>
          </div>
          <button
            @click="$router.push('/product')"
            class="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            :disabled="loading"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Progress Stepper - Desktop -->
      <div class="hidden md:block bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-6">
        <div class="relative">
          <!-- Progress Line -->
          <div class="absolute top-5 left-0 right-0 h-0.5 bg-gray-100">
            <div
              class="h-full bg-black transition-all duration-500 ease-out"
              :style="{ width: `${((step - 1) / 3) * 100}%` }"
            ></div>
          </div>
          
          <!-- Step Indicators -->
          <div class="relative flex justify-between">
            <div
              v-for="(s, i) in steps"
              :key="i"
              class="flex flex-col items-center cursor-pointer group"
              @click="navigateToStep(i + 1)"
            >
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2"
                :class="
                  step > i + 1
                    ? 'bg-black border-black text-white'
                    : step === i + 1
                      ? 'bg-black border-black text-white shadow-lg shadow-black/20'
                      : 'bg-white border-gray-200 text-gray-400 group-hover:border-gray-300'
                "
              >
                <svg
                  v-if="step > i + 1"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span
                class="mt-3 text-xs sm:text-sm font-medium transition-colors"
                :class="step >= i + 1 ? 'text-gray-900' : 'text-gray-400'"
              >
                {{ s }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Progress -->
      <div class="md:hidden bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-gray-900">Step {{ step }} of 4</span>
          <span class="text-sm text-gray-500">{{ steps[step - 1] }}</span>
        </div>
        <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-black transition-all duration-500"
            :style="{ width: `${(step / 4) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="p-6 sm:p-8">
          <!-- Step 1: Basic Information -->
          <div v-show="step === 1" class="space-y-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Product Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-shadow"
                :class="{ 'border-red-500 focus:ring-red-500': errors.name }"
                placeholder="Enter product name"
                :disabled="loading"
              />
              <p v-if="errors.name" class="text-red-600 text-xs mt-1.5">{{ errors.name }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Barcode <span class="text-red-500">*</span>
                </label>
                <div class="flex gap-2">
                  <input
                    v-model="form.barcode"
                    class="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    :class="{ 'border-red-500 focus:ring-red-500': errors.barcode }"
                    placeholder="Auto-generated"
                    :disabled="loading"
                  />
                  <button
                    @click="generateBarcode"
                    class="px-4 py-2.5 text-sm font-medium bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                    :disabled="loading || !form.name"
                  >
                    Generate
                  </button>
                </div>
                <p v-if="errors.barcode" class="text-red-600 text-xs mt-1.5">{{ errors.barcode }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Category <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.category"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black bg-white"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.category }"
                  :disabled="loading"
                >
                  <option value="">Select category</option>
                  <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
                <p v-if="errors.category" class="text-red-600 text-xs mt-1.5">{{ errors.category }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">
                Supplier <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.supplier"
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black bg-white"
                :class="{ 'border-red-500 focus:ring-red-500': errors.supplier }"
                :disabled="loading"
              >
                <option value="">Select supplier</option>
                <option v-for="s in supplierStore.suppliers" :key="s.id" :value="s.id">
                  {{ s.supplier_name }}
                </option>
              </select>
              <p v-if="errors.supplier" class="text-red-600 text-xs mt-1.5">{{ errors.supplier }}</p>
            </div>
          </div>

          <!-- Step 2: Pricing & Stock -->
          <div v-show="step === 2" class="space-y-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-6">Pricing & Inventory</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Cost Price <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-2.5 text-gray-500 text-sm">$</span>
                  <input
                    v-model.number="form.costPrice"
                    type="number"
                    step="0.01"
                    class="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    :class="{ 'border-red-500 focus:ring-red-500': errors.costPrice }"
                    placeholder="0.00"
                    :disabled="loading"
                  />
                </div>
                <p v-if="errors.costPrice" class="text-red-600 text-xs mt-1.5">{{ errors.costPrice }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">
                  Selling Price <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-2.5 text-gray-500 text-sm">$</span>
                  <input
                    v-model.number="form.sellingPrice"
                    type="number"
                    step="0.01"
                    class="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    :class="{ 'border-red-500 focus:ring-red-500': errors.sellingPrice }"
                    placeholder="0.00"
                    :disabled="loading"
                  />
                </div>
                <p v-if="errors.sellingPrice" class="text-red-600 text-xs mt-1.5">
                  {{ errors.sellingPrice }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Initial Quantity</label>
                <input
                  v-model.number="form.quantity"
                  type="number"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="0"
                  :disabled="loading"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Min Stock Level</label>
                <input
                  v-model.number="form.minStock"
                  type="number"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="0"
                  :disabled="loading"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Max Stock Level</label>
                <input
                  v-model.number="form.maxStock"
                  type="number"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="0"
                  :disabled="loading"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Date of Arrival</label>
                <input
                  v-model="form.arrivalDate"
                  type="date"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  :disabled="loading"
                />
              </div>
            </div>

            <!-- Profit Margin Display -->
            <div
              v-if="form.costPrice > 0 && form.sellingPrice > 0"
              class="bg-blue-50 border border-blue-100 rounded-lg p-4"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Profit Margin</p>
                  <p class="text-xs text-gray-500 mt-0.5">Based on current pricing</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-blue-600">
                    ${{ (form.sellingPrice - form.costPrice).toFixed(2) }}
                  </p>
                  <p class="text-xs text-gray-600">
                    {{ ((((form.sellingPrice - form.costPrice) / form.costPrice) * 100) || 0).toFixed(1) }}% margin
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Additional Details -->
          <div v-show="step === 3" class="space-y-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-6">Additional Details</h2>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Product Image URL</label>
              <input
                v-model="form.imageUrl"
                type="url"
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                placeholder="https://example.com/image.jpg"
                :disabled="loading"
              />
              <p class="text-xs text-gray-500 mt-1.5">Optional: Add a URL to your product image</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Description</label>
              <textarea
                v-model="form.description"
                rows="5"
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black resize-none"
                placeholder="Describe your product, including key features, specifications, or other relevant details..."
                :disabled="loading"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1.5">
                {{ form.description.length }} characters
              </p>
            </div>
          </div>

          <!-- Step 4: Review -->
          <div v-show="step === 4" class="space-y-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-2">Review Your Product</h2>
              <p class="text-sm text-gray-500">Please verify all information before submitting</p>
            </div>

            <div class="bg-gray-50 rounded-xl p-6 space-y-6">
              <!-- Basic Info Section -->
              <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Basic Information
                </h3>
                <dl class="space-y-3">
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Product Name</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ form.name || '-' }}</dd>
                  </div>
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Barcode</dt>
                    <dd class="text-sm font-mono font-medium text-gray-900">{{ form.barcode || '-' }}</dd>
                  </div>
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Category</dt>
                    <dd class="text-sm font-medium text-gray-900">
                      {{ categories.find((c) => c.id == form.category)?.name || '-' }}
                    </dd>
                  </div>
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Supplier</dt>
                    <dd class="text-sm font-medium text-gray-900">
                      {{ supplierStore.suppliers.find((s) => s.id == form.supplier)?.supplier_name || '-' }}
                    </dd>
                  </div>
                </dl>
              </div>

              <!-- Pricing & Stock Section -->
              <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Pricing & Inventory
                </h3>
                <dl class="space-y-3">
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Cost Price</dt>
                    <dd class="text-sm font-semibold text-gray-900">${{ form.costPrice.toFixed(2) || '0.00' }}</dd>
                  </div>
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Selling Price</dt>
                    <dd class="text-sm font-semibold text-green-600">
                      ${{ form.sellingPrice.toFixed(2) || '0.00' }}
                    </dd>
                  </div>
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Profit Margin</dt>
                    <dd class="text-sm font-semibold text-blue-600">
                      ${{ (form.sellingPrice - form.costPrice).toFixed(2) }}
                      <span class="text-xs text-gray-500 ml-1">
                        ({{ ((((form.sellingPrice - form.costPrice) / form.costPrice) * 100) || 0).toFixed(1) }}%)
                      </span>
                    </dd>
                  </div>
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Initial Quantity</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ form.quantity || 0 }} units</dd>
                  </div>
                  <div class="flex justify-between py-2.5 border-b border-gray-200">
                    <dt class="text-sm text-gray-600">Stock Range</dt>
                    <dd class="text-sm font-medium text-gray-900">
                      {{ form.minStock || 0 }} - {{ form.maxStock || 0 }} units
                    </dd>
                  </div>
                  <div class="flex justify-between py-2.5">
                    <dt class="text-sm text-gray-600">Arrival Date</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ form.arrivalDate || '-' }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Description Section -->
              <div v-if="form.description">
                <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  Description
                </h3>
                <p class="text-sm text-gray-700 leading-relaxed">{{ form.description }}</p>
              </div>

              <!-- Image Section -->
              <div v-if="form.imageUrl">
                <h3 class="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Product Image
                </h3>
                <p class="text-xs text-gray-500 break-all">{{ form.imageUrl }}</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="submitError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex gap-3">
              <svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-sm text-red-800">{{ submitError }}</p>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-gray-200">
            <button
              @click="step--"
              :disabled="step === 1 || loading"
              class="w-full sm:w-auto order-2 sm:order-1 px-6 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div class="order-1 sm:order-2 text-center">
              <span class="text-sm text-gray-500 font-medium">Step {{ step }} of 4</span>
            </div>

            <button
              @click="step < 4 ? nextStep() : submit()"
              :disabled="loading"
              class="w-full sm:w-auto order-3 px-6 py-2.5 text-sm font-medium text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              :class="step < 4 ? 'bg-black hover:bg-gray-800' : 'bg-green-600 hover:bg-green-700'"
            >
              <div v-if="loading" class="loader-small"></div>
              <template v-else>
                <span>{{ step < 4 ? 'Next' : 'Add Product' }}</span>
                <svg v-if="step < 4" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore' // Adjust path to your store
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSupplierStore } from '@/stores/SupplierStore'

// Initialize store
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const supplierStore = useSupplierStore()
// Use store's loading state
const loading = computed(() => productStore.loading)

const step = ref(1)
const steps = ['Basic Information', 'Pricing & Stock', 'Description & Image', 'Review']
const errors = reactive({})
const submitError = ref('')

const form = reactive({
  name: '',
  barcode: '',
  category: '',
  supplier: '',
  costPrice: 0,
  sellingPrice: 0,
  quantity: 0,
  minStock: 10,
  maxStock: 100,
  arrivalDate: new Date().toISOString().split('T')[0],
  imageUrl: '',
  description: '',
})
const categories = ref([])

onMounted(async () => {
  categories.value = await categoryStore.fetchCategory()
  supplierStore.fetchSuppliers()
})

const generateBarcode = () => {
  if (!form.name) return
  const prefix =
    form.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 3) || 'PRD'
  form.barcode = `${prefix}-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')}`
  delete errors.barcode
}

const validateStep = (currentStep) => {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (currentStep === 1) {
    if (!form.name.trim()) errors.name = 'Product name is required'
    if (!form.barcode.trim()) errors.barcode = 'Barcode is required'
    if (!form.category) errors.category = 'Category is required'
    if (!form.supplier) errors.supplier = 'Supplier is required'
  }

  if (currentStep === 2) {
    if (form.costPrice <= 0) errors.costPrice = 'Cost price must be greater than 0'
    if (form.sellingPrice <= 0) errors.sellingPrice = 'Selling price must be greater than 0'
    if (form.sellingPrice < form.costPrice)
      errors.sellingPrice = 'Selling price should be greater than cost price'
  }

  return Object.keys(errors).length === 0
}

const nextStep = () => {
  if (validateStep(step.value)) step.value++
}

const submit = async () => {
  if (!validateStep(4)) return

  try {
    // Prepare data for store
    const productData = {
      Prod_name: form.name,
      quantity: form.quantity,
      cost_price: form.costPrice,
      selling_price: form.sellingPrice,
      category_id: form.category,
      Prod_Description: form.description,
      code_bar: form.barcode,
      date_of_arrival: form.arrivalDate,
      supplier: form.supplier,
      Prod_image: form.imageUrl,
      min_stock_level: form.minStock,
      max_stock_level: form.maxStock,
    }

    // Call store action - this will automatically set loading state
    await productStore.addProduct(productData)

    // Success - reset form and navigate
    resetForm()
    alert('Product added successfully!')
    // Optionally navigate away: $router.push('/products')
  } catch (error) {
    submitError.value =
      error?.response?.data?.message ||
      error.message ||
      'An error occurred while adding the product.'
    console.error('Error adding product:', error)
  }
}

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    form[key] =
      key === 'arrivalDate'
        ? new Date().toISOString().split('T')[0]
        : key === 'minStock'
          ? 10
          : key === 'maxStock'
            ? 100
            : typeof form[key] === 'number'
              ? 0
              : ''
  })
  step.value = 1
  submitError.value = ''
}
</script>

<style scoped>
input:focus,
select:focus,
textarea:focus {
  outline: none;
}

/* Loader Styles */
.loader {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loader-small {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
