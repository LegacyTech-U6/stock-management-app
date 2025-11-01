<template>
  <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <h3 class="font-bold text-gray-900 mb-2 flex items-center gap-2">
      <div class="w-5 h-5 bg-yellow-400 rounded"></div>
      Top Worker
    </h3>
    <p class="text-sm text-gray-600 mb-4">Best performing team member</p>

    <TopWorkerCard :worker="topWorker" :isTop="true" />

    <p class="text-sm font-medium text-gray-900 mt-6 mb-4">Other Top Performers</p>
    <div class="space-y-3">
      <TopWorkerCard
        v-for="(worker, index) in otherWorkers"
        :key="index"
        :worker="worker"
        :isTop="false"
      />
    </div>
  </div>
</template>

<script setup>
import TopWorkerCard from './TopWorkerCard.vue'

defineProps({
  topWorker: {
    type: Object,
    required: true,
  },
  otherWorkers: {
    type: Array,
    required: true,
  },
})
</script>
