<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer group"
    :class="{ 'bg-blue-50 text-blue-600': isActive }"
    @click="$emit('click')"
  >
    <component
      :is="icon"
      class="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform"
    />
    <span class="font-medium text-sm truncate">{{ label }}</span>
    <span
      v-if="badge"
      class="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
    >
      {{ badge }}
    </span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: [Object, Function],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  badge: {
    type: [String, Number],
    default: null,
  },
})

defineEmits(['click'])

const route = useRoute()

const isActive = computed(() => {
  return route.path.startsWith(props.to)
})
</script>
