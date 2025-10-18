<template>
  <div class="product-card bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
    <div class="mb-3">
      <div class="flex items-start justify-between mb-2">
        <h3 class="font-semibold text-gray-900 text-sm leading-tight flex-1 pr-2">
          {{ product.Prod_name }}
        </h3>
        <span
          :class="[
            'px-2 py-0.5 rounded text-xs font-medium',
            product.quantity > 10 ? 'bg-green-100 text-green-700' :
            product.quantity > 0 ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          ]"
        >
          {{ product.quantity > 0 ? 'In Stock' : 'Out of Stock' }}
        </span>
      </div>
      <p class="text-xs text-gray-500">Stock: {{ product.quantity }} units</p>
    </div>

    <div class="flex justify-between items-center">
      <div class="text-xl font-semibold text-gray-900">${{ product.selling_price }}</div>
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
defineProps({ product: Object })
</script>
