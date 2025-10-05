<template>
  <div class="p-8 bg-white rounded-lg shadow-md">
    <InvoiceHeader
      :invoiceNumber="invoice.id"
      @download="downloadPDF"
      @print="printInvoice"
    />

    <CompanyInfo />
    <BillTo :client="invoice.client" />
    <InvoiceItemsTable :items="invoice.items" />

    <InvoiceSummary
      :items="invoice.items"
      :discount="invoice.discount"
      :tax-rate="invoice.taxRate"
    />

    <PaymentTerms />
  </div>
</template>

<script setup>
import InvoiceHeader from './InvoiceHeader.vue'
import CompanyInfo from './CompanyInfo.vue'
import BillTo from './BillTo.vue'
import InvoiceItemsTable from './InvoiceItemsTable.vue'
import InvoiceSummary from './InvoiceSummary.vue'
import PaymentTerms from './PaymentTerms.vue'
import { useInvoiceStore } from '@/stores/FactureStore'
import { ref,computed } from 'vue'
const invoiceStore = useInvoiceStore()
const invoice = JSON.parse(localStorage.getItem('invoiceData'))
// ✅ Déclare les props
const props = defineProps({
  // invoice: {
  //   type: Object,
  //   required: true,
  //   default: () => ({ client: {}, items: [], discount: 0, taxRate: 0 })
  // },
  selectedClient: {
    type: Object,
    required: true,
    default: () => ({})
  }
});
console.log(invoice)

// ✅ Vérifie toujours avant d’utiliser props.invoice.items
const subtotal = computed(() => {
  if (!invoice || !invoice.items) return 0;

  return invoice.items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);
});
const taxAmount = computed(() => (subtotal.value * (invoice.taxRate || 0)) / 100)
const total = computed(() => subtotal.value + taxAmount.value)

async function downloadPDF() {
  console.log('Download PDF logic here')
 await invoiceStore.createInvoice(invoice)

}

function printInvoice() {
  window.print()
}
</script>
