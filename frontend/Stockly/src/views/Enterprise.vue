<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-8">
      <div class="flex">
        <img :src="activeEntreprise?.logo_url" :alt="activeEntreprise?.name" />
        <div class="p-1">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ activeEntreprise?.name || 'No enterprise selected' }} Management Dashboard
          </h1>
          <p class="text-gray-600 text-sm">Monitor your inventory and business performance</p>
        </div>
      </div>
    </div>
    <!-- Tabs -->

    <!-- Views -->
    <div v-if="activeTab === 'overview'">
      <DashboardOverview />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import DashboardOverview from '@/components/main/DashboardView.vue'

const activeTab = ref('overview')
const isEntrepriseReady = ref(false)
const entrepriseStore = useEntrepriseStore()
onMounted(() => {
  // attendre la restauration de Pinia Persist

  if (entrepriseStore.activeEntreprise) {
    isEntrepriseReady.value = true
  }
  // court délai pour laisser Pinia se restaurer
})
const activeEntreprise = computed(() => entrepriseStore.activeEntreprise)
import { Download, ShoppingCart, Eye } from 'lucide-vue-next'
</script>
