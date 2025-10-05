<template>
  <div class="product-card bg-white border border-gray-200 rounded-lg p-3 lg:p-4 hover:shadow-md transition-shadow">
    <div class="font-semibold text-gray-900 mb-1 truncate">{{ product.Prod_name }}</div>
    <div class="text-gray-500 text-xs lg:text-sm mb-3">Stock: {{ product.quantity }}</div>
    <div class="flex justify-between items-center">
      <div class="text-lg font-bold text-slate-900">${{ product.selling_price }}</div>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
        @click="$emit('add')"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ product: Object })
</script>
