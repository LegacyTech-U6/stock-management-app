import { defineStore } from 'pinia'
import * as workerAPI from '../service/api'

export const useWorkerStore = defineStore('worker', {
  // -----------------------------
  state: () => ({
    // -----------------------------
    workers: [],
    loading: false,
    error: null,
    currentWorker: null,
  }),
  // -----------------------------
  actions: {
    // -----------------------------

    // 🔹 Récupérer tous les workers
    async fetchAllWorkers() {
      this.loading = true
      this.error = null
      try {
        const data = await workerAPI.getAllWorkers()
        console.log(data.workers)
        this.workers = data.workers

      } catch (err) {
        this.error = err.message || 'Erreur lors du chargement des workers'
      } finally {
        this.loading = false
      }
    },

    // 🔹 Récupérer un worker spécifique
    async fetchWorkerById(id) {
      loading = true
      error = null
      try {
        currentWorker = await workerAPI.getWorkerById(id)
      } catch (err) {
        error = err.message || 'Erreur lors du chargement du worker'
      } finally {
        loading = false
      }
    },
    // 🔹 Créer un worker
    async addWorker(workerData) {
      loading = true
      error = null
      try {
        const newWorker = await workerAPI.createWorker(workerData)
        workers.push(newWorker)
        return newWorker
      } catch (err) {
        error = err.message || 'Erreur lors de la création du worker'
        throw err
      } finally {
        loading = false
      }
    },
    // 🔹 Mettre à jour un worker
    async updateWorker(id, updatedData) {
      loading = true
      error = null
      try {
        const updatedWorker = await workerAPI.updateWorker(id, updatedData)
        const index = workers.findIndex((w) => w.id === id)
        if (index !== -1) workers[index] = updatedWorker
        return updatedWorker
      } catch (err) {
        error = err.message || 'Erreur lors de la mise à jour du worker'
        throw err
      } finally {
        loading = false
      }
    },
    // 🔹 Supprimer un worker
    async removeWorker(id) {
      loading = true
      error = null
      try {
        await workerAPI.deleteWorker(id)
        workers = workers.filter((w) => w.id !== id)
      } catch (err) {
        error = err.message || 'Erreur lors de la suppression du worker'
        throw err
      } finally {
        loading = false
      }
    },
  },
})
