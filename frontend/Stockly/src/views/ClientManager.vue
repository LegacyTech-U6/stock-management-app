<!-- 
  ClientManager.vue
  ===================
  Gestionnaire de clients/customers
  - Affiche la liste de tous les clients
  - Permet ajouter, modifier, supprimer des clients
  - Recherche, filtrage par statut
  - Actions en masse sur les clients
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête avec titre et boutons actions -->
    <div class="bg-white border-b border-gray-200 px-8 py-6 page-header">
      <div class="flex justify-between items-center max-w-[1600px] mx-auto header-content">
        <!-- Titre et description -->
        <div class="flex flex-col gap-1">
          <h1 class="text-2xl font-semibold text-gray-900 header-title">Customers</h1>
          <p class="text-sm text-gray-500 header-subtitle">Manage your customers</p>
        </div>
        <!-- Actions: Rafraîchir et Ajouter -->
        <div class="flex gap-3 items-center header-actions">
          <!-- Bouton rafraîchir -->
          <button
            @click="handleRefresh"
            class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors icon-button"
          >
            <RefreshCw :size="20" class="text-gray-700" />
          </button>
          <!-- Bouton ajouter client -->
          <button
            @click="handleAddClient"
            class="h-10 px-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors add-button"
          >
            <Plus :size="20" />
            <span class="button-text">Add Customer</span>
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-8 py-6 flex flex-col gap-4 content-wrapper">
      <!-- Barre de recherche et filtres -->
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div class="flex gap-4 items-center toolbar-content">
          <!-- Champ de recherche -->
          <div class="flex-1 max-w-md relative search-input-wrapper">
            <Search :size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Search customers..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <!-- Filtre par statut -->
          <select
            v-model="statusFilter"
            class="w-52 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent status-select"
          >
            <option :value="null">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <!-- État de chargement -->
      <div v-if="loadingClients" class="flex justify-center items-center min-h-[400px] bg-white rounded-lg border border-gray-200 shadow-sm">
        <div class="flex flex-col items-center gap-6">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p class="text-gray-500">Loading customers...</p>
        </div>
      </div>

      <!-- Client Table -->
      <div v-else-if="filteredClients.length > 0" class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="client in paginatedClients" :key="client.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-900">{{ client.client_signature }}</td>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ client.client_name }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ client.email }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ client.client_PhoneNumber }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ client.location }}</td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="{
                      'text-emerald-600': client.status === 'active',
                      'text-gray-500': client.status === 'inactive',
                      'text-amber-600': client.status === 'pending',
                    }"
                    class="font-medium"
                  >
                    {{ client.status ? client.status.charAt(0).toUpperCase() + client.status.slice(1) : 'Active' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2 justify-center action-buttons">
                    <button
                      @click="handleViewClient(client)"
                      class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Eye :size="18" class="text-gray-600" />
                    </button>
                    <button
                      @click="handleEditClient(client)"
                      class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Edit2 :size="18" class="text-gray-600" />
                    </button>
                    <button
                      @click="handleDeleteClient(client)"
                      class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 :size="18" class="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center px-6 py-4 border-t border-gray-200 pagination-wrapper">
          <div class="flex items-center gap-3 text-sm text-gray-600 pagination-info">
            <span>Show</span>
            <select
              v-model="pageSize"
              class="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
            <span>entries</span>
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="{
                'bg-emerald-500 text-white border-emerald-500': currentPage === page,
                'border-gray-300 hover:bg-gray-50': currentPage !== page,
              }"
              class="px-4 py-2 border rounded-lg transition-colors"
            >
              {{ page }}
            </button>
            <button
              @click="currentPage = Math.min(pageCount, currentPage + 1)"
              :disabled="currentPage === pageCount"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg border border-gray-200 shadow-sm py-16 px-6">
        <div class="flex flex-col items-center gap-6">
          <Inbox :size="64" class="text-gray-400" />
          <div class="text-center">
            <p class="text-lg font-medium text-gray-900 mb-2">
              {{ search ? 'No customers found' : 'No customers yet' }}
            </p>
            <p class="text-sm text-gray-500 mb-6">
              {{ search ? 'Try adjusting your search terms' : 'Get started by adding your first customer' }}
            </p>
            <button
              v-if="!search"
              @click="handleAddClient"
              class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors"
            >
              <Plus :size="20" />
              Add Your First Customer
            </button>
            <button v-else @click="search = ''" class="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors">
              Clear Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <FromModal
      :open="showModal"
      :isEdit="isEditMode"
      :clientData="selectedClient"
      :loading="loading"
      :error="error"
      @close="handleCloseModal"
      @submit="handleSubmit"
    />

    <!-- Delete Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showDeleteModal = false"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Delete Customer</h3>
          <div class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
            <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <p class="text-sm text-amber-800">This action cannot be undone</p>
          </div>
          <p class="text-sm text-gray-600 mb-6">
            Are you sure you want to delete <strong class="text-gray-900">{{ selectedClient?.client_name }}</strong>?
          </p>
          <div class="flex gap-3 justify-end">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Search,
  Plus,
  Inbox,
  FileText,
  FileSpreadsheet,
  RefreshCw,
  Eye,
  Edit2,
  Trash2,
} from 'lucide-vue-next'
import { useGlobalModal } from '@/composable/useValidation'
import { useClientStore } from '@/stores/clientStore'
import { useActionMessage } from '@/composable/useActionMessage'
import FromModal from '../components/clients/FromModal.vue'

