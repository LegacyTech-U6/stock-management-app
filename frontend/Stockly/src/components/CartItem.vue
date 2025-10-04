<template>
  <div class="cart-item flex justify-between items-center border p-2 rounded">
    <span>{{ item.Prod_name }}</span>
    <input type="number" v-model.number="localItem.quantity" min="1" class="w-16 border rounded p-1 text-center" />
    <span>${{ item.selling_price * item.quantity }}</span>
    <button class="text-red-500" @click="$emit('remove-item', item.id)">✕</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
const props = defineProps({ item: Object })
const emit = defineEmits(['update-item', 'remove-item'])
const localItem = reactive({ ...props.item })
watch(localItem, () => emit('update-item', localItem), { deep: true })
</script>
