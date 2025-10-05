<template>
  <div class="invoice-summary text-sm border-t pt-4">
    <div class="flex justify-between mb-2">
      <span>Subtotal:</span>
      <span>${{ subtotal }}</span>
    </div>
    <div class="flex justify-between mb-2">
      <span>Tax ({{ taxRate }}%):</span>
      <span>${{ taxAmount }}</span>
    </div>
    <div class="flex justify-between font-bold text-lg">
      <span>Total:</span>
      <span>${{ total }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({ items: Array, discount: Number, taxRate: Number })


const localDiscount = ref(props.discount)
const subtotal = computed(() =>
  props.items.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
)
const taxAmount = computed(() => parseFloat(((subtotal.value * props.taxRate) / 100).toFixed(2)))
const total = computed(() =>
  parseFloat((subtotal.value - (subtotal.value * localDiscount.value / 100) + taxAmount.value).toFixed(2))
)
</script>
