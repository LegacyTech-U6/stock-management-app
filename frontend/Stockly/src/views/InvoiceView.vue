<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Breadcrumb / Navigation -->
    <nav class="flex items-center text-sm text-gray-500 mb-6 space-x-2">
      <router-link to="/dashboard" class="hover:underline">Dashboard</router-link>
      <span>/</span>
      <router-link to="/sales" class="hover:underline">Sales</router-link>
      <span>/</span>
      <span class="text-gray-700 font-medium">Invoice</span>
    </nav>

    <!-- Page Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Invoice</h1>
        <p class="text-gray-500 text-sm">
          View and manage the details of your invoice.
        </p>
      </div>

      <!-- User Info (Top Right Avatar) -->
      <div class="flex items-center space-x-3">
        <img
          src=""
          alt="User"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p class="text-sm font-semibold">{{ user.name }}</p>
          <p class="text-xs text-gray-500">{{ user.role }}</p>
        </div>
      </div>
    </div>

    <!-- Invoice Content -->
    <div v-if="invoice" class="max-w-5xl mx-auto">
      <CreateInvoiceForm :invoiceData="invoice" />
    </div>

    <!-- Loading State -->
    <div v-else class="flex justify-center items-center h-64 text-gray-500">
      Loading invoice details...
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CreateInvoiceForm from '@/components/invoices/CreateInvoiceForm.vue'

// Simulated user data (can later come from store)
const user = ref({
  name: 'Sales Interface',
  role: 'Administrator'
})

// Get invoice ID from route param (like /invoice/:id)
const route = useRoute()
const invoiceId = route.params.id

// Invoice data
const invoice = ref(null)

// Fetch invoice details (from backend)
async function fetchInvoice() {
  try {
    // Example: GET /api/invoices/:id
    const response = await fetch(`http://localhost:3000/api/invoices/${invoiceId}`)
    if (!response.ok) throw new Error('Failed to fetch invoice')
    const data = await response.json()
    invoice.value = data
  } catch (error) {
    console.error('Error fetching invoice:', error)
  }
}

onMounted(() => {
  fetchInvoice()
})
</script>
