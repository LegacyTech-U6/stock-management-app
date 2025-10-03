<template>
  <div class="stepper-container">
    <!-- Header -->
    <div class="stepper-header">
      <div>
        <h1 class="stepper-title">Add New Product</h1>
        <p class="stepper-subtitle">Create a new product in your inventory</p>
      </div>
      <button class="btn-cancel">
        <span class="icon-back">←</span>
        Cancel
      </button>
    </div>

    <!-- Stepper -->
    <div class="stepper-wrapper">
      <div class="stepper">
        <!-- Progress Bar -->
        <div class="stepper-progress">
          <div class="stepper-progress-bar" :style="{ width: stepperProgress }"></div>
        </div>

        <!-- Steps -->
        <div
          class="stepper-item"
          v-for="(stepItem, index) in stepItems"
          :key="index"
          :class="{
            current: step === stepItem.id,
            success: step > stepItem.id,
          }"
        >
          <div class="stepper-item-counter">
            <span v-if="step > stepItem.id" class="icon-check">✓</span>
            <span v-else class="number">{{ stepItem.id }}</span>
          </div>
          <span class="stepper-item-title">{{ stepItem.title }}</span>
        </div>
      </div>

      <!-- Content -->

      <div class="stepper-content">
        <section class="step-1">
          <div v-if="step === 1" class="stepper-pane">
            <div class="form-group">
              <label>Product Name *</label>
              <input type="text" placeholder="fgty" v-model="formData.name" class="form-input" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>SKU *</label>
                <div class="input-with-button">
                  <input
                    type="text"
                    placeholder="F-2025-633"
                    v-model="formData.sku"
                    class="form-input"
                  />
                  <button class="btn-generate" @click="handleAutoGenerateSKU">🔄 Generate</button>
                </div>
              </div>

              <div class="form-group">
                <label>Category *</label>
                <select class="form-input" v-model="formData.category">
                  <option>Computers</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Supplier *</label>
              <select class="form-input" v-model="formData.supplier">
                <option>Gaming Tech Corp</option>
              </select>
            </div>
          </div>
        </section>
        <!-- Step 2: Pricing & Stock -->
        <section class="step-2">
          <div v-if="step === 2" class="stepper-pane">
            <h3 class="step-content-title">Pricing & Stock</h3>
            <p class="step-content-description">
              Configure pricing and inventory information for this product.
            </p>
            <div class="bg-white border border-gray-200 rounded-xl p-6 mt-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Price -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-400 text-lg">$</span>
                    <input
                      type="number"
                      class="form-input"
                      placeholder="30"
                      v-model="formData.price"
                      min="0"
                    />
                  </div>
                </div>
                <!-- Currency -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select class="form-input" v-model="formData.currency">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="XOF">XOF (CFA)</option>
                  </select>
                </div>
                <!-- Current Stock -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                  <input
                    type="number"
                    class="form-input"
                    placeholder="30"
                    v-model="formData.stockLevel"
                    min="0"
                  />
                </div>
                <!-- Min Stock -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                  <input
                    type="number"
                    class="form-input"
                    placeholder="10"
                    v-model="formData.minStockLevel"
                    min="0"
                  />
                </div>
                <!-- Max Stock -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                  <input
                    type="number"
                    class="form-input"
                    placeholder="100"
                    v-model="formData.maxStockLevel"
                    min="0"
                  />
                </div>
                <!-- Last Restocked -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Restocked</label>
                  <input type="date" class="form-input" v-model="formData.lastRestocked" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="step-3">
          <div v-if="step === 3" class="stepper-pane">
            <h3 class="step-content-title">Image & Description</h3>
            <p class="step-content-description">Add product images and detailed description.</p>
            <div class="bg-white border border-gray-200 rounded-xl p-6 mt-6">
              <!-- Product Image URL -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Product Image URL</label
                >
                <input
                  type="text"
                  class="form-input"
                  placeholder="https://example.com/product-image.jpg"
                  v-model="formData.imageUrl"
                />
                <div class="text-xs text-gray-500 mt-1 mb-2">
                  Paste a URL to an image or select from quick options below
                </div>
                <div class="flex gap-2 mb-2">
                  <img
                    v-for="img in quickImages"
                    :key="img"
                    :src="img"
                    @click="form.imageUrl = img"
                    class="w-20 h-20 object-cover rounded cursor-pointer border border-gray-200 hover:border-black transition"
                    :alt="img"
                  />
                </div>
              </div>
              <!-- Description -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  class="form-input"
                  rows="3"
                  placeholder="Describe the product features, benefits, and specifications..."
                  v-model="formData.description"
                ></textarea>
              </div>
            </div>
          </div>
        </section>
        <section class="step-4">
          <div v-if="step === 4" class="stepper-pane">
            <div
              class="bg-white border border-gray-200 rounded-xl p-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <!-- Add Specifications -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="font-semibold text-lg mb-4">Add Specifications</h4>
                <div class="flex gap-2 mb-3">
                  <input
                    type="text"
                    class="form-input"
                    placeholder="e.g., Battery Life"
                    v-model="specKey"
                  />
                  <input
                    type="text"
                    class="form-input"
                    placeholder="e.g., 30 hours"
                    v-model="specValue"
                  />
                </div>
                <button
                  class="btn btn-primary w-full"
                  @click="addSpecification"
                  :disabled="!specKey || !specValue"
                >
                  + Add Specification
                </button>
                <ul class="mt-4 space-y-1">
                  <li
                    v-for="(spec, i) in specifications"
                    :key="i"
                    class="text-sm text-gray-700 flex justify-between"
                  >
                    <span>{{ spec.key }}:</span>
                    <span class="font-medium">{{ spec.value }}</span>
                  </li>
                </ul>
              </div>
              <!-- Product Summary -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="font-semibold text-lg mb-4">Product Summary</h4>
                <div class="space-y-2 text-sm">
                  <div>
                    <span class="text-gray-500">Name:</span>
                    <span class="font-semibold">{{ formData.name }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">SKU:</span>
                    <span class="font-semibold">{{ formData.sku }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Category:</span>
                    <span class="font-semibold">{{ formData.category }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Price:</span>
                    <span class="font-semibold">{{ formData.currency }} {{ form.price }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Stock:</span>
                    <span class="font-semibold">{{ formData.stockLevel }} units</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Supplier:</span>
                    <span class="font-semibold">{{ formData.supplier }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Controls -->
          </div>
        </section>
      </div>

      <!-- Controls -->
      <div class="controls">
        <button class="btn btn-secondary" @click="prevStep" :disabled="step === 1">
          <span class="icon-arrow">←</span>
          Previous
        </button>
        <div class="step-indicator">Step {{ step }} of 4</div>
        <button class="btn btn-primary" @click="nextStep" :disabled="step === 4">
          Next
          <span class="icon-arrow">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const step = ref(1)

const stepItems = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Pricing & Stock' },
  { id: 3, title: 'Image & Description' },
  { id: 4, title: 'Specifications' },
]
const form = ref({
  price: '',
  currency: 'USD',
  currentStock: '',
  minStock: '',
  maxStock: '',
  lastRestocked: '',
})
const stepperProgress = computed(() => {
  return (100 / (stepItems.length - 1)) * (step.value - 1) + '%'
})

const nextStep = () => {
  if (step.value < stepItems.length) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}
const formData = {
  name: '',
  sku: '',
  category: '',
  price: 0,
  currency: 'USD',
  stockLevel: 0,
  minStockLevel: 10,
  maxStockLevel: 100,
  supplier: '',
  lastRestocked: new Date().toISOString().split('T')[0],
  description: '',
  specifications: {},
  imageUrl: '',
}
  const generateSKU = () => {
    const prefix = formData.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}-${year}-${random}`
  }

  const handleAutoGenerateSKU = () => {
    if (formData.name) {
      const sku = generateSKU()
      handleInputChange('sku', sku)
    }
  }

    const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }
    const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Product name is required'
      if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
      if (!formData.category.trim()) newErrors.category = 'Category is required'
      if (!formData.supplier.trim()) newErrors.supplier = 'Supplier is required'
    }

    if (step === 2) {
      if (formData.price <= 0) newErrors.price = 'Price must be greater than 0'
      if (formData.stockLevel < 0) newErrors.stockLevel = 'Stock level cannot be negative'
      if (formData.minStockLevel >= formData.maxStockLevel) {
        newErrors.minStockLevel = 'Minimum stock must be less than maximum stock'
      }
    }

    if (step === 3) {
      if (!formData.description.trim()) newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateStep(4)) return

    const newProduct: Product = {
      ...formData,
      id: `PRD-${Date.now()}`,
      specifications: specifications
    }

    onAddProduct(newProduct)
    toast.success('Product added successfully!')
  }

</script>

<style lang="scss" scoped>
$primary: #000000;
$success: #10b981;
$gray-50: #f9fafb;
$gray-100: #f3f4f6;
$gray-200: #e5e7eb;
$gray-300: #d1d5db;
$gray-400: #9ca3af;
$gray-600: #4b5563;
$gray-700: #374151;
$transition: all 300ms ease;

.stepper-container {
  min-height: 100vh;
  background: linear-gradient(135deg, $gray-50 0%, $gray-100 100%);
  padding: 2rem;
}

.stepper-header {
  max-width: 56rem;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stepper-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: $gray-700;
  margin: 0 0 0.25rem;
}

.stepper-subtitle {
  font-size: 0.875rem;
  color: $gray-600;
  margin: 0;
}

.btn-cancel {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid $gray-200;
  border-radius: 0.5rem;
  color: $gray-700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: $gray-50;
  }

  .icon-back {
    font-size: 1rem;
  }
}

.stepper-wrapper {
  max-width: 56rem;
  margin: 0 auto;
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stepper {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 3rem;
}

.stepper-progress {
  position: absolute;
  top: 2rem;
  left: 4rem;
  right: 4rem;
  height: 2px;
  background: $gray-200;
  z-index: 0;
}

.stepper-progress-bar {
  height: 100%;
  background: $success;
  transition: $transition;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  flex: 1;
}

.stepper-item-counter {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: $gray-200;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: $transition;

  .step-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: $gray-400;
    transition: $transition;
  }

  .icon-check {
    position: absolute;
    font-size: 1.5rem;
    color: white;
    opacity: 0;
    transform: scale(0);
    transition: $transition;
  }
}

.stepper-item-title {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: $gray-400;
  text-align: center;
  transition: $transition;
}

.stepper-item.current {
  .stepper-item-counter {
    background: rgb(159, 159, 192);

    .step-icon {
      color: white;
    }
  }

  .stepper-item-title {
    color: $primary;
  }
}

.stepper-item.success {
  .stepper-item-counter {
    background: $success;

    .step-icon {
      opacity: 0;
      transform: scale(0);
    }

    .icon-check {
      opacity: 1;
      transform: scale(1);
    }
  }

  .stepper-item-title {
    color: $success;
  }
}

.stepper-content {
  margin-bottom: 2rem;
}

.stepper-pane {
  min-height: 20rem;
}

.step-content-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: $gray-700;
  margin: 0 0 0.5rem;
}

.step-content-description {
  color: $gray-600;
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: $gray-700;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid $gray-300;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: $gray-700;
  background: white;
  transition: $transition;

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  }

  &::placeholder {
    color: $gray-400;
  }
}

.input-with-button {
  display: flex;
  gap: 0.5rem;
}

.btn-generate {
  padding: 0.625rem 1rem;
  background: $gray-100;
  border: 1px solid $gray-300;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: $gray-700;
  cursor: pointer;
  white-space: nowrap;
  transition: $transition;

  &:hover {
    background: $gray-200;
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid $gray-200;
}

.step-indicator {
  font-size: 0.875rem;
  color: $gray-600;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: $transition;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-arrow {
    font-size: 1rem;
  }
}

.btn-secondary {
  background: white;
  color: $gray-700;
  border: 1px solid $gray-300;

  &:hover:not(:disabled) {
    background: $gray-50;
  }
}

.btn-primary {
  background: $primary;
  color: white;

  &:hover:not(:disabled) {
    background: lighten($primary, 10%);
  }
}
</style>
