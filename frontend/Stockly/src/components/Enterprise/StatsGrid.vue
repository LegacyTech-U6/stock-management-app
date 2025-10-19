<!-- components/StatsGrid.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div
      v-for="(stat, idx) in stats"
      :key="idx"
      class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all"
    >
      <div class="flex items-start justify-between mb-4">
        <div :class="['w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm', stat.color]">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <!-- Mini Chart -->
        <svg class="w-20 h-10 opacity-70" viewBox="0 0 80 40">
          <defs>
            <linearGradient :id="`gradient-${idx}`" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:rgb(255,107,107);stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:rgb(255,107,107);stop-opacity:0" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="#ff6b6b"
            stroke-width="2.5"
            points="0,25 15,20 30,23 45,15 60,17 75,12"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <polyline
            :fill="`url(#gradient-${idx})`"
            points="0,25 15,20 30,23 45,15 60,17 75,12 75,40 0,40"
          />
        </svg>
      </div>
      <p class="text-gray-600 text-sm font-medium mb-1">{{ stat.label }}</p>
      <p class="text-3xl font-bold text-gray-900">{{ stat.value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>
