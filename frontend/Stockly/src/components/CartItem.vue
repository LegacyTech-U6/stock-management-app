<template>
  <div class="cart-item bg-white border-b border-gray-200 py-3">
    <div class="flex items-center justify-between">
      <!-- Item name and controls -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <div class="p-1 flex items-center gap-1">
            <button
              @click="$emit('remove-item', item.id)"
              class="text-red-500 hover:text-red-700 w-6 h-6 flex items-center justify-center rounded transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <p class="font-medium text-gray-900 text-sm">{{ item.Prod_name }}</p>
          </div>

          <!-- Quantity controls -->
          <div class="flex">
            <button
              @click="decreaseQuantity"
              class="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
            >
              <span class="text-sm font-bold">-</span>
            </button>

            <span class="text-sm text-gray-700 min-w-6 text-center">{{ item.quantity }}</span>

            <button
              @click="increaseQuantity"
              class="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
            >
              <span class="text-sm font-bold">+</span>
            </button>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold text-gray-900">
              ${{ (item.selling_price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Cost -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update-item', 'remove-item'])

const increaseQuantity = () => {
  const updatedItem = {
    ...props.item,
    quantity: props.item.quantity + 1,
  }
  emit('update-item', updatedItem)
}

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    const updatedItem = {
      ...props.item,
      quantity: props.item.quantity - 1,
    }
    emit('update-item', updatedItem)
  } else {
    emit('remove-item', props.item.id)
  }
}
</script>
