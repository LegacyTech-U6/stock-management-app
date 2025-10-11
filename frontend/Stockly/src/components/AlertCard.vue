<!-- components/AlertCard.vue -->
<template>
  <div :class="color" class="rounded-lg p-6 border-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <AlertTriangle v-if="title === 'Low Stock Alerts'" class="w-6 h-6" />
        <Package v-else class="w-6 h-6 text-red-500" />
        <div>
          <p class="text-sm font-medium text-gray-600">{{ title }}</p>
          <p class="text-3xl font-bold text-gray-900">{{ count }}</p>
        </div>
      </div>
      <button v-if="action" :class="action.color" class="px-4 py-2 rounded border">
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle, Package } from 'lucide-vue-next';

defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  action: {
    type: Object,
    default: null
  }
});
</script>

---
