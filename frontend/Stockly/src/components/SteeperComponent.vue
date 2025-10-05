<template>
  <div class="min-h-screen bg-gray-50/50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="px-6 py-5">
        <div class="flex justify-between items-center">
          <div>
            <button
              @click="$router.back()"
              class="text-gray-500 hover:text-gray-700 text-sm mb-2 flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Products
            </button>
            <h1 class="text-2xl font-bold">Add New Product</h1>
            <p class="text-gray-500 text-sm mt-1">Create a new product in your inventory</p>
          </div>
          <button
            @click="$router.push('/product')"
            class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
            :disabled="loading"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="mx-auto p-6">
      <div class="bg-white rounded-xl shadow-sm">
        <!-- Progress -->
        <div class="p-8 pb-6">
          <div class="relative">
            <div class="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <div
                class="h-full bg-black transition-all duration-500"
                :style="{ width: `${(step - 1) * 33.33}%` }"
              ></div>
            </div>
            <div class="relative flex justify-between">
              <div
                v-for="(s, i) in steps"
                :key="i"
                class="flex flex-col items-center cursor-pointer"
                @click="step = validateStep(step) && i + 1 <= step ? i + 1 : step"
              >
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all"
                  :class="
                    step > i + 1
                      ? 'bg-black text-white'
                      : step === i + 1
                        ? 'bg-black text-white'
                        : 'bg-white border-2 border-gray-300'
                  "
                >
                  <span v-if="step > i + 1">✓</span>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span
                  class="mt-2 text-xs font-medium"
                  :class="step >= i + 1 ? 'text-black' : 'text-gray-400'"
                >
                  {{ s }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Steps -->
        <div class="px-8 pb-8">
          <!-- Step 1 -->
          <div v-show="step === 1" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2">Product Name *</label>
              <input
                v-model="form.name"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                :class="{ 'border-red-500': errors.name }"
                placeholder="Enter product name"
                :disabled="loading"
              />
              <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2">Barcode *</label>
                <div class="flex gap-2">
                  <input
                    v-model="form.barcode"
                    class="flex-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                    :class="{ 'border-red-500': errors.barcode }"
                    placeholder="Auto-generated"
                    :disabled="loading"
                  />
                  <button
                    @click="generateBarcode"
                    class="px-4 py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200"
                    :disabled="loading || !form.name"
                  >
                    Generate
                  </button>
                </div>
                <p v-if="errors.barcode" class="text-red-500 text-xs mt-1">{{ errors.barcode }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Category *</label>
                <select
                  v-model="form.category"
                  class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                  :class="{ 'border-red-500': errors.category }"
                  :disabled="loading"
                >
                  <option value="">Select category</option>
                  <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
                <p v-if="errors.category" class="text-red-500 text-xs mt-1">
                  {{ errors.category }}
                </p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Supplier *</label>
              <select
                v-model="form.supplier"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                :class="{ 'border-red-500': errors.supplier }"
                :disabled="loading"
              >
                <option value="">Select supplier</option>
                <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
              <p v-if="errors.supplier" class="text-red-500 text-xs mt-1">{{ errors.supplier }}</p>
            </div>
          </div>

          <!-- Step 2 -->
          <div v-show="step === 2" class="grid grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium mb-2">Cost Price *</label>
              <div class="relative">
                <span class="absolute left-4 top-2.5 text-gray-500">$</span>
                <input
                  v-model.number="form.costPrice"
                  type="number"
                  step="0.01"
                  class="w-full pl-8 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                  :class="{ 'border-red-500': errors.costPrice }"
                  placeholder="0.00"
                  :disabled="loading"
                />
              </div>
              <p v-if="errors.costPrice" class="text-red-500 text-xs mt-1">
                {{ errors.costPrice }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Selling Price *</label>
              <div class="relative">
                <span class="absolute left-4 top-2.5 text-gray-500">$</span>
                <input
                  v-model.number="form.sellingPrice"
                  type="number"
                  step="0.01"
                  class="w-full pl-8 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                  :class="{ 'border-red-500': errors.sellingPrice }"
                  placeholder="0.00"
                  :disabled="loading"
                />
              </div>
              <p v-if="errors.sellingPrice" class="text-red-500 text-xs mt-1">
                {{ errors.sellingPrice }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Initial Quantity</label>
              <input
                v-model.number="form.quantity"
                type="number"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                placeholder="0"
                :disabled="loading"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Min Stock Level</label>
              <input
                v-model.number="form.minStock"
                type="number"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                placeholder="0"
                :disabled="loading"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Max Stock Level</label>
              <input
                v-model.number="form.maxStock"
                type="number"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                placeholder="0"
                :disabled="loading"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Date of Arrival</label>
              <input
                v-model="form.arrivalDate"
                type="date"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                :disabled="loading"
              />
            </div>
          </div>

          <!-- Step 3 -->
          <div v-show="step === 3" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2">Product Image URL</label>
              <input
                v-model="form.imageUrl"
                type="url"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black"
                placeholder="https://example.com/image.jpg"
                :disabled="loading"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Description</label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-black resize-none"
                placeholder="Product description..."
                :disabled="loading"
              ></textarea>
            </div>
          </div>

          <!-- Step 4 -->
          <div v-show="step === 4" class="bg-gray-50 rounded-xl p-6">
            <div class="grid grid-cols-2 gap-8">
              <div>
                <h3 class="font-semibold mb-4">Basic Information</h3>
                <dl class="space-y-3 text-sm">
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Product Name:</dt>
                    <dd class="font-medium">{{ form.name || '-' }}</dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Barcode:</dt>
                    <dd class="font-medium">{{ form.barcode || '-' }}</dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Category:</dt>
                    <dd class="font-medium">
                      {{ categories.find((c) => c.id == form.category)?.name || '-' }}
                    </dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Supplier:</dt>
                    <dd class="font-medium">
                      {{ suppliers.find((s) => s.id == form.supplier)?.name || '-' }}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 class="font-semibold mb-4">Pricing & Stock</h3>
                <dl class="space-y-3 text-sm">
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Cost Price:</dt>
                    <dd class="font-medium">${{ form.costPrice || '0.00' }}</dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Selling Price:</dt>
                    <dd class="font-medium text-green-600">${{ form.sellingPrice || '0.00' }}</dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Quantity:</dt>
                    <dd class="font-medium">{{ form.quantity || 0 }} units</dd>
                  </div>
                  <div class="flex justify-between py-2 border-b">
                    <dt class="text-gray-600">Stock Range:</dt>
                    <dd class="font-medium">{{ form.minStock || 0 }} - {{ form.maxStock || 0 }}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div v-if="form.description" class="mt-6 pt-6 border-t">
              <h3 class="font-semibold mb-2">Description</h3>
              <p class="text-sm text-gray-700">{{ form.description }}</p>
            </div>
          </div>

          <!-- Error Message -->
          <p v-if="submitError" class="text-red-600 mb-4">{{ submitError }}</p>

          <!-- Navigation -->
          <div class="flex justify-between items-center mt-8 pt-8 border-t">
            <button
              @click="step--"
              :disabled="step === 1 || loading"
              class="px-5 py-2.5 text-sm font-medium border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

            <div class="flex items-center gap-3">
              <!-- Loader -->
              <div v-if="loading" class="flex items-center gap-2 text-sm text-gray-500">
                <div class="loader"></div>
                Adding Product...
              </div>
              <span v-else class="text-sm text-gray-500">Step {{ step }} of 4</span>
            </div>

            <button
              @click="step < 4 ? nextStep() : submit()"
              :disabled="loading"
              class="px-5 py-2.5 text-sm font-medium text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              :class="
                step < 4
                  ? 'bg-black hover:bg-gray-800'
                  : 'bg-green-600 hover:bg-green-700'
              "
            >
              <template v-if="step < 4">
                <span v-if="!loading">Next</span>
                <div v-else class="loader-small"></div>
                <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </template>
              <template v-else>
                <div v-if="loading" class="loader-small"></div>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{{ loading ? 'Adding...' : 'Add Product' }}</span>
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useProductStore } from '@/stores/product' // Adjust path to your store

// Initialize store
const productStore = useProductStore()

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

const categories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Computers' },
  { id: '3', name: 'Accessories' },
]

const suppliers = [
  { id: '1', name: 'Gaming Tech Corp' },
  { id: '2', name: 'Tech Solutions Ltd' },
  { id: '3', name: 'Digital Supplies Inc' },
]

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
    submitError.value = error?.response?.data?.message || error.message || 'An error occurred while adding the product.'
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
