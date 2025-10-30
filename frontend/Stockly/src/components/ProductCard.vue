<template>
  <div
    class="product-card bg-white rounded-2xl p-6 relative transition-all duration-200"
    :class="[
      quantity > 0 ? 'border-2 border-green-500' : 'border border-gray-200',
      'hover:shadow-md',
    ]"
  >
    <!-- Selected Indicator -->
    <div
      v-if="quantity > 0"
      class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10"
    >
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Product Image -->
    <div class="mb-4 flex justify-center bg-gray-50 rounded-2xl">
      <img :src="product.Prod_image" :alt="product.Prod_name" class="w-full h-48 object-contain" />
    </div>

    <!-- Category -->
    <div class="text-sm text-gray-500 mb-1">
      {{ product.category.name || 'Mobiles' }}
    </div>

    <!-- Product name -->
    <h3 class="font-medium text-gray-900 text-base mb-4">
      {{ product.Prod_name }}
    </h3>

    <!-- Price and Quantity Controls -->
    <div class="flex justify-between items-center">
      <div class="text-2xl font-semibold text-gray-900">${{ product.selling_price }}</div>

      <button
        @click="$emit('add')"
        :disabled="product.quantity <= 0"
        class="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const quantity=ref()
</script>
