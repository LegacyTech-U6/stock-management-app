<!-- 
  ProductCard.vue
  ================
  Carte de produit réutilisable
  - Affiche l'image, le nom, la catégorie et le prix
  - Indicateur visuel si le produit est sélectionné
  - Bouton ajouter au panier
  - Désactivé si stock = 0
-->
<template>
  <!-- Carte du produit -->
  <div
    class="product-card bg-white rounded-2xl p-6 relative transition-all duration-200"
    :class="[
      quantity > 0 ? 'border-2 border-green-500' : 'border border-gray-200',
      'hover:shadow-md',
    ]"
  >
    <!-- Indicateur de sélection (checkmark vert) -->
    <div
      v-if="quantity > 0"
      class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10"
    >
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Image du produit -->
    <div class="mb-4 flex justify-center bg-gray-50 rounded-2xl">
      <img :src="product.Prod_image" :alt="product.Prod_name" class="w-full h-48 object-contain" />
    </div>

    <!-- Catégorie du produit -->
    <div class="text-sm text-gray-500 mb-1">
      {{ product.category.name || 'Mobiles' }}
    </div>

    <!-- Nom du produit -->
    <h3 class="font-medium text-gray-900 text-base mb-4">
      {{ product.Prod_name }}
    </h3>

    <!-- Section: Prix et bouton ajouter -->
    <div class="flex justify-between items-center">
      <!-- Prix de vente -->
      <div class="text-2xl font-semibold text-gray-900">${{ product.selling_price }}</div>

      <!-- Bouton ajouter (désactivé si stock = 0) -->
      <button
        @click="$emit('add')"
        :disabled="product.quantity <= 0"
        class="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props: le produit à afficher
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// État: quantité sélectionnée
const quantity = ref()
</script>
