<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
    <div class="flex items-start gap-4">
      <!-- Product Image -->
      <div class="flex-shrink-0">
        <div v-if="product.image" class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          <img
            :src="product.image"
            :alt="product.Prod_name"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-else class="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-semibold text-gray-900 mb-1">
              {{ product.Prod_name }}
            </h3>
            <div class="flex items-center gap-2 mb-3">
              <span :class="stockBadgeClass" class="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full">
                {{ stockStatus }}
              </span>
            </div>

            <!-- Product Details -->
            <div class="space-y-1.5 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span>{{ product.code_bar }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>{{ product.category_id }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>{{ product.quantity }} units</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <button
              @click="handleView"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="View details"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Pricing Section -->
        <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div class="text-xs text-gray-500 mb-0.5">Selling Price</div>
            <div class="text-lg font-semibold text-gray-900">
              ${{ parseFloat(product.selling_price).toFixed(2) }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-500 mb-0.5">Cost Price</div>
            <div class="text-sm text-gray-600">
              ${{ parseFloat(product.cost_price).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  view: [product: Product]
}>()

const quantityNum = computed(() => {
  return typeof props.product.quantity === 'string'
    ? parseInt(props.product.quantity)
    : props.product.quantity
})

const stockStatus = computed(() => {
  const qty = quantityNum.value
  if (qty === 0) return 'Out of Stock'
  if (qty <= 10) return 'Low Stock'
  return 'In Stock'
})

const stockBadgeClass = computed(() => {
  const qty = quantityNum.value

  if (qty === 0) {
    return 'bg-red-50 text-red-600 border border-red-200'
  }
  if (qty <= 10) {
    return 'bg-orange-50 text-orange-600 border border-orange-200'
  }
  return 'bg-green-50 text-green-600 border border-green-200'
})

const handleView = () => {
  emit('view', props.product)
}
</script>
