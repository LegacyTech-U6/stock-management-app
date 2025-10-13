<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Invoices</h1>
        <p class="text-sm text-gray-500 mt-1">Manage and track all your invoices</p>
      </div>
      <button
        @click="createInvoice"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Create Invoice
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- Total Invoices -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Total Invoices</p>
            <p class="text-3xl font-bold text-gray-900 mt-3">{{ stats.total }}</p>
            <p class="text-xs text-gray-400 mt-2">All time</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Paid Amount -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Paid Amount</p>
            <p class="text-3xl font-bold text-gray-900 mt-3">{{ formatPrice(stats.paidAmount) }}</p>
            <p class="text-xs text-green-600 mt-2">{{ stats.paid }} invoices paid</p>
          </div>
          <div class="p-3 bg-green-100 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Pending Amount -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Pending Amount</p>
            <p class="text-3xl font-bold text-gray-900 mt-3">
              {{ formatPrice(stats.pendingAmount) }}
            </p>
            <p class="text-xs text-yellow-600 mt-2">{{ stats.pending }} invoices pending</p>
          </div>
          <div class="p-3 bg-yellow-100 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Overdue Amount -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Overdue Amount</p>
            <p class="text-3xl font-bold text-gray-900 mt-3">
              {{ formatPrice(stats.overdueAmount) }}
            </p>
            <p class="text-xs text-red-600 mt-2">{{ stats.overdue }} invoices overdue</p>
          </div>
          <div class="p-3 bg-red-100 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-white rounded-2xl border border-gray-200">
      <!-- Toolbar -->
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <div class="flex-1 max-w-md">
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search invoices by number, client name, or email..."
              class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50"
            />
          </div>
        </div>
        <div class="flex items-center gap-3 ml-4">
          <button
            class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
              />
            </svg>
            All Status
          </button>
          <button
            class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export
          </button>
        </div>
      </div>
      <div v-if="loadingClients">
        <LazyLoader :loading="loadingClients" :skeleton-count="6">
          <template #icon>
            <n-spin size="40" />
          </template>
          <template #message>
            <p class="text-lg font-semibold text-gray-800">Loading clients...</p>
          </template>
        </LazyLoader>
      </div>

      <!-- Table -->
      <div v-else-if="filteredInvoices.length" class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-white border-b border-gray-100">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Invoice #
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Due Date
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                payment method
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="invoice in filteredInvoices"
              :key="invoice.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span class="font-medium text-gray-900">{{ invoice.id }}</span>
                </div>
              </td>
              <td class="px-6 whitespace-nowrap">
                <div>
                  <p class="font-medium text-gray-900">{{ invoice.client_name || 'N/A' }}</p>
                </div>
              </td>
              <td class="px-6 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"
                    />
                  </svg>
                  <span class="text-sm text-gray-900">{{ formatDate(invoice.date) }}</span>
                </div>
              </td>
              <td class="px-6 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"
                    />
                  </svg>
                  <span class="text-sm text-gray-900">{{ formatDate(invoice.due_date) }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                {{ formatPrice(invoice.total) }}
              </td>
              <td class="px-6 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                    invoice.status === 'payée'
                      ? 'bg-green-100 text-green-800'
                      : invoice.status === 'en_attente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800',
                  ]"
                >
                  <span
                    :class="[
                      'h-2 w-2 rounded-full mr-2',
                      invoice.status === 'payée'
                        ? 'bg-green-600'
                        : invoice.status === 'en_attente'
                          ? 'bg-yellow-600'
                          : 'bg-red-600',
                    ]"
                  ></span>
                  {{ formatStatus(invoice.status) }}
                </span>
              </td>
              <td class="px-6 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                  <span class="text-sm text-gray-900">{{ invoice.mode_paiement || 'N/A' }}</span>
                </div>
              </td>
              <td class="px-6 whitespace-nowrap">
                <div class="flex items-center gap-1">
                  <button
                    @click="viewInvoice(invoice.id)"
                    class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="handleDeleteInvoice"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
        <p class="text-gray-500">Try modifying your search or create a new invoice</p>
      </div>
    </div>
     <ActionModal
    v-model="showDeleteModal"
    title="Delete Invoice"
    message="Are you sure you want to delete this invoice? This action cannot be undone."
    confirm-text="Delete"
    cancel-text="Cancel"
    @confirm="confirmDelete"
  />
  <InvoiceDetailModal
   v-if="showInvoiceModal"
  :invoice="selectedInvoice"
  @close="showInvoiceModal = false"
   />
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInvoiceStore } from '@/stores/FactureStore'
import ActionModal from '@/components/ui/ActionModal.vue'
import { useActionMessage } from '@/composable/useActionMessage'
import LazyLoader from '@/components/ui/LazyLoader.vue'
import InvoiceDetailModal from '@/components/invoices/InvoiceDetailModal.vue'
const { showSuccess, showError } = useActionMessage()
const factureStore = useInvoiceStore()
const invoices = ref([])
const searchQuery = ref('')
const showDeleteModal = ref(false)
const invoiceToDelete = ref(null)
// Add these to your script section
const showInvoiceModal = ref(false)
const selectedInvoice = ref(null)
const stats = ref({
  total: 0,
  paid: 0,
  pending: 0,
  overdue: 0,
  paidAmount: 0,
  pendingAmount: 0,
  overdueAmount: 0,
})
const handleDeleteInvoice = (invoiceId) => {
  invoiceToDelete.value = invoiceId
  showDeleteModal.value = true
}
const loadingClients = ref(true)
const confirmDelete = async () => {
  try {
    await factureStore.Delete(invoiceToDelete.value)
    await factureStore.fetchInvoice()
    showSuccess('Invoice deleted successfully!')
  } catch (error) {
    console.error('Error deleting invoice:', error)
    showError('Failed to delete invoice')
  } finally {
    showDeleteModal.value = false
    invoiceToDelete.value = null
  }
}
onMounted(async () => {
  invoices.value = await factureStore.fetchInvoice()
  loadingClients.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))
  loadingClients.value = false
  // Compute stats
  stats.value.total = invoices.value.length
  stats.value.paid = invoices.value.filter((i) => i.status === 'payée').length
  stats.value.pending = invoices.value.filter((i) => i.status === 'en_attente').length
  stats.value.overdue = invoices.value.filter((i) => i.status === 'overdue').length

  stats.value.paidAmount = invoices.value
    .filter((i) => i.status === 'payée')
    .reduce((acc, cur) => acc + (cur.total || 0), 0)

  stats.value.pendingAmount = invoices.value
    .filter((i) => i.status === 'en_attente')
    .reduce((acc, cur) => acc + (cur.total || 0), 0)

  stats.value.overdueAmount = invoices.value
    .filter((i) => i.status === 'overdue')
    .reduce((acc, cur) => acc + (cur.total || 0), 0)
})

const filteredInvoices = computed(() =>
  invoices.value.filter(
    (i) =>
      i.id.toString().toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (i.client_name && i.client_name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (i.client_email && i.client_email.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (i.mode_paiement && i.mode_paiement.toLowerCase().includes(searchQuery.value.toLowerCase())),
  ),
)

function createInvoice() {
  // Redirect to invoice creation
  console.log('Create invoice')
}

function viewInvoice(id) {
  selectedInvoice.value = invoices.value.find(inv => inv.id === id)
  showInvoiceModal.value = true
}

const formatPrice = (amount) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
  }).format(amount || 0)

const formatDate = (date) => {
  if (!date) return 'N/A'
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return 'N/A'
  }
}

const formatStatus = (status) => {
  const statusMap = {
    payée: 'Paid',
    en_attente: 'Pending',
    overdue: 'Overdue',
  }
  return statusMap[status] || status
}
</script>
