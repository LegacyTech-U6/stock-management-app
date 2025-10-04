<template>
  <div class="sale-cart space-y-3">
    <h2 class="font-semibold text-lg">Cart</h2>
    <CartItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @update-item="updateItem"
      @remove-item="removeItem"
    />
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
