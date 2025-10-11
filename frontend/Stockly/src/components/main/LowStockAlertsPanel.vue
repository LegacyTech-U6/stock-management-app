<template>
  <div class="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7m0 6h2m-2 0h-2"></path>
          </svg>
        </div>
        <h2 class="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
      </div>
      <span class="bg-orange-100 text-orange-700 rounded-lg px-2.5 py-1 text-xs font-semibold">
        {{ lowStockItems.length }}
      </span>
    </div>

    <!-- Items List -->
    <div class="space-y-3">
      <div
        v-for="item in lowStockItems"
        :key="item.id"
        class="p-4 border rounded-lg hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200"
        :class="item.critical ? 'border-red-200 bg-red-50/40' : 'border-yellow-200 bg-yellow-50/30'"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="font-medium text-gray-900 text-sm">{{ item.name }}</p>
            <p class="text-xs text-gray-600 mt-1.5">
              <span class="font-semibold">{{ item.stock }}</span> left
              <span class="text-gray-400 mx-1">•</span>
              <span class="text-gray-500">min: {{ item.minStock }}</span>
            </p>
          </div>
          <div class="text-right">
            <span
              class="inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm"
              :class="[
                item.critical
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              ]"
            >
              {{ item.stock }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- View All Button -->
    <button
      class="w-full mt-6 py-3 text-center text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg transition-all duration-200 text-sm"
    >
      View All Products
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  lowStockItems: {
    type: Array,
    default: () => []
  }
})
</script>
