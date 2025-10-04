<template>
  <div class="product-card border rounded p-3 shadow-sm hover:shadow-md">
    <div class="font-bold">{{ product.Prod_name }}</div>
    <div class="text-gray-500 text-sm mb-2">Stock: {{ product.quantity }}</div>
    <div class="text-green-600 font-semibold">${{ product.selling_price }}</div>
    <button class="bg-blue-500 text-white px-3 py-1 mt-2 rounded" @click="$emit('add')">
      Add
    </button>
  </div>
</template>

<script setup>
defineProps({ product: Object })
</script>
