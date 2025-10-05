import { defineStore } from "pinia";
import { createInvoice,getAllInvoices,getInvoiceById } from "../service/api";

export const useInvoiceStore = defineStore('invoice',{
  state:()=>({
    loading:false,
  }),
  actions:{
    async fetchInvoice(){
      this.loading= true
      try {
        this.invoice = await getAllInvoices()
        this.error = null
        console.log(this.invoice)
      } catch (err) {
        this.error = err

      } finally{
        this.loading = false
      }
    },
        async fetchInvoiceById(id) {
      this.loading = true
      try {
        this.selectedInvoice = await getInvoiceById(id)
        this.error = null
      } catch (err) {
            this.error = err
          } finally {
            this.loading = false
          }
        },
        async createInvoice(invoiceData){
          console.log('info received in the store',invoiceData)
          this.loading = true;
          this.error = null
          try {

            await createInvoice(invoiceData)
          } catch (error) {
            this.error = error.message;
            console.error("Erreur lors de la création de la facture:", error);

          } finally{
            this.loading = false
          }
        },

  }
})
