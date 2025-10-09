<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">Mes entreprises</h2>

    <!-- Bouton pour créer une nouvelle entreprise -->
    <div class="mb-4">
      <router-link
        to="/entreprises/create"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Créer une nouvelle entreprise
      </router-link>
    </div>

    <!-- Loader -->
    <p v-if="store.isLoading" class="text-gray-500">Chargement des entreprises...</p>

    <!-- Erreur -->
    <p v-if="store.error" class="text-red-500 mb-4">{{ store.error }}</p>

    <!-- Liste des entreprises -->
    <div v-if="store.entreprises.length" class="space-y-4">
      <div
        v-for="entreprise in store.entreprises"
        :key="entreprise.id"
        class="border p-4 rounded shadow flex justify-between items-center"
      >
        <div @click="selectEntreprise(entreprise)" class="cursor-pointer">
          <h3 class="font-bold text-lg">
            {{ entreprise.name }}
            <span v-if="store.activeEntreprise?.id === entreprise.id" class="text-green-500">(Active)</span>
          </h3>
          <p class="text-gray-600">{{ entreprise.description || 'Pas de description' }}</p>
        </div>

        <div class="flex gap-2">
          <!-- Modifier -->
          <router-link
            :to="`/entreprises/edit/${entreprise.id}`"
            class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Modifier
          </router-link>

          <!-- Supprimer -->
          <button
            @click="deleteEntreprise(entreprise.id)"
            class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Message si aucune entreprise -->
    <p v-else class="text-gray-500">Vous n'avez encore créé aucune entreprise.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'

const store = useEntrepriseStore()

// Charger les entreprises au montage
onMounted(async () => {
  await store.fetchEntreprises()

  // Définir la première entreprise comme active par défaut
  if (store.entreprises.length) {
    store.setActiveEntreprise(store.entreprises[0])
  }
})

// Supprimer une entreprise
const deleteEntreprise = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
    const success = await store.deleteEntreprise(id)
    if (success) {
      alert('Entreprise supprimée avec succès 🎉')
    }
  }
}

// Sélectionner une entreprise
const selectEntreprise = (entreprise) => {
  store.setActiveEntreprise(entreprise)
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
