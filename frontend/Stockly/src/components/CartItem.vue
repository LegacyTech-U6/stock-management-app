<template>
  <div class="cart-item bg-gray-50 border border-gray-200 rounded-lg p-3">
    <div class="flex items-center gap-3">
      <div class="flex-1 min-w-0">
        <p class="font-medium text-gray-900 text-sm truncate mb-1">{{ item.Prod_name }}</p>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500">${{ item.selling_price }} × {{ item.quantity }}</span>
          <span class="text-xs text-gray-400">•</span>
          <span class="text-sm font-semibold text-gray-900">${{ (item.selling_price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <input
          type="number"
          v-model.number="localItem.quantity"
          min="1"
          class="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-center text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />

        <button
          class="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          @click="$emit('remove-item', item.id)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ item: Object })
const emit = defineEmits(['update-item', 'remove-item'])
const localItem = reactive({ ...props.item })

watch(localItem, () => emit('update-item', localItem), { deep: true })
</script>
