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
    activeEntreprise:null,
    isLoading: false,
    error: null,
    successMessage: null,
  }),
  actions: {
     // ✅ Gestion de l’entreprise active
    setActiveEntreprise(entreprise) {
      this.activeEntreprise = entreprise
    },

    clearActiveEntreprise() {
      this.activeEntreprise = null
    },
    async createEntreprise(entrepriseData) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const data = await createEntreprise(entrepriseData)
        this.entreprises.push(data)
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
        console.log(data.entreprises)
        this.entreprises = data.entreprises // ⚠️ pas .entreprises si backend renvoie un tableau
      } catch (err) {
        this.error = err.response?.data?.message || 'Impossible de récupérer les entreprises ❌'
      } finally {
        this.isLoading = false
      }
    },

    async fetchEntrepriseById(id) {
      this.isLoading = true
      this.error = null

      try {
        const data = await getEntrepriseById(id)
        this.currentEntreprise = data
        return data
      } catch (err) {
        this.error = err.response?.data?.message || "Impossible de récupérer l'entreprise ❌"
      } finally {
        this.isLoading = false
      }
    },

    async updateEntreprise(id, entrepriseData) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const data = await updateEntreprise(id, entrepriseData)
        const index = this.entreprises.findIndex((e) => e.id === id)
        if (index !== -1) this.entreprises[index] = data
        this.successMessage = 'Entreprise mise à jour avec succès 🎉'
        return data
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la mise à jour ❌'
      } finally {
        this.isLoading = false
      }
    },

    async deleteEntreprise(id) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        await deleteEntreprise(id)
        this.entreprises = this.entreprises.filter((e) => e.id !== id)
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
        paths: ['activeEntreprise'], // on persiste seulement ça
      },
    ],
  },
})
