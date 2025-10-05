<template>
  <div class="cart-item flex items-center gap-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
    <div class="flex-1 min-w-0">
      <p class="font-medium text-gray-900 truncate">{{ item.Prod_name }}</p>
      <p class="text-sm font-bold text-slate-900">${{ (item.selling_price * item.quantity).toFixed(2) }}</p>
    </div>

    <input
      type="number"
      v-model.number="localItem.quantity"
      min="1"
      class="w-16 border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-slate-900"
    />

    <button
      class="text-red-500 hover:text-red-700 text-xl font-bold w-8 h-8 flex items-center justify-center"
      @click="$emit('remove-item', item.id)"
    >
      ×
    </button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ item: Object })
const emit = defineEmits(['update-item', 'remove-item'])
const localItem = reactive({ ...props.item })

watch(localItem, () => emit('update-item', localItem), { deep: true })
</script>
