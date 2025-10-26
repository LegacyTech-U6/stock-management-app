// src/stores/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null, // récupère le token stocké au reload
    isLoading: false,
    error: null,
    successMessage: null,
  }),
  actions: {
    /**
     * Inscription utilisateur
     */
    async register(username, Last_name, email, telephone, password) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const res = await axios.post(`${API_URL}/auth/register`, {
          username,
          Last_name,
          email,
          telephone,
          password,
        })

        // ⚠️ backend ne renvoie que { message }
        this.successMessage = res.data.message || 'Inscription réussie 🎉'
      } catch (err) {
        this.error = err.response?.data?.message || "Erreur d'inscription ❌"
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Connexion utilisateur
     */
    async login(email, password) {
      this.isLoading = true
      this.error = null

      try {
        const res = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        })

        // ✅ Ton backend renvoie { token, message }
        this.token = res.data.token
        localStorage.setItem('token', this.token)

        // ⚠️ Pas de user dans la réponse → il faudra utiliser getAccount
        await this.getAccount()
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur de connexion ❌'
        this.user = null
        this.token = null
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Récupérer les infos utilisateur connecté
     */
    async getAccount() {
      if (!this.token) return

      try {
        const res = await axios.get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Impossible de récupérer le compte ❌'
        this.user = null
      }
    },

    /**
     * Déconnexion utilisateur
     */
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    /**
     * Mot de passe oublié
     */
    async forgotPassword(email) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const res = await axios.post(`${API_URL}/auth/forgot-password`, { email })
        this.successMessage = res.data.message || 'Lien envoyé 📩'
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la demande ❌'
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Réinitialiser le mot de passe
     */
    async resetPassword(token, newPassword) {
      this.isLoading = true
      this.error = null

      try {
        const res = await axios.post(`${API_URL}/auth/reset-password`, {
          token,
          newPassword,
        })
        this.successMessage = res.data.message
      } catch (err) {
        this.error = err.response?.data?.error || 'Erreur réinitialisation ❌'
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Changer le mot de passe (utilisateur connecté)
     */
    async changePassword(oldPassword, newPassword) {
      this.isLoading = true
      this.error = null

      try {
        const res = await axios.post(
          `${API_URL}/auth/change-password`,
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${this.token}` } },
        )
        this.successMessage = res.data.message
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur changement mot de passe ❌'
      } finally {
        this.isLoading = false
      }
    },
    /**
     * Vérification du compte par email
     */
    async verifyEmail(token) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const res = await axios.get(`${API_URL}/auth/activate/${token}`)
        this.successMessage = res.data.message || 'Compte activé avec succès 🎉'
      } catch (err) {
        this.error = err.response?.data?.message || 'Lien invalide ou expiré ❌'
      } finally {
        this.isLoading = false
      }
    },
    // src/stores/authStore.js
    async updateProfile(updatedData) {
      this.isLoading = true
      this.error = null
      this.successMessage = null

      try {
        const res = await axios.put(`${API_URL}/auth/update-profile`, updatedData, {
          headers: { Authorization: `Bearer ${this.token}` },
        })

        this.user = res.data.user || res.data // selon ta réponse backend
        this.successMessage = res.data.message || 'Profil mis à jour ✅'
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur de mise à jour ❌'
      } finally {
        this.isLoading = false
      }
    },
  },
})
