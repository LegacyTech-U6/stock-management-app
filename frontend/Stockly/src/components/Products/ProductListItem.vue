<template>
  <div class="flex items-center bg-white border border-gray-200 rounded-xl p-4 gap-4 shadow-sm hover:shadow-md transition-all min-w-0">
    <!-- Product Image -->
    <img
      :src="product.image || 'https://via.placeholder.com/64'"
      :alt="product.Prod_name"
      class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
    />

    <!-- Product Info -->
    <div class="flex-1 min-w-0">
      <div class="font-semibold text-base text-gray-900 truncate">
        {{ product.Prod_name }}
      </div>
      <div class="text-xs text-gray-500 truncate mt-0.5">
        SKU: {{ product.code_bar }}
      </div>
      <div class="text-xs text-gray-500 truncate">
        {{ product.category_id }}
      </div>
    </div>

    <!-- Price & Stock -->
    <div class="flex flex-col items-end gap-2 min-w-[140px]">
      <div class="flex items-center gap-2">
        <span class="font-bold text-gray-900 text-lg">
          ${{ parseFloat(product.selling_price).toFixed(2) }}
        </span>
        <span :class="stockBadgeClass">
          {{ stockStatus }}
        </span>
      </div>
      <span class="text-xs text-gray-500">
        {{ product.quantity }} units
      </span>
      <button
        class="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        @click="handleView"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View
      </button>
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
  const baseClasses = 'text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap'

  if (qty === 0) {
    return `${baseClasses} bg-red-100 text-red-700`
  }
  if (qty <= 10) {
    return `${baseClasses} bg-yellow-100 text-yellow-700`
  }
  return `${baseClasses} bg-gray-900 text-white`
})

const handleView = () => {
  emit('view', props.product)
}
</script>
