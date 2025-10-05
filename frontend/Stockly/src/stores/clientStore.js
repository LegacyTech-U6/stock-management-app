import { defineStore } from 'pinia'
import { getClient, getClientById, updateClient, CreateClient } from '@/service/api'

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [],
    selectedClient: null,
    clientForm: {
      client_name: "",
      client_Signature: "",
      client_PhoneNumber: "",
      email: "",
      location: ""
    },
    loading: false,
    error: null,
    isFormOpen: false,
    isDetailsOpen: false,
    submitLoading: false, // Separate loading state for form submission
    submitError: null,    // Separate error state for form submission
  }),

  actions: {
    async fetchClients() {
      this.loading = true
      this.error = null
      try {
        this.clients = await getClient()
        console.log(this.clients)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to fetch clients'
        console.error("Error fetching clients:", err)
        throw err // Re-throw for component handling
      } finally {
        this.loading = false
      }
    },

    async fetchClientById(id) {
      this.loading = true
      this.error = null
      try {
        this.selectedClient = await getClientById(id)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Failed to fetch client details'
        console.error("Error fetching client:", err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async addClient() {
      this.submitLoading = true
      this.submitError = null
      try {
        const clientData = { ...this.clientForm }
        await CreateClient(clientData)
        await this.fetchClients() // Refresh the list
        this.fermerFormulaire() // Close form on success
        return { success: true }
      } catch (error) {
        this.submitError = error.response?.data?.message || error.message || 'Failed to add client'
        console.error("Error adding client:", error)
        throw error
      } finally {
        this.submitLoading = false
      }
    },

    async updateClient(clientId, clientData) {
      this.submitLoading = true
      this.submitError = null
      try {
        await updateClient(clientId, clientData)
        await this.fetchClients()
        return { success: true }
      } catch (err) {
        this.submitError = err.response?.data?.message || err.message || 'Failed to update client'
        console.error("Error updating client:", err)
        throw err
      } finally {
        this.submitLoading = false
      }
    },

    ouvrirFormulaire() {
      this.isFormOpen = true
      this.submitError = null // Clear previous errors
    },

    fermerFormulaire() {
      this.isFormOpen = false
      this.resetForm()
      this.submitError = null // Clear errors when closing
    },

    resetForm() {
      this.clientForm = {
        client_name: "",
        client_Signature: "",
        client_PhoneNumber: "",
        email: "",
        location: ""
      }
    },

    // Clear errors manually if needed
    clearErrors() {
      this.error = null
      this.submitError = null
    }
  },
})
