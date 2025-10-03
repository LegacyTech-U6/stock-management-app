import { defineStore } from 'pinia'
import { getClient, getClientById, updateClient,CreateClient } from '@/service/api'

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [],
    selectedClient: null,
    clientForm: {
      client_name: "",
      client_Signature: "",
      client_PhoneNumber: "",
      email: "",
      location:""
    },
    loading: false,
    error: null,
    isFormOpen: false,
    isDetailsOpen: false,

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
    async addClient(){
      this.loading = true;
      this.error = null
      try {
        const clientData = this.clientForm
        await CreateClient(clientData)
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de l'ajout du client:", error);

      } finally{
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
     ouvrirFormulaire() {
      this.isFormOpen = true;
    },

    fermerFormulaire() {
      this.isFormOpen = false;
      this.resetForm();
    },
  },
})
