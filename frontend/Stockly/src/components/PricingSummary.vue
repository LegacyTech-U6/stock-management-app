<template>
  <div class="pricing-summary bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-5">
    <h3 class="font-bold text-lg text-gray-900 mb-4">Summary</h3>

    <div class="space-y-3">
      <div class="flex justify-between items-center text-gray-700">
        <span>Subtotal</span>
        <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between items-center text-gray-700">
        <span>Discount</span>
        <div class="flex items-center gap-2">
          <input
            type="number"
            v-model.number="localDiscount"
            min="0"
            max="100"
            class="w-16 border border-gray-300 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <span class="text-sm">%</span>
        </div>
      </div>

      <div class="flex justify-between items-center text-gray-700">
        <span>Tax ({{ taxRate }}%)</span>
        <span class="font-semibold">${{ taxAmount.toFixed(2) }}</span>
      </div>

      <div class="border-t border-gray-200 pt-3 mt-3">
        <div class="flex justify-between items-center text-gray-900">
          <span class="text-lg font-bold">Total</span>
          <span class="text-2xl font-bold text-slate-900">${{ total.toFixed(2) }}</span>
        </div>
      </div>

      <button
        @click="emit('create-invoice')"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-4 transition-colors"
      >
        Create Invoice
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ items: Array, discount: Number, taxRate: Number })
const emit = defineEmits(['update-discount', 'update-tax', 'create-invoice'])

const localDiscount = ref(props.discount)
watch(localDiscount, (val) => emit('update-discount', val))

const subtotal = computed(() =>
  props.items.reduce((sum, item) => sum + item.selling_price * item.quantity, 0),
)

const taxAmount = computed(() =>
  parseFloat(((subtotal.value * props.taxRate) / 100).toFixed(2))
)

const total = computed(() =>
  parseFloat(
    (subtotal.value - (subtotal.value * localDiscount.value) / 100 + taxAmount.value).toFixed(2),
  ),
)
</script>
