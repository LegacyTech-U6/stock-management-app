<template>
  <div class="pricing-summary bg-white rounded-lg border border-gray-200 p-5">
    <!-- Discount Banner -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <div class="flex items-start gap-2">
        <div class="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span class="text-xs font-bold">%</span>
        </div>
        <div>
          <h4 class="font-semibold text-blue-900 text-sm">Discount 5%</h4>
          <p class="text-blue-700 text-xs mt-1">For $20 Minimum Purchase, all Items</p>
        </div>
      </div>
    </div>

    <!-- Payment Summary Header -->
    <h3 class="font-bold text-lg text-gray-900 mb-4">Payment Summary</h3>

    <!-- Pricing Details -->
    <div class="space-y-3 mb-4">
      <div class="flex justify-between items-center text-gray-700">
        <span class="text-sm">Shipping</span>
        <span class="font-semibold">${{ shipping.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between items-center text-gray-700">
        <span class="text-sm">Tax</span>
        <span class="font-semibold">${{ taxAmount.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between items-center text-gray-700">
        <span class="text-sm">Coupon</span>
        <span class="font-semibold text-green-600">-${{ coupon.toFixed(2) }}</span>
      </div>

      <!-- Dynamic Discount -->
      <div class="flex justify-between items-center text-gray-700">
        <span class="text-sm">Discount</span>
        <div class="flex items-center gap-2">
          <input
            type="number"
            v-model.number="localDiscount"
            min="0"
            max="100"
            class="w-16 border border-gray-300 rounded px-2 py-1 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            @input="updateDiscount"
          />
          <span class="text-sm text-gray-500">%</span>
          <span class="font-semibold text-green-600 ml-2">-${{ discountAmount.toFixed(2) }}</span>
        </div>
      </div>

      <div class="flex justify-between items-center text-gray-700">
        <span class="text-sm">Roundoff</span>
        <span class="font-semibold text-green-600">+${{ roundoff.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between items-center text-gray-700 pt-2 border-t border-gray-200">
        <span class="text-sm">Sub Total</span>
        <span class="font-semibold">${{ subtotal.toFixed(3) }}</span>
      </div>
    </div>

    <!-- Total Payable -->
    <div class="border-t border-gray-200 pt-4">
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-gray-900">Total Payable</span>
        <span class="text-2xl font-bold text-gray-900">${{ totalPayable.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  items: Array,
  discount: Number,
  taxRate: Number,
  shipping: {
    type: Number,
    default: 40.21
  },
  coupon: {
    type: Number,
    default: 25
  },
  roundoff: {
    type: Number,
    default: 0.11
  }
})

const emit = defineEmits(['update-discount', 'update-tax', 'create-invoice'])

const localDiscount = ref(props.discount || 5) // Default to 5% as shown in screenshot

const updateDiscount = () => {
  emit('update-discount', localDiscount.value)
}

const subtotal = computed(() =>
  props.items.reduce((sum, item) => sum + item.selling_price * item.quantity, 0)
)

const taxAmount = computed(() =>
  parseFloat(((subtotal.value * props.taxRate) / 100).toFixed(2))
)

const discountAmount = computed(() =>
  parseFloat(((subtotal.value * localDiscount.value) / 100).toFixed(2))
)

const totalPayable = computed(() => {
  const baseTotal = subtotal.value + props.shipping + taxAmount.value - props.coupon - discountAmount.value + props.roundoff
  return parseFloat(baseTotal.toFixed(2))
})
</script>

<style scoped>
.pricing-summary {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
