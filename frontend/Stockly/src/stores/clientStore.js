import { defineStore } from 'pinia'
import { getClient, getClientById, updateClient } from '@/service/api'

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [],
    selectedClient: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchClients() {
      this.loading = true
      try {
        this.clients = await getClient()
        this.error = null
        console.log(this.clients)
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async fetchClientById(id) {
      this.loading = true
      try {
        this.selectedClient = await getClientById(id)
        this.error = null
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async updateClient(clientId, clientData) {
      this.loading = true
      try {
        await updateClient(clientId, clientData)
        await this.fetchClients()
        this.error = null
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
  },
})
