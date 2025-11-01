<template>
  <div
    class="bg-white rounded-xl p-6 flex flex-col w-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <!-- Card Header with Title and SVG Icon -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-gray-600 text-sm font-medium">{{ title }}</h3>
      <div
        class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-gray-600"
      >
        <slot name="icon">
          <svg
            v-if="!$slots.icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            ></path>
          </svg>
        </slot>
      </div>
    </div>

    <!-- Main Content Row -->
    <div class="flex items-end justify-between">
      <!-- Card Value -->
      <div>
        <p class="text-3xl font-bold mb-1" :class="valueColor">
          {{ formattedValue }}
        </p>
        <!-- Description under value -->
        <p v-if="description" class="text-gray-500 text-xs">
          {{ description }}
        </p>
      </div>

      <!-- Percentage with colored indicator -->
      <div
        v-if="subtitle"
        class="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
        :class="percentageBgColor"
      >
        <span :class="percentageIconClass">
          <svg
            v-if="subtitle.includes('+')"
            class="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M12 7a1 1 0 110-2h.01a1 1 0 110 2H12zm-4.08 5a1 1 0 10-1.42-1.41l-2.83 2.83-2.83-2.83a1 1 0 00-1.41 1.41l2.82 2.83-2.82 2.83a1 1 0 101.41 1.41l2.83-2.83 2.83 2.83a1 1 0 001.42-1.41L6.59 12z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M12 7a1 1 0 110-2h.01a1 1 0 110 2H12zm-4.08 5a1 1 0 10-1.42-1.41l-2.83 2.83-2.83-2.83a1 1 0 00-1.41 1.41l2.82 2.83-2.82 2.83a1 1 0 101.41 1.41l2.83-2.83 2.83 2.83a1 1 0 001.42-1.41L6.59 12z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span :class="percentageTextColor">
          {{ subtitle }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  valueColor: { type: String, default: 'text-gray-900' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
})

const formattedValue = computed(() =>
  props.value.toLocaleString(undefined, { maximumFractionDigits: 2 }),
)

const percentageBgColor = computed(() => {
  if (!props.subtitle) return 'bg-gray-100'
  return props.subtitle.includes('+') ? 'bg-emerald-50' : 'bg-rose-50'
})

const percentageTextColor = computed(() => {
  if (!props.subtitle) return 'text-gray-600'
  return props.subtitle.includes('+') ? 'text-emerald-600' : 'text-rose-600'
})

const percentageIconClass = computed(() => {
  if (!props.subtitle) return 'text-gray-400'
  return props.subtitle.includes('+') ? 'text-emerald-500' : 'text-rose-500'
})
</script>

<style scoped>
div {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

div:hover {
  border-color: #e5e7eb;
  transform: translateY(-2px);
}
</style>