const { show } = useGlobalModal()
const { showSuccess } = useActionMessage()
const clientStore = useClientStore()

// State
const search = ref('')
const statusFilter = ref(null)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditMode = ref(false)
const selectedClient = ref(null)
const loading = ref(false)
const error = ref('')
const loadingClients = ref(true)
const currentPage = ref(1)
const pageSize = ref(10)

// Computed properties
const filteredClients = computed(() => {
  let clients = clientStore.clients

  if (search.value) {
    const searchLower = search.value.toLowerCase()
    clients = clients.filter(
      (client) =>
        client.client_name?.toLowerCase().includes(searchLower) ||
        client.email?.toLowerCase().includes(searchLower) ||
        client.client_signature?.toLowerCase().includes(searchLower),
    )
  }

  if (statusFilter.value) {
    clients = clients.filter((c) => c.status === statusFilter.value)
  }

  return clients
})

const pageCount = computed(() => Math.ceil(filteredClients.value.length / pageSize.value))

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredClients.value.slice(start, end)
})

const visiblePages = computed(() => {
  const total = pageCount.value
  const current = currentPage.value
  const delta = 2
  const pages = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    pages.push(i)
  }

  if (current - delta > 2) {
    pages.unshift('...')
  }
  if (current + delta < total - 1) {
    pages.push('...')
  }

  pages.unshift(1)
  if (total > 1) {
    pages.push(total)
  }

  return pages.filter((p, i, arr) => p !== '...' || arr[i - 1] !== '...')
})

// Methods
const handleAddClient = () => {
  isEditMode.value = false
  selectedClient.value = null
  showModal.value = true
  error.value = ''
}

const handleViewClient = (client) => {
  console.log('View client:', client)
}

const handleEditClient = (client) => {
  isEditMode.value = true
  selectedClient.value = client
  showModal.value = true
  error.value = ''
}

const handleCloseModal = () => {
  showModal.value = false
  error.value = ''
}

const handleSubmit = async (formData) => {
  loading.value = true
  error.value = ''

  try {
    if (isEditMode.value) {
      await clientStore.updateClient(selectedClient.value.id, formData)
      show('Customer updated successfully!', 'success')
    } else {
      await clientStore.addClient(formData)
      show('Customer created successfully!', 'success')
    }

    showModal.value = false
    await clientStore.fetchClients()
  } catch (err) {
    error.value = err.response?.data?.message || 'Operation failed'
    show('Operation failed: ' + error.value, 'error')
  } finally {
    loading.value = false
  }
}

const handleDeleteClient = (client) => {
  selectedClient.value = client
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await clientStore.deleteclient(selectedClient.value.id)
    show('Customer deleted successfully!', 'success')
    await clientStore.fetchClients()
  } catch (err) {
    show('Failed to delete customer', 'error')
  } finally {
    showDeleteModal.value = false
    selectedClient.value = null
  }
}

const handleRefresh = async () => {
  loadingClients.value = true
  await clientStore.fetchClients()
  loadingClients.value = false
  showSuccess('Data refreshed!')
}

const exportPDF = () => {
  showSuccess('PDF export feature coming soon!')
}

const exportExcel = () => {
  showSuccess('Excel export feature coming soon!')
}

// Lifecycle
onMounted(async () => {
  loadingClients.value = true
  await clientStore.fetchClients()
  loadingClients.value = false
})
</script>

<style scoped>
/* Responsive Design */
.content-wrapper {
  max-width: 1600px;
}

.search-input-wrapper {
  flex: 1;
  max-width: 28rem;
}

@media (max-width: 1024px) {
  .content-wrapper {
    padding: 1.25rem 1.5rem;
  }

  .search-input-wrapper {
    max-width: 20rem;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 1rem 1.25rem;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .button-text {
    display: inline;
  }

  .content-wrapper {
    padding: 1rem;
  }

  .toolbar-content {
    flex-direction: column;
  }

  .search-input-wrapper,
  .status-select {
    width: 100%;
    max-width: none;
  }

  .pagination-wrapper {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .pagination-info {
    justify-content: center;
  }

  table {
    font-size: 0.75rem;
  }

  .action-buttons {
    gap: 0.25rem;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 1.25rem;
  }

  .header-subtitle {
    font-size: 0.75rem;
  }

  .icon-button {
    width: 2.25rem;
    height: 2.25rem;
  }

  .add-button {
    height: 2.25rem;
    padding: 0 1rem;
    font-size: 0.875rem;
  }

  .button-text {
    display: none;
  }

  td,
  th {
    padding: 0.5rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
