// src/stores/entrepriseStore.js
import { defineStore } from "pinia";
import {
  createEntreprise,
  getEntreprises,
  getEntrepriseById,
  updateEntreprise,
  deleteEntreprise,
} from "@/service/api"; // adapte le chemin si nécessaire

export const useEntrepriseStore = defineStore("entreprise", {
  state: () => ({
    entreprises: [],
    currentEntreprise: null,
    isLoading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    // ✅ Créer une entreprise
    async createEntreprise(entrepriseData) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const data = await createEntreprise(entrepriseData);
        this.entreprises.push(data);
        this.successMessage = "Entreprise créée avec succès 🎉";
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || "Erreur lors de la création ❌";
      } finally {
        this.isLoading = false;
      }
    },

    // ✅ Récupérer toutes les entreprises de l'utilisateur
    async fetchEntreprises() {
      this.isLoading = true;
      this.error = null;

      try {
        const data = await getEntreprises();
        this.entreprises = data;
      } catch (err) {
        this.error = err.response?.data?.message || "Impossible de récupérer les entreprises ❌";
      } finally {
        this.isLoading = false;
      }
    },

    // ✅ Récupérer une entreprise par ID
    async fetchEntrepriseById(id) {
      this.isLoading = true;
      this.error = null;

      try {
        const data = await getEntrepriseById(id);
        this.currentEntreprise = data;
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || "Impossible de récupérer l'entreprise ❌";
      } finally {
        this.isLoading = false;
      }
    },

    // ✅ Mettre à jour une entreprise
    async updateEntreprise(id, entrepriseData) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const data = await updateEntreprise(id, entrepriseData);
        // Mettre à jour l'entreprise dans le tableau
        const index = this.entreprises.findIndex(e => e.id === id);
        if (index !== -1) this.entreprises[index] = data;
        this.successMessage = "Entreprise mise à jour avec succès 🎉";
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || "Erreur lors de la mise à jour ❌";
      } finally {
        this.isLoading = false;
      }
    },

    // ✅ Supprimer une entreprise
    async deleteEntreprise(id) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        await deleteEntreprise(id);
        this.entreprises = this.entreprises.filter(e => e.id !== id);
        this.successMessage = "Entreprise supprimée avec succès 🎉";
      } catch (err) {
        this.error = err.response?.data?.message || "Erreur lors de la suppression ❌";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
