<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header Section -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Invoices</h1>
      <p class="text-sm text-gray-500 mt-1">Manage your stock invoices</p>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Toolbar -->
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <!-- Search -->
        <div class="relative w-64">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input v-model="searchQuery" type="text" placeholder="Search"
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
        </div>

        <!-- Filters and Actions -->
        <div class="flex items-center gap-3">
          <!-- Customer Filter -->
          <select v-model="selectedCustomer"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white">
            <option :value="null">Customer</option>
            <option v-for="option in customerOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <!-- Status Filter -->
          <select v-model="selectedStatus"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white">
            <option :value="null">Status</option>
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <!-- Sort By -->
          <select v-model="sortBy"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <!-- Action Buttons -->
          <button
            class="w-10 h-10 flex items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            title="Export PDF">
            <FileText class="w-5 h-5" />
          </button>

          <button
            class="w-10 h-10 flex items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
            title="Export Excel">
            <FileText class="w-5 h-5" />
          </button>

          <button
            class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Refresh" @click="refreshInvoices">
            <RefreshCw class="w-5 h-5 text-gray-600" />
          </button>

          <button
            class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Collapse">
            <ChevronUp class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loadingClients" class="flex flex-col items-center justify-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <p class="text-lg font-semibold text-gray-800">Loading invoices...</p>
      </div>

      <!-- Table -->
      <div v-else-if="filteredInvoices.length" class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Invoice No
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Due Date
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Paid
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount Due
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="invoice in paginatedInvoices" :key="invoice.id"
              class="hover:bg-gray-50 transition-colors cursor-pointer" @click="viewInvoice(invoice.id)">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="font-medium text-gray-900">{{ invoice.id }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                    :style="{ backgroundColor: getAvatarColor(invoice.client_name) }">
                    {{ getInitials(invoice.client.client_name) }}
                  </div>
                  <span class="font-medium text-gray-900">{{ invoice.client.client_name || 'N/A' }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(invoice.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatPrice(invoice.total) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPrice(invoice.status === 'payée' ? invoice.total : 0) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPrice(invoice.status !== 'payée' ? invoice.total : 0) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                  getStatusClass(invoice.status)
                ]">
                  {{ formatStatus(invoice.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <button @click.stop="viewInvoice(invoice.id)"
                    class="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="View">
                    <Eye class="w-5 h-5" />
                  </button>
                  <button @click.stop="handleDeleteInvoice(invoice.id)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete">
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-16">
        <FileText class="w-16 h-16 text-gray-300 mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
        <p class="text-gray-500">Try modifying your search or create a new invoice</p>
      </div>

      <!-- Footer with Pagination -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Row Per Page</span>
          <select v-model="pageSize"
            class="px-2 py-1 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
          <span class="text-sm text-gray-600 ml-4">Entries</span>
        </div>

        <div class="text-sm text-gray-500">
           2025 © Stockly. All Right Reserved
        </div>

        <div class="flex items-center gap-2">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <ChevronUp class="w-4 h-4 transform rotate-[-90deg]" />
          </button>
          <button v-for="page in visiblePages" :key="page" @click="currentPage = page" :class="[
            'w-8 h-8 flex items-center justify-center rounded border text-sm font-medium transition-colors',
            currentPage === page
              ? 'bg-orange-500 text-white border-orange-500'
              : 'border-gray-200 hover:bg-gray-50'
          ]">
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <ChevronUp class="w-4 h-4 transform rotate-90" />
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <ActionModal v-model="showDeleteModal" title="Delete Invoice"
      message="Are you sure you want to delete this invoice? This action cannot be undone." confirm-text="Delete"
      cancel-text="Cancel" @confirm="confirmDelete" />

    <!-- Invoice Detail Modal -->
    <InvoiceDetailModal v-if="showInvoiceModal" :invoice="selectedInvoice" :entreprise="entreprise"
      @close="showInvoiceModal = false" />

  
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Search,
  FileText,
  RefreshCw,
  ChevronUp,
  Settings,
  Eye,
  Trash2
} from 'lucide-vue-next'
import { useInvoiceStore } from '@/stores/FactureStore'
import { useActionMessage } from '@/composable/useActionMessage'
import ActionModal from '@/components/ui/ActionModal.vue'
import InvoiceDetailModal from '@/components/invoices/InvoiceDetailModal.vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
const { showSuccess, showError } = useActionMessage()
const invoiceStore = useInvoiceStore()
const searchQuery = ref('')
const selectedCustomer = ref(null)
const selectedStatus = ref(null)
const sortBy = ref('last7days')
const showDeleteModal = ref(false)
const invoiceToDelete = ref(null)
const showInvoiceModal = ref(false)
const selectedInvoice = ref(null)
const loadingClients = ref(true)
const pageSize = ref(10)
const currentPage = ref(1)
const entrepriseStore = useEntrepriseStore()

const invoices = computed(() => invoiceStore.invoices || [])
const entreprise = computed(() => entrepriseStore.activeEntreprise || {})

const customerOptions = computed(() => [
  ...Array.from(new Set(invoices.value.map(i => i.client_name)))
    .filter(Boolean)
    .map(name => ({ label: name, value: name }))
])

const statusOptions = [
  { label: 'Paid', value: 'payée' },
  { label: 'Unpaid', value: 'en_attente' },
  { label: 'Overdue', value: 'overdue' }
]

const sortOptions = [
  { label: 'Sort By : Last 7 Days', value: 'last7days' },
  { label: 'Sort By : Last 30 Days', value: 'last30days' },
  { label: 'Sort By : Last 90 Days', value: 'last90days' }
]

const filteredInvoices = computed(() => {
  let result = invoices.value

  if (searchQuery.value) {
    result = result.filter(
      (i) =>
        i.id.toString().toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (i.client_name && i.client_name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (i.client_email && i.client_email.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  if (selectedCustomer.value) {
    result = result.filter(i => i.client_name === selectedCustomer.value)
  }

  if (selectedStatus.value) {
    result = result.filter(i => i.status === selectedStatus.value)
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredInvoices.value.length / pageSize.value))

const paginatedInvoices = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredInvoices.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 3
  let start = Math.max(1, currentPage.value - 1)
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const handleDeleteInvoice = (invoiceId) => {
  invoiceToDelete.value = invoiceId
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await invoiceStore.deleteInvoice(invoiceToDelete.value)
    showSuccess('Invoice deleted successfully!')
  } catch (error) {
    console.error('Error deleting invoice:', error)
    showError('Failed to delete invoice')
  } finally {
    showDeleteModal.value = false
    invoiceToDelete.value = null
  }
}

const refreshInvoices = async () => {
  loadingClients.value = true
  try {
    await invoiceStore.fetchInvoices()
    showSuccess('Invoices refreshed successfully!')
  } catch (error) {
    console.error('Error loading invoices:', error)
    showError('Failed to load invoices')
  } finally {
    loadingClients.value = false
  }
}

onMounted(async () => {
  loadingClients.value = true
  try {
    await invoiceStore.fetchInvoices()
  } catch (error) {
    console.error('Error loading invoices:', error)
    showError('Failed to load invoices')
  } finally {
    loadingClients.value = false
  }
})

function viewInvoice(id) {
  selectedInvoice.value = invoices.value.find(inv => inv.id === id)
  showInvoiceModal.value = true
}

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0)

const formatDate = (date) => {
  if (!date) return 'N/A'
  try {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return 'N/A'
  }
}

const formatStatus = (status) => {
  const statusMap = {
    payée: 'Paid',
    en_attente: 'Unpaid',
    overdue: 'Overdue',
  }
  return statusMap[status] || status
}

const getStatusClass = (status) => {
  const classMap = {
    payée: 'bg-green-100 text-green-800',
    en_attente: 'bg-red-100 text-red-800',
    overdue: 'bg-yellow-100 text-yellow-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getAvatarColor = (name) => {
  const colors = [
    '#18a058', '#2080f0', '#f0a020', '#d03050',
    '#8a2be2', '#00ced1', '#ff6347', '#32cd32'
  ]
  if (!name) return colors[0]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
