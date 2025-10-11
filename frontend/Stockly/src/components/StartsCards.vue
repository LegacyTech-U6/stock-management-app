<!-- components/StatCard.vue -->
<template>
  <div :class="containerClass">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">{{ label }}</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-2">{{ value }}</h3>
        <p v-if="subtext" :class="subtext.includes('+') ? 'text-green-600' : 'text-red-600'" class="text-xs mt-2">
          {{ subtext }}
        </p>
      </div>
      <div :class="color" class="p-3 rounded-lg">
        <component :is="icon" class="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object ,Function],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  subtext: {
    type: String,
    default: null
  },
  containerClass: {
    type: String,
    default: 'bg-white rounded-lg p-6 shadow-sm border border-gray-200'
  },
  color: {
    type: String,
    required: true
  }
});
</script>
