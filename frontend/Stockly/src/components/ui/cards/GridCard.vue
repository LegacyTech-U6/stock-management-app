<template>
   <div
    class="rounded-xl p-5 text-white shadow-sm transition-transform duration-200 hover:scale-[1.02]"
    :class="isTailwind ? `bg-gradient-to-br from-${gradientFrom} to-${gradientTo}` : ''"
    :style="!isTailwind ? { background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` } : {}"
  >
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-medium opacity-90">{{ title }}</span>
      <component :is="icon" class="w-5 h-5 opacity-80" />
    </div>
    <div class="text-3xl font-bold">{{ value }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: String,
  value: [String, Number],
  icon: [Object, Function],
  gradientFrom: { type: String, default: 'blue-500' },
  gradientTo: { type: String, default: 'blue-600' },
})

const isTailwind = computed(() =>
  props.gradientFrom.includes('-') && props.gradientTo.includes('-')
)

</script>
