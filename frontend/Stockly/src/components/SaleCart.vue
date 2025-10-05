<template>
  <div class="sale-cart bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-5">
    <h2 class="font-bold text-lg text-gray-900 mb-4">Cart Items ({{ items.length }})</h2>

    <div v-if="items.length <= 0" class="flex flex-col justify-center items-center py-12 text-gray-400">
      <svg class="w-16 h-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <p class="text-sm">No items added yet</p>
    </div>

    <div v-else class="space-y-3">
      <CartItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @update-item="updateItem"
        @remove-item="removeItem"
      />
    </div>
  </div>
</template>

<script setup>
import CartItem from './CartItem.vue'

const props = defineProps({ items: Array })
const emit = defineEmits(['update-cart'])

function updateItem(updatedItem) {
  const updated = props.items.map(i => i.id === updatedItem.id ? updatedItem : i)
  emit('update-cart', updated)
}

function removeItem(id) {
  const updated = props.items.filter(i => i.id !== id)
  emit('update-cart', updated)
}
</script>
