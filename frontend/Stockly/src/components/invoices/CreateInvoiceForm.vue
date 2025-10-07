<template>
  <div class="invoice-container">
    <div  class="invoice-card">
      <InvoiceHeader
        :invoiceNumber="invoice.id"
        @download="downloadPDF"
        @print="printInvoice"
        @back="$emit('back')"
        @email="sendEmail"
      />

      <div  ref="invoiceContent" class="invoice-content">
        <div class="invoice-grid">
          <div class="company-section">
            <CompanyInfo />
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
</template>

<script setup>
import InvoiceHeader from './InvoiceHeader.vue'
import CompanyInfo from './CompanyInfo.vue'
import BillTo from './BillTo.vue'
import InvoiceItemsTable from './InvoiceItemsTable.vue'
import InvoiceSummary from './InvoiceSummary.vue'
import PaymentTerms from './PaymentTerms.vue'
import { useInvoiceStore } from '@/stores/FactureStore'
import { ref, computed } from 'vue'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const invoiceStore = useInvoiceStore()
const invoice = JSON.parse(localStorage.getItem('invoiceData'))
const invoiceContent = ref(null)
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

async function printInvoice() {
  try {
    // Create a clone of the invoice content for printing
    const printElement = invoiceContent.value.cloneNode(true)

    // Add print-specific styles
    const printStyles = document.createElement('style')
    printStyles.innerHTML = `
      @media print {
        @page { margin: 10mm; }
        body { margin: 0; padding: 0; }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
      .print-only { display: block !important; }
      .no-print { display: none !important; }
    `

    // Create a temporary container for printing
    const printContainer = document.createElement('div')
    printContainer.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 210mm;
      min-height: 297mm;
      background: white;
      z-index: 10000;
      padding: 20mm;
      box-sizing: border-box;
    `

    printContainer.appendChild(printStyles)
    printContainer.appendChild(printElement)
    document.body.appendChild(printContainer)

    // Generate PDF
    const canvas = await html2canvas(printContainer, {
      scale: 3, // Very high quality for printing
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: printContainer.scrollWidth,
      height: printContainer.scrollHeight,
      windowWidth: printContainer.scrollWidth,
      windowHeight: printContainer.scrollHeight
    })

    // Clean up
    document.body.removeChild(printContainer)

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const imgData = canvas.toDataURL('image/png', 1.0)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')

    // Open in new window for printing
    const pdfBlob = pdf.output('blob')
    const pdfUrl = URL.createObjectURL(pdfBlob)

    const printWindow = window.open(pdfUrl)
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print()
        // Clean up URL after printing
        setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000)
      }
    }

  } catch (error) {
    console.error('PDF generation failed:', error)
    // Fallback to basic browser print
    fallbackPrint()
  }
}

function fallbackPrint() {
  const printContent = invoiceContent.value.innerHTML
  const originalContent = document.body.innerHTML

  // Enhanced print styles for fallback
  const printStyles = `
    <style>
      @media print {
        @page { margin: 15mm; }
        body {
          margin: 0;
          padding: 0;
          background: white !important;
          font-family: Arial, sans-serif;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print { display: none !important; }
      }
      body {
        padding: 20px;
        background: white;
        color: black;
      }
    </style>
  `

  document.body.innerHTML = printStyles + printContent
  window.print()
  document.body.innerHTML = originalContent
  window.location.reload()
}

function sendEmail() {
  console.log('Email invoice logic here')
}

defineEmits(['back'])
</script>

<style scoped>
.invoice-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.invoice-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.invoice-content {
  padding: 2rem;
}

.invoice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.company-section {
  display: flex;
  flex-direction: column;
}

.client-section {
  display: flex;
  flex-direction: column;
}

@media print {
  .invoice-container {
    padding: 0;
    margin: 0;
  }

  .invoice-card {
    box-shadow: none;
    border-radius: 0;
  }
}
</style>
