<!-- filepath: /home/fillin/stock-management-app/frontend/Stockly/src/components/BaseButton.vue -->
<!-- 
  BaseButton.vue
  ===============
  Composant bouton réutilisable
  - Couleur et texte personnalisables
  - Support des icônes (avant et après le texte)
  - Option texte noir ou blanc
  - Transition fluide
-->
<template>
  <!-- Bouton avec classes dynamiques -->
  <button
    :class="[
      'flex items-center gap-2 px-6 py-2 rounded font-semibold transition',
      color,
      { 'text-white': darkText === false, 'text-black': darkText === true },
    ]"
  >
    <!-- Slot pour icône gauche -->
    <slot name="svg" />
    <!-- Texte du bouton -->
    <span>{{ text }}</span>
    <!-- Slot pour icône droite -->
    <slot name="svg-right" />
  </button>
</template>

<script setup lang="ts">
// Props du bouton
defineProps<{
  color?: string             // Classe de couleur Tailwind (ex: 'bg-blue-500')
  text: string               // Texte affiché dans le bouton
  darkText?: boolean         // true: texte noir, false: texte blanc (défaut: blanc)
}>()
</script>
