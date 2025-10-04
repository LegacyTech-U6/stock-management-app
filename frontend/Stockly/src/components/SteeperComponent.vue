<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-8">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p class="text-sm text-gray-600">Create a new product in your inventory</p>
        </div>
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm">
          <span class="text-lg">←</span>
          Cancel
        </button>
      </div>
    </div>

    <!-- Stepper Container -->
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <!-- Progress Steps -->
      <div class="relative mb-12">
        <!-- Progress Bar -->
        <div class="absolute top-8 left-16 right-16 h-0.5 bg-gray-200">
          <div
            class="h-full bg-emerald-500 transition-all duration-500 ease-out"
            :style="{ width: stepperProgress }"
          ></div>
        </div>

        <!-- Steps -->
        <div class="relative flex justify-between">
          <div
            v-for="(stepItem, index) in stepItems"
            :key="index"
            class="flex flex-col items-center flex-1"
          >
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform"
              :class="{
                'bg-gray-200': step < stepItem.id,
                'bg-indigo-600 scale-110': step === stepItem.id,
                'bg-emerald-500': step > stepItem.id
              }"
            >
              <span
                v-if="step > stepItem.id"
                class="text-white text-2xl font-bold"
              >✓</span>
              <span
                v-else
                class="text-xl font-semibold"
                :class="step === stepItem.id ? 'text-white' : 'text-gray-500'"
              >{{ stepItem.id }}</span>
            </div>
            <span
              class="mt-3 text-sm font-medium text-center transition-colors duration-300"
              :class="{
                'text-gray-500': step < stepItem.id,
                'text-indigo-600': step === stepItem.id,
                'text-emerald-600': step > stepItem.id
              }"
            >{{ stepItem.title }}</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="mb-8">
        <!-- Step 1: Basic Info -->
        <div v-if="step === 1" class="space-y-6 min-h-[400px]">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
            <input
              type="text"
              v-model="formData.Prod_name"
              placeholder="Enter product name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
              :class="{ 'border-red-500 ring-2 ring-red-200': errors.Prod_name }"
            />
            <p v-if="errors.Prod_name" class="text-red-600 text-xs mt-1 font-medium">{{ errors.Prod_name }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Barcode *</label>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="formData.code_bar"
                  placeholder="Auto-generated"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                  :class="{ 'border-red-500 ring-2 ring-red-200': errors.code_bar }"
                />
                <button
                  @click="handleAutoGenerateBarcode"
                  class="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 whitespace-nowrap font-medium shadow-md hover:shadow-lg"
                >
                  🔄 Generate
                </button>
              </div>
              <p v-if="errors.code_bar" class="text-red-600 text-xs mt-1 font-medium">{{ errors.code_bar }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                v-model="formData.category_id"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                :class="{ 'border-red-500 ring-2 ring-red-200': errors.category_id }"
              >
                <option value="">Select category</option>
                <option value="1">Electronics</option>
                <option value="2">Computers</option>
                <option value="3">Accessories</option>
              </select>
              <p v-if="errors.category_id" class="text-red-600 text-xs mt-1 font-medium">{{ errors.category_id }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Supplier *</label>
            <select
              v-model="formData.supplier"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
              :class="{ 'border-red-500 ring-2 ring-red-200': errors.supplier }"
            >
              <option value="">Select supplier</option>
              <option value="1">Gaming Tech Corp</option>
              <option value="2">Tech Solutions Ltd</option>
              <option value="3">Digital Supplies Inc</option>
            </select>
            <p v-if="errors.supplier" class="text-red-600 text-xs mt-1 font-medium">{{ errors.supplier }}</p>
          </div>
        </div>

        <!-- Step 2: Pricing & Stock -->
        <div v-if="step === 2" class="space-y-6 min-h-[400px]">
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Pricing & Stock</h3>
            <p class="text-sm text-gray-600 mb-6">Configure pricing and inventory information</p>
          </div>

          <div class="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Cost Price *</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="number"
                    v-model="formData.cost_price"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                    :class="{ 'border-red-500 ring-2 ring-red-200': errors.cost_price }"
                  />
                </div>
                <p v-if="errors.cost_price" class="text-red-600 text-xs mt-1 font-medium">{{ errors.cost_price }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Selling Price *</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="number"
                    v-model="formData.selling_price"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                    :class="{ 'border-red-500 ring-2 ring-red-200': errors.selling_price }"
                  />
                </div>
                <p v-if="errors.selling_price" class="text-red-600 text-xs mt-1 font-medium">{{ errors.selling_price }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Initial Quantity</label>
                <input
                  type="number"
                  v-model="formData.quantity"
                  placeholder="0"
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Min Stock Level</label>
                <input
                  type="number"
                  v-model="formData.min_stock_level"
                  placeholder="0"
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Max Stock Level</label>
                <input
                  type="number"
                  v-model="formData.max_stock_level"
                  placeholder="0"
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Date of Arrival</label>
                <input
                  type="date"
                  v-model="formData.date_of_arrival"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Description & Image -->
        <div v-if="step === 3" class="space-y-6 min-h-[400px]">
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Description & Image</h3>
            <p class="text-sm text-gray-600 mb-6">Add product details and image</p>
          </div>

          <div class="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Product Image URL</label>
              <input
                type="text"
                v-model="formData.Prod_image"
                placeholder="https://example.com/product-image.jpg"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
              />
              <p class="text-xs text-gray-500 mt-1">Enter a valid image URL for the product</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                v-model="formData.Prod_Description"
                rows="6"
                placeholder="Describe the product features, benefits, and specifications..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 4: Review -->
        <div v-if="step === 4" class="space-y-6 min-h-[400px]">
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Review & Confirm</h3>
            <p class="text-sm text-gray-600 mb-6">Please review all information before submitting</p>
          </div>

          <div class="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h4 class="font-bold text-lg text-gray-800 mb-4 border-b border-indigo-200 pb-2">Basic Information</h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600 font-medium">Product Name:</span>
                    <span class="text-gray-900 font-semibold">{{ formData.Prod_name || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 font-medium">Barcode:</span>
                    <span class="text-gray-900 font-semibold">{{ formData.code_bar || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 font-medium">Category:</span>
                    <span class="text-gray-900 font-semibold">{{ getCategoryName(formData.category_id) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 font-medium">Supplier:</span>
                    <span class="text-gray-900 font-semibold">{{ getSupplierName(formData.supplier) }}</span>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="font-bold text-lg text-gray-800 mb-4 border-b border-indigo-200 pb-2">Pricing & Stock</h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600 font-medium">Cost Price:</span>
                    <span class="text-gray-900 font-semibold">${{ formData.cost_price || '0.00' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 font-medium">Selling Price:</span>
                    <span class="text-emerald-600 font-bold text-lg">${{ formData.selling_price || '0.00' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 font-medium">Quantity:</span>
                    <span class="text-gray-900 font-semibold">{{ formData.quantity || 0 }} units</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 font-medium">Stock Range:</span>
                    <span class="text-gray-900 font-semibold">{{ formData.min_stock_level }} - {{ formData.max_stock_level }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="formData.Prod_Description" class="mt-6 pt-6 border-t border-indigo-200">
              <h4 class="font-bold text-lg text-gray-800 mb-3">Description</h4>
              <p class="text-gray-700 text-sm leading-relaxed">{{ formData.Prod_Description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          @click="prevStep"
          :disabled="step === 1"
          class="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
        >
          <span class="text-lg">←</span>
          Previous
        </button>

        <div class="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
          Step {{ step }} of {{ stepItems.length }}
        </div>

        <button
          v-if="step < stepItems.length"
          @click="nextStep"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Next
          <span class="text-lg">→</span>
        </button>

        <button
          v-else
          @click="handleSubmit"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <span class="text-lg">✓</span>
          Add Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(1)
const errors = ref({})

const stepItems = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Pricing & Stock' },
  { id: 3, title: 'Description' },
  { id: 4, title: 'Review' },
]

const formData = ref({
  Prod_name: '',
  quantity: 0,
  cost_price: 0,
  selling_price: 0,
  category_id: '',
  Prod_Description: '',
  code_bar: '',
  date_of_arrival: new Date().toISOString().split('T')[0],
  supplier: '',
  Prod_image: '',
  min_stock_level: 10,
  max_stock_level: 100,
})

const stepperProgress = computed(() => {
  return `${(100 / (stepItems.length - 1)) * (step.value - 1)}%`
})

const nextStep = () => {
  if (validateStep(step.value)) {
    if (step.value < stepItems.length) step.value++
  }
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const generateBarcode = () => {
  const prefix = formData.value.Prod_name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 3)
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix || 'PRD'}-${timestamp}-${random}`
}

const handleAutoGenerateBarcode = () => {
  if (formData.value.Prod_name) {
    formData.value.code_bar = generateBarcode()
    delete errors.value.code_bar
  }
}

const validateStep = (currentStep) => {
  const newErrors = {}

  if (currentStep === 1) {
    if (!formData.value.Prod_name.trim()) {
      newErrors.Prod_name = 'Product name is required'
    }
    if (!formData.value.code_bar.trim()) {
      newErrors.code_bar = 'Barcode is required'
    }
    if (!formData.value.category_id) {
      newErrors.category_id = 'Category is required'
    }
    if (!formData.value.supplier) {
      newErrors.supplier = 'Supplier is required'
    }
  }

  if (currentStep === 2) {
    if (!formData.value.cost_price || formData.value.cost_price <= 0) {
      newErrors.cost_price = 'Cost price must be greater than 0'
    }
    if (!formData.value.selling_price || formData.value.selling_price <= 0) {
      newErrors.selling_price = 'Selling price must be greater than 0'
    }
    if (parseFloat(formData.value.selling_price) < parseFloat(formData.value.cost_price)) {
      newErrors.selling_price = 'Selling price should be greater than cost price'
    }
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const getCategoryName = (id) => {
  const categories = {
    '1': 'Electronics',
    '2': 'Computers',
    '3': 'Accessories'
  }
  return categories[id] || '-'
}

const getSupplierName = (id) => {
  const suppliers = {
    '1': 'Gaming Tech Corp',
    '2': 'Tech Solutions Ltd',
    '3': 'Digital Supplies Inc'
  }
  return suppliers[id] || '-'
}

const handleSubmit = () => {
  if (!validateStep(4)) return

  const productData = {
    ...formData.value,
    // Convert string values to appropriate types for backend
    quantity: parseInt(formData.value.quantity) || 0,
    cost_price: parseFloat(formData.value.cost_price) || 0,
    selling_price: parseFloat(formData.value.selling_price) || 0,
    category_id: parseInt(formData.value.category_id) || null,
    supplier: parseInt(formData.value.supplier) || null,
    min_stock_level: parseInt(formData.value.min_stock_level) || 0,
    max_stock_level: parseInt(formData.value.max_stock_level) || null,
  }

  console.log('✅ Product Data to Submit:', productData)
  alert('Product added successfully!')

  // Reset form
  formData.value = {
    Prod_name: '',
    quantity: 0,
    cost_price: 0,
    selling_price: 0,
    category_id: '',
    Prod_Description: '',
    code_bar: '',
    date_of_arrival: new Date().toISOString().split('T')[0],
    supplier: '',
    Prod_image: '',
    min_stock_level: 10,
    max_stock_level: 100,
  }
  step.value = 1
}
</script>
