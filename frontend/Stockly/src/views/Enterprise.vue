<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">
          {{ activeEntreprise?.name || 'No enterprise selected' }} Management Dashboard
        </h1>
        <p class="text-gray-600 text-sm">Monitor your inventory and business performance</p>
      </div>
      <div class="flex gap-3">
        
        <button
          class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium flex items-center gap-2"
        >
          <Download class="w-4 h-4" /> Export
        </button>
        <button
          class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium flex items-center gap-2"
        >
          <ShoppingCart class="w-4 h-4" /> Sales
        </button>
        <button
          class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm font-medium flex items-center gap-2"
        >
          <Eye class="w-4 h-4" /> View Inventory
        </button>
      </div>
    </div>
    <!-- Tabs -->

    <!-- Views -->
    <div v-if="activeTab === 'overview'">
      <DashboardOverview />
    </div>

    <div v-else-if="activeTab === 'enterprise'">
      <EnterpriseAnalytics />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import DashboardOverview from '@/components/main/DashboardView.vue'
import EnterpriseAnalytics from '@/components/main/EnterpriseAnalytics.vue'
const activeTab = ref('overview')
const isEntrepriseReady = ref(false)
const entrepriseStore = useEntrepriseStore()
onMounted(() => {
  // attendre la restauration de Pinia Persist
  setTimeout(() => {
    if (entrepriseStore.activeEntreprise) {
      isEntrepriseReady.value = true
    }
  }, 100) // court délai pour laisser Pinia se restaurer
})
const activeEntreprise = computed(() => entrepriseStore.activeEntreprise)
import { Download, ShoppingCart, Eye } from 'lucide-vue-next'
</script>
