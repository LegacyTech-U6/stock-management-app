<!-- components/StatCard.vue -->
<template>
  <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    <div :class="[stat.color, 'w-12 h-12 rounded-lg flex items-center justify-center mb-4']">
      <component :is="stat.icon" class="w-6 h-6 text-white" />
    </div>
    <p class="text-gray-600 text-sm mb-2">{{ stat.label }}</p>
    <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
  </div>
</template>

<script setup>
defineProps({
  stat: {
    type: Object,
    required: true
  }
})
</script>
