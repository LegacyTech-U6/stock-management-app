<template>
  <div
    class="fixed inset-0 z-50 bg-white/80 bg-opacity-50 flex justify-center items-start pt-5 overflow-auto mb-5"
  >
    <div class="bg-white rounded shadow max-w-4xl w-full relative">
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="$emit('close')">Close</button>
        <button class="btn btn-primary" @click="downloadPDF">Download PDF</button>
        <button class="btn" @click="printInvoice">Print</button>
      </div>

      <div class="p-6">
        <div v-if="loading" class="text-center py-8">
          <div class="text-gray-500">Loading invoice data...</div>
        </div>

        <div v-else ref="invoiceContent" class="invoice-content">
          <!-- Classic Invoice Layout -->
          <CompanyInfo :entreprise="entrepriseData" />

          <div class="invoice-grid">
            <div class="invoice-header-section">
              <InvoiceHeader
                :invoiceNumber="invoice.id"
                :creationDate="invoice.date"
                :dueDate="invoice.dueDate"
              />
            </div>
            <div class="client-section">
              <BillTo :client="clientData" />
            </div>
          </div>

          <InvoiceItemsTable :items="invoice.items" />
          <InvoiceSummary
            :items="invoice.items"
            :discount="invoice.discount"
            :tax-rate="invoice.taxRate"
          />
          <PaymentTerms />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CompanyInfo from './CompanyInfo.vue'
import InvoiceHeader from './InvoiceHeader.vue'
import BillTo from './BillTo.vue'
import InvoiceItemsTable from './InvoiceItemsTable.vue'
import InvoiceSummary from './InvoiceSummary.vue'
import PaymentTerms from './PaymentTerms.vue'
import { ref, onMounted, computed } from 'vue'
import { useInvoiceStore } from '@/stores/FactureStore'
import { useClientStore } from '@/stores/clientStore'
import { useEntrepriseStore } from '@/stores/entrepriseStore'

const entreprise = useEntrepriseStore()
const clientStore = useClientStore()
const invoiceContent = ref(null)
const loading = ref(true)
const invoiceStore = useInvoiceStore()
const props = defineProps({
  invoice: Object,
})

onMounted(async () => {
  try {
    console.log('Fetching client with ID:', props.invoice.client_id)
    await clientStore.fetchClientById(props.invoice.client_id)

    // ✅ CORRECTION : Passer l'ID de l'entreprise active
    if (entreprise.activeEntreprise && entreprise.activeEntreprise.id) {
      await entreprise.fetchEntrepriseById(entreprise.activeEntreprise.id)
    
    }

    console.log('Selected Client after fetch:', clientStore.selectedClient)
    console.log('Current Entreprise:', entreprise.currentEntreprise)
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
})

// Add a computed property to check if client data is available
const clientData = computed(() => {
  console.log('Current selectedClient:', clientStore.selectedClient)
  return clientStore.selectedClient
})

// Ajouter aussi les données de l'entreprise pour CompanyInfo
const entrepriseData = computed(() => {
  return entreprise.currentEntreprise || entreprise.activeEntreprise
})

async function downloadPDF() {
  await invoiceStore.createInvoice(props.invoice)
}

function printInvoice() {
  window.print()
}

defineEmits(['close'])
</script>
<style scoped>
.invoice-content {
  padding: 2rem;
  background: white;
}

.invoice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.btn-primary {
  background: #000;
  color: white;
  border-color: #000;
}

.btn-secondary {
  background: #666;
  color: white;
  border-color: #666;
}

@media (max-width: 768px) {
  .invoice-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media print {
  .action-buttons {
    display: none;
  }
}
</style>
