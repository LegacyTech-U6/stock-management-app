<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between mb-8 bg-white/70 rounded-xl shadow-sm p-4">
      <div class="flex items-center gap-4">
        <!-- Logo -->
        <img
          v-if="activeEntreprise?.logo_url"
          class="w-16 h-16 rounded-lg object-cover shadow"
          :src="activeEntreprise.logo_url"
          :alt="activeEntreprise.name"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 leading-tight">
            {{ activeEntreprise?.name || 'No enterprise selected' }}
          </h1>
          <p class="text-gray-500 text-sm">
            Management Dashboard — Monitor your inventory and business performance
          </p>
        </div>
      </div>
    </div>

    <!-- Main content -->
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
