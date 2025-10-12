<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow rounded mt-10">
    <h2 class="text-2xl font-bold mb-4">Créer une nouvelle entreprise</h2>

    <form @submit.prevent="handleSubmit">
      <!-- Nom de l'entreprise -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Nom de l'entreprise</label>
        <input
          v-model="entreprise.name"
          type="text"
          class="w-full border px-3 py-2 rounded"
          placeholder="Ex : Ma Super Entreprise"
          required
        />
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Description</label>
        <textarea
          v-model="entreprise.description"
          class="w-full border px-3 py-2 rounded"
          placeholder="Description facultative"
        ></textarea>
      </div>

      <!-- Logo URL -->
      <div class="mb-4">
        <label class="block font-medium mb-1">Logo (URL)</label>
        <input
          v-model="entreprise.logo_url"
          type="url"
          class="w-full border px-3 py-2 rounded"
          placeholder="https://..."
        />
      </div>

      <!-- Erreur / Succès -->
      <p v-if="store.error" class="text-red-500 mb-4">{{ store.error }}</p>
      <p v-if="store.successMessage" class="text-green-500 mb-4">{{ store.successMessage }}</p>

      <button
        type="submit"
        :disabled="store.isLoading"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {{ store.isLoading ? 'Création...' : 'Créer l’entreprise' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useActionMessage } from '@/composable/useActionMessage'
const { showSuccess, showError } = useActionMessage()
const router = useRouter()
const store = useEntrepriseStore()

const entreprise = ref({
  name: '',
  description: '',
  logo_url: ''
})

const handleSubmit = async () => {
  store.error = null
  store.successMessage = null

  if (!entreprise.value.name) {
    store.error = 'Le nom de l’entreprise est requis'
    return
  }

  const result = await store.createEntreprise(entreprise.value)

  if (result) {
    // Rediriger vers la liste des entreprises après création
    router.push('/entreprises')
  }
}
</script>

<style scoped>
/* Optionnel : styles supplémentaires */
</style>
