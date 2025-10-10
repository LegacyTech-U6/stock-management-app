import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as workerAPI from '../service/api'

export const useWorkerStore = defineStore('worker', () => {
  // -----------------------------
  // State
  // -----------------------------
  const workers = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentWorker = ref(null)

  // -----------------------------
  // Actions
  // -----------------------------

  // 🔹 Récupérer tous les workers
  async function fetchAllWorkers() {
    loading.value = true
    error.value = null
    try {
      workers.value = await workerAPI.getAllWorkers()
    } catch (err) {
      error.value = err.message || 'Erreur lors du chargement des workers'
    } finally {
      loading.value = false
    }
  }

  // 🔹 Récupérer un worker spécifique
  async function fetchWorkerById(id) {
    loading.value = true
    error.value = null
    try {
      currentWorker.value = await workerAPI.getWorkerById(id)
    } catch (err) {
      error.value = err.message || 'Erreur lors du chargement du worker'
    } finally {
      loading.value = false
    }
  }

  // 🔹 Créer un worker
  async function addWorker(workerData) {
    loading.value = true
    error.value = null
    try {
      const newWorker = await workerAPI.createWorker(workerData)
      workers.value.push(newWorker)
      return newWorker
    } catch (err) {
      error.value = err.message || 'Erreur lors de la création du worker'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 🔹 Mettre à jour un worker
  async function updateWorker(id, updatedData) {
    loading.value = true
    error.value = null
    try {
      const updatedWorker = await workerAPI.updateWorker(id, updatedData)
      const index = workers.value.findIndex(w => w.id === id)
      if (index !== -1) workers.value[index] = updatedWorker
      return updatedWorker
    } catch (err) {
      error.value = err.message || 'Erreur lors de la mise à jour du worker'
      throw err
    } finally {
      loading.value = false
    }
  }

  // 🔹 Supprimer un worker
  async function removeWorker(id) {
    loading.value = true
    error.value = null
    try {
      await workerAPI.deleteWorker(id)
      workers.value = workers.value.filter(w => w.id !== id)
    } catch (err) {
      error.value = err.message || 'Erreur lors de la suppression du worker'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    workers,
    currentWorker,
    loading,
    error,
    fetchAllWorkers,
    fetchWorkerById,
    addWorker,
    updateWorker,
    removeWorker
  }
})
