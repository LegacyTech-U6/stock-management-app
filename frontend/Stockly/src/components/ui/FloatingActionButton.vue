<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Floating Action Button -->
    <button
      @click="toggleMenu"
      class="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all"
    >
      <span
        class="text-3xl transform transition-transform duration-300"
        :class="{ 'rotate-45': isOpen }"
      >
        +
      </span>
    </button>

    <!-- Quick Action Menu -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute bottom-16 right-0 mb-2 bg-white shadow-xl rounded-xl p-2 w-48"
      >
        <ul class="flex flex-col space-y-2">
          <li
            v-for="(item, index) in actions"
            :key="index"
            @click="handleAction(item)"
            class="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          >
            <component :is="item.icon" class="w-4 h-4 text-gray-600" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select'])
const isOpen = ref(false)

const toggleMenu = () => (isOpen.value = !isOpen.value)
const handleAction = (item) => {
  emit('select', item)
  isOpen.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
