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
      this.loading = true
      this.error = null
      try {
        this.currentWorker = await workerAPI.getWorkerById(id)
      } catch (err) {
        this.error = err.message || 'Erreur lors du chargement du worker'
      } finally {
        this.loading = false
      }
    },
    // 🔹 Créer un worker
    async addWorker(workerData) {
      this.loading = true
      this.error = null
      try {
        const newWorker = await workerAPI.createWorker(workerData)
        this.workers.push(newWorker)
        return newWorker
      } catch (err) {
        this.error = err.message || 'Erreur lors de la création du worker'
        throw err
      } finally {
        this.loading = false
      }
    },
    // 🔹 Mettre à jour un worker
    async updateWorker(id, updatedData) {
      this.loading = true
      this.error = null
      try {
        const updatedWorker = await workerAPI.updateWorker(id, updatedData)
        const index = this.workers.findIndex((w) => w.id === id)
        if (index !== -1) this.workers[index] = updatedWorker
        return updatedWorker
      } catch (err) {
        this.error = err.message || 'Erreur lors de la mise à jour du worker'
        throw err
      } finally {
        this.loading = false
      }
    },
    // 🔹 Supprimer un worker
    async removeWorker(id) {
      this.loading = true
      this.error = null
      try {
        await workerAPI.deleteWorker(id)
        this.workers = this.workers.filter((w) => w.id !== id)
      } catch (err) {
        this.error = err.message || 'Erreur lors de la suppression du worker'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
