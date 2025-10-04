<template>
  <div class="pricing-summary border-t pt-4 space-y-2">
    <div class="flex justify-between"><span>Subtotal:</span><span>${{ subtotal }}</span></div>
    <div class="flex justify-between"><span>Discount (%):</span>
      <input type="number" v-model.number="localDiscount" min="0" max="100" class="border w-20 text-center rounded" />
    </div>
    <div class="flex justify-between"><span>Tax ({{ taxRate }}%):</span><span>${{ taxAmount }}</span></div>
    <div class="flex justify-between font-bold text-lg"><span>Total:</span><span>${{ total }}</span></div>
    <button @click="emit('create-invoice')" class="bg-green-600 text-white w-full py-2 rounded mt-3">
      Create Invoice
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
const props = defineProps({ items: Array, discount: Number, taxRate: Number })
const emit = defineEmits(['update-discount', 'update-tax', 'create-invoice'])

const localDiscount = ref(props.discount)
watch(localDiscount, val => emit('update-discount', val))

const subtotal = computed(() =>
  props.items.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
)
const taxAmount = computed(() => ((subtotal.value * props.taxRate) / 100).toFixed(2))
const total = computed(() =>
  (subtotal.value - (subtotal.value * localDiscount.value / 100) + parseFloat(taxAmount.value)).toFixed(2)
)
</script>
