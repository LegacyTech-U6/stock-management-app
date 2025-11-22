<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Out of Stock</h1>
          <p class="text-sm text-gray-500 mt-1">Manage inventory shortages</p>
        </div>
        <button
          class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Restock Selected
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Out of Stock</p>
              <p class="text-2xl font-semibold text-gray-900">{{ outOfStockProducts?.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Lost Revenue</p>
              <p class="text-2xl font-semibold text-gray-900">
                ${{ formatNumber(totalLostRevenue) }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">Avg Days Empty</p>
              <p class="text-2xl font-semibold text-gray-900">{{ Math.round(averageDaysEmpty) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500">High Value</p>
              <p class="text-2xl font-semibold text-gray-900">{{ highValueCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products by name or SKU..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <select
            v-model="selectedCategory"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="all">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <select
            v-model="sortBy"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="daysEmpty">Days Empty</option>
            <option value="lostRevenue">Lost Revenue</option>
            <option value="unitPrice">Unit Price</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-1">{{ product.Prod_name }}</h3>
              <span
                class="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded"
                >{{ product.sku }}</span
              >
            </div>
            <span
              v-if="product.isHighValue"
              class="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded border border-amber-200"
            >
              HIGH VALUE
            </span>
          </div>

          <div class="space-y-2 mb-4 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Category</span>
              <span class="text-gray-900 font-medium">{{ product.category_name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Selling price</span>
              <span class="text-gray-900 font-medium"
                >${{ formatNumber(product.selling_price) }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Supplier</span>
              <span class="text-gray-900 font-medium">{{ product.supplier_name }}</span>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p class="text-xs text-red-600 font-semibold mb-1">Cost price</p>
            <p class="text-xl font-bold text-red-600">${{ formatNumber(product.cost_price) }}</p>
          </div>

          <button
            @click="handleRestock(product)"
            class="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Restock Now
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="finishedProducts?.length === 0"
        class="bg-white rounded-lg border border-gray-200 p-12 text-center"
      >
        <div class="text-5xl mb-4">🎉</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">All Stocked Up!</h3>
        <p class="text-gray-500">No out of stock products found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * OutofStock.vue - Script Setup
 * 
 * Affiche et gère tous les produits en rupture de stock
 * Permet aux utilisateurs de:
 * - Voir les produits avec quantité = 0
 * - Analyser les revenus perdus
 * - Trier et filtrer les produits en rupture
 * - Initier le réapprovisionnement
 */

import { ref, computed, onMounted } from 'vue'
import { OutOfStock } from '@/service/api'
import { useRoute, useRouter } from 'vue-router'
import { useActionMessage } from '@/composable/useActionMessage'

// ========================================
// COMPOSABLES ET ROUTER
// ========================================

/** Composable pour les notifications */
const { showSuccess, showError } = useActionMessage()

/** Router Vue pour la navigation */
const router = useRouter()

// ========================================
// DONNÉES RÉACTIVES
// ========================================

/** 
 * Liste des produits en rupture de stock
 * Tableau vide au départ (rempli par fetchFinishedProducts)
 */
const finishedProducts = ref([])

/** Message retourné par l'API */
const message = ref('')

/** Commandes de réapprovisionnement */
const orders = ref([])

/** Terme de recherche pour filtrer les produits */
const searchQuery = ref('')

/** Catégorie sélectionnée pour filtrer ('all' = sans filtre) */
const selectedCategory = ref('all')

/** Champ de tri sélectionné: 'daysEmpty', 'lostRevenue', 'unitPrice' */
const sortBy = ref('daysEmpty')

/** Compteur de produits haute valeur (prix de vente élevé) */
const highValueCount = ref(0)

/** Liste de toutes les catégories disponibles */
const categories = ref([])

/** Alias pour finishedProducts (pour la compatibilité) */
const outOfStockProducts = ref([])

/** Revenu total perdu à cause des ruptures de stock */
const totalLostRevenue = ref(0)

/** Nombre moyen de jours depuis la rupture */
const averageDaysEmpty = ref(0)

// ========================================
// LIFECYCLE HOOKS
// ========================================

/**
 * Hook du cycle de vie: Exécuté au montage du composant
 * 
 * Appel à fetchFinishedProducts pour charger les données initiales
 */
onMounted(async () => {
  await fetchFinishedProducts()
})

// ========================================
// MÉTHODES - RÉCUPÉRATION DES DONNÉES
// ========================================

/**
 * Récupère la liste des produits en rupture de stock depuis l'API
 * 
 * Actions:
 * 1. Appelle l'API OutOfStock()
 * 2. Stocke le message et les commandes
 * 3. Remplit finishedProducts avec les produits retournés
 * 4. Gère les erreurs de connexion
 * 
 * Structure de la réponse API attendue:
 * {
 *   message: string,
 *   orders: Array,
 *   products: Array<{id, Prod_name, category, selling_price, cost_price, lostRevenue, daysEmpty}>
 * }
 */
async function fetchFinishedProducts() {
  try {
    const data = await OutOfStock()
    console.log('✅ API Response:', data)

    // Stocke les données de la réponse API
    message.value = data.message
    orders.value = data.orders
    finishedProducts.value = data.products || [] // Initialise avec un tableau vide si pas de produits
  } catch (err) {
    showError('Failed to fetch out-of-stock products')
    console.error('❌ Error fetching out-of-stock products:', err)
  }
}

// ========================================
// PROPRIÉTÉS CALCULÉES (COMPUTED)
// ========================================

/**
 * Filtre et trie les produits selon les critères sélectionnés
 * 
 * Applique 3 niveaux de traitement:
 * 1. COPIE: Crée une copie du tableau pour ne pas modifier l'original
 * 2. FILTRAGE:
 *    - Recherche: par nom de produit
 *    - Catégorie: si une catégorie est sélectionnée
 * 3. TRI:
 *    - 'daysEmpty': Jours depuis la rupture (ordre décroissant)
 *    - 'lostRevenue': Revenu perdu (ordre décroissant)
 *    - 'unitPrice': Prix de vente (ordre décroissant)
 * 
 * @returns {Array} Tableau filtré et trié de produits
 */
const filteredProducts = computed(() => {
  // Crée une copie pour éviter de modifier finishedProducts
  let filtered = [...finishedProducts.value]

  // FILTRAGE 1: Recherche par nom
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((p) => p.Prod_name.toLowerCase().includes(query))
  }

  // FILTRAGE 2: Catégorie
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory.value)
  }

  // TRI: Applique le tri selon le champ sélectionné
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'daysEmpty':
        // Trie par nombre de jours (du plus ancien au plus récent)
        return (b.daysEmpty || 0) - (a.daysEmpty || 0)
      
      case 'lostRevenue':
        // Trie par revenu perdu (du plus important au moins important)
        return (b.lostRevenue || 0) - (a.lostRevenue || 0)
      
      case 'unitPrice':
        // Trie par prix de vente (du plus cher au moins cher)
        return (b.selling_price || 0) - (a.selling_price || 0)
      
      default:
        return 0
    }
  })

  return filtered
})

// ========================================
// MÉTHODES - UTILITAIRES
// ========================================

/**
 * Formate un nombre en devise USD avec 2 décimales
 * 
 * Exemple: 1234.567 → "1,234.57"
 * 
 * @param {number} num - Le nombre à formater
 * @returns {string} Nombre formaté en devise
 */
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

// ========================================
// MÉTHODES - ACTIONS
// ========================================

/**
 * Navigue vers la page de réapprovisionnement
 * 
 * Actions:
 * 1. Vérifie que le produit est valide
 * 2. Navigue vers la route 'restock' avec l'ID du produit
 * 3. Affiche l'ID du produit en log pour déboggage
 * 
 * @param {Object} finishedProduct - Le produit en rupture à réapprovisionner
 */
const handleRestock = (finishedProduct) => {
  if (!finishedProduct) return console.error('❌ No product loaded')

  router.push({
    name: 'restock',
    params: { reStockId: finishedProduct.id },
  })
  console.log('Restock product:', finishedProduct.id)
}
</script>
