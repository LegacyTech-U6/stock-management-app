// src/stores/entrepriseStore.js
import { defineStore } from 'pinia'
import {
  createEntreprise,
  getEntreprises,
  getEntrepriseById,
  updateEntreprise,
  deleteEntreprise,
} from '@/service/api'

export const useEntrepriseStore = defineStore('entreprise', {
  state: () => ({
    entreprises: [],
    currentEntreprise: null,
    totalEntreprise: null,
    activeEntreprise: null,
    isLoading: false,
    error: null,
    successMessage: null,
  }),
  actions: {
    setActiveEntreprise(entreprise) {
      this.activeEntreprise = entreprise
    },

    clearActiveEntreprise() {
      this.activeEntreprise = null
      localStorage.removeItem('stockly_entreprise') // clé exacte du persist
    },
    async createEntreprise(entrepriseData) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const data = await createEntreprise(entrepriseData)
        this.entreprises.push(data) // data.id est maintenant un UUID
        this.successMessage = 'Entreprise créée avec succès 🎉'
        return data
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la création ❌'
      } finally {
        this.isLoading = false
      }
    },

    async fetchEntreprises() {
      this.isLoading = true
      this.error = null

      try {
        const data = await getEntreprises()
        console.log(data)

        this.entreprises = data.data // data.entreprises contient maintenant id = UUID
        this.totalEntreprise = data.count
      } catch (err) {
        this.error = err.response?.data?.message || 'Impossible de récupérer les entreprises ❌'
      } finally {
        this.isLoading = false
      }
    },

    async fetchEntrepriseById(uuid) {
      this.isLoading = true
      this.error = null

      try {
        const data = await getEntrepriseById(uuid) // passer l'UUID
        this.currentEntreprise = data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || "Impossible de récupérer l'entreprise ❌"
      } finally {
        this.isLoading = false
      }
    },

    async updateEntreprise(uuid, entrepriseData) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const data = await updateEntreprise(uuid, entrepriseData)
        const index = this.entreprises.findIndex((e) => e.id === uuid)
        if (index !== -1) this.entreprises[index] = data
        this.successMessage = 'Entreprise mise à jour avec succès 🎉'
        return data
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la mise à jour ❌'
      } finally {
        this.isLoading = false
      }
    },

    async deleteEntreprise(uuid) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        await deleteEntreprise(uuid)
        this.entreprises = this.entreprises.filter((e) => e.id !== uuid)
        this.successMessage = 'Entreprise supprimée avec succès 🎉'
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la suppression ❌'
      } finally {
        this.isLoading = false
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'stockly_entreprise',
        storage: localStorage,
        paths: ['activeEntreprise'],
      },
    ],
  },
})
