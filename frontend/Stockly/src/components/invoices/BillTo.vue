<template>
  <div class="bill-to bg-gray-50 p-4 rounded-lg mb-6">
    <h3 class="font-semibold mb-2">Bill To:</h3>
    <p class="font-bold">{{ client.name }}</p>
    <p>{{ client.company }}</p>
    <p>{{ client.address }}</p>
    <p>{{ client.email }}</p>
    <p>{{ client.phone }}</p>
  </div>
</template>

<script setup>
defineProps({
  client: {
    type: Object,
    default: () => ({})
  }
})
</script>
