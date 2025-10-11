<template>
  <div :class="isTop ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-white border border-gray-200'" class="rounded-lg p-6">
    <div class="flex items-start gap-4">
      <div :class="isTop ? 'bg-yellow-600' : 'bg-gray-400'" class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
        {{ worker.initials }}
      </div>
      <div class="flex-1">
        <h4 class="font-bold text-gray-900">{{ worker.name }}</h4>
        <p class="text-xs text-gray-600">{{ worker.role }}</p>
        <div class="mt-3 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Sales</span>
            <span class="font-semibold text-green-600">{{ worker.totalSales }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Invoices</span>
            <span class="font-semibold">{{ worker.invoices }}</span>
          </div>
          <div v-if="worker.efficiency" class="flex justify-between text-sm">
            <span class="text-gray-600">Efficiency</span>
            <div class="w-20 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div class="h-full bg-black" :style="{ width: worker.efficiency }"></div>
            </div>
          </div>
          <div v-if="isTop && worker.rating" class="flex justify-between text-sm">
            <span class="text-gray-600">Rating</span>
            <span class="text-yellow-500">★★★★ {{ worker.rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  worker: {
    type: Object,
    required: true
  },
  isTop: {
    type: Boolean,
    default: false
  }
});
</script>
