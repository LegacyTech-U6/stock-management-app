<!-- filepath: /home/fillin/stock-management-app/frontend/Stockly/src/components/BaseButton.vue -->
<template>
  <button
    :class="[
      'flex items-center gap-2 px-6 py-2 rounded font-semibold transition',
      color,
      { 'text-white': darkText === false, 'text-black': darkText === true },
    ]"
  >
    <slot name="svg" />
    <span>{{ text }}</span>
    <slot name="svg-right" />
  </button>
</template>

<script setup lang="ts">


defineProps<{
  color?: string
  text: string
  darkText?: boolean // true: texte noir, false: texte blanc (défaut: blanc)
}>()
</script>
