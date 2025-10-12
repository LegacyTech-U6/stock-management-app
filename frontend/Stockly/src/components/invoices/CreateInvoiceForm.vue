<template>
  <div class="fixed inset-0 z-50 bg-white/80 bg-opacity-50 flex justify-center items-start pt-5 overflow-auto mb-5">

    <div class="bg-white rounded shadow max-w-4xl w-full relative">
      <!-- Action Buttons -->
      <div class="action-buttons">
          <button class="btn btn-secondary" @click="$emit('close')">Close</button>
          <button class="btn btn-primary" @click="downloadPDF">Download PDF</button>
          <button class="btn" @click="printInvoice">Print</button>
        </div>


      <div class="p-6">
        <div ref="invoiceContent" class="invoice-content">
          <!-- Classic Invoice Layout -->
          <CompanyInfo />

          <div class="invoice-grid">
            <div class="invoice-header-section">
              <InvoiceHeader
                :invoiceNumber="invoice.id"
                :creationDate="invoice.date"
                :dueDate="invoice.dueDate"
              />
            </div>
            <div class="client-section">
              <BillTo :client="invoice.client" />
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
import { ref } from 'vue'
import { useInvoiceStore } from '@/stores/FactureStore'

const props = defineProps({
  invoice: Object
})
const invoiceContent = ref(null)
const invoiceStore = useInvoiceStore()

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
