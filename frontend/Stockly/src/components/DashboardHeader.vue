<!-- 
  DashboardHeader.vue
  ====================
  En-tête du dashboard principal
  - Affiche le titre et la description
  - Boutons de navigation rapide (Vue Inventory, Analytics, Export, Sales)
  - Responsive et accessible
-->
<template>
  <!-- Wrapper flex pour l'en-tête -->
  <div class="flex justify-between items-center mb-8">
    <div>
      <!-- Titre principal -->
      <h1 class="text-3xl font-bold text-gray-900">Stock Management Dashboard</h1>
      <!-- Sous-titre descriptif -->
      <p class="text-gray-600 text-sm">Monitor your inventory and business performance</p>
    </div>
    <!-- Boutons d'action -->
    <div class="flex gap-3">
      <!-- Bouton Vue d'ensemble -->
      <button
        class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium"
      >
        Overview
      </button>
      <!-- Bouton Analytics enterprise -->
      <button
        class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium"
      >
        Enterprise Analytics
      </button>
      <!-- Bouton Exporter -->
      <button
        class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium flex items-center gap-2"
      >
        <Download class="w-4 h-4" /> Export
      </button>
      <!-- Bouton Ventes -->
      <button
        class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium flex items-center gap-2"
      >
        <ShoppingCart class="w-4 h-4" /> Sales
      </button>
      <!-- Bouton Vue Inventory (principal) -->
      <button
        class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm font-medium flex items-center gap-2"
      >
        <Eye class="w-4 h-4" /> View Inventory
      </button>
    </div>
  </div>
</template>

<script setup>
// Imports des icônes
import { Download, ShoppingCart, Eye } from 'lucide-vue-next'
</script>

---
