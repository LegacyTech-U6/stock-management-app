<template>
  <div
    class="bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 flex justify-between items-center"
  >
    <!-- Left section -->
    <div class="w-full">
      <div class="border-b border-gray-200 grid grid-cols-8 pb-3">
        <div class="col-span-7">
          <p class="text-2xl font-semibold text-gray-900">{{ value }}</p>
          <p class="text-gray-500 text-sm">{{ label }}</p>
        </div>

        <!-- Right section (icon) -->
        <div
          class="w-12 h-12 flex items-center justify-center rounded-xl"
          :style="{
            backgroundColor: iconBg || '#E6F4F0',
            color: iconColor || '#16a34a',
          }"
        >
          <component :is="icon" class="w-6 h-6" />
        </div>
      </div>

      <div class="flex items-center gap-2 mt-3">
        <span :class="trend >= 0 ? 'text-green-500' : 'text-red-600'" class="text-sm font-semibold">
          {{ trend >= 0 ? '+' : '' }}{{ formatedValue }}%
        </span>

        <span class="text-gray-400 text-sm">vs Last {{ period }}</span>
        <a
          v-if="viewLink"
          :href="viewLink"
          class="ml-4 text-sm font-medium text-black underline hover:text-green-400"
        >
          View All
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: [Object, Function], // ✅ supports Lucide icons
  value: [String, Number],
  label: String,
  trend: Number,
  viewLink: String,
  iconBg: String,
  iconColor: String,
  period: String,
})
const formatedValue = computed(() => {
  return props.trend ? props.trend.toFixed(2) : '0.00'
})
</script>
