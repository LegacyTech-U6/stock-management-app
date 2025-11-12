// src/api/axios.js
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useEntrepriseStore } from '@/stores/entrepriseStore'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Intercepteur pour ajouter automatiquement le token et l'entreprise active
API.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const entrepriseStore = useEntrepriseStore()
    console.log(API);
    

    // ✅ Ajouter le token si présent
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }

    // ✅ Ajouter l'entreprise active si définie
    if (entrepriseStore.activeEntreprise) {
      config.headers['X-Entreprise-Id'] = entrepriseStore.activeEntreprise.id
    }

    // 🧠 Debug complet ici :

    return config
  },
  (error) => Promise.reject(error),
)

// Intercepteur pour gérer les erreurs globales (optionnel)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ici tu peux gérer les erreurs 401, 403 ou autres globalement
    return Promise.reject(error)
  },
)

export default API
