<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-8xl mx-auto">
      <!-- Header -->
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-semibold text-gray-800 mb-1">Employees</h1>
          <p class="text-sm text-gray-500">Manage your employees</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="p-2 hover:bg-gray-100 rounded-lg transition">
            <List class="w-5 h-5 text-gray-600" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg transition">
            <Grid3x3 class="w-5 h-5 text-gray-600" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg transition">
            <FileText class="w-5 h-5 text-gray-600" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg transition">
            <FileSpreadsheet class="w-5 h-5 text-gray-600" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg transition">
            <RefreshCw class="w-5 h-5 text-gray-600" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronUp class="w-5 h-5 text-gray-600" />
          </button>
          <button
            @click="showModal = true"
            class="bg-orange-500 text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition flex items-center gap-2 text-sm font-medium shadow-sm"
          >
            <Plus class="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium opacity-90">Total Employee</span>
            <Users class="w-5 h-5 opacity-80" />
          </div>
          <div class="text-3xl font-bold">{{ stats.total }}</div>
        </div>

        <div class="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-5 text-white shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium opacity-90">Active</span>
            <UserCheck class="w-5 h-5 opacity-80" />
          </div>
          <div class="text-3xl font-bold">{{ stats.active }}</div>
        </div>

        <div class="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-5 text-white shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium opacity-90">Inactive</span>
            <UserX class="w-5 h-5 opacity-80" />
          </div>
          <div class="text-3xl font-bold">{{ stats.inactive }}</div>
        </div>

        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium opacity-90">New Joiners</span>
            <UserPlus class="w-5 h-5 opacity-80" />
          </div>
          <div class="text-3xl font-bold">{{ stats.newJoiners }}</div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="mb-6 flex gap-3">
        <div class="flex-1 relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            v-model="searchTerm"
            class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm"
          />
        </div>
        <select
          v-model="filterDepartment"
          class="border border-gray-200 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm text-gray-600"
        >
          <option value="">Select Employees</option>
          <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
        </select>
        <select
          v-model="filterDesignation"
          class="border border-gray-200 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm text-gray-600"
        >
          <option value="">Designation</option>
          <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
        </select>
      </div>

      <!-- Workers Grid -->
      <div
        v-if="filteredWorkers.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <WorkersCard
          v-for="worker in filteredWorkers"
          :key="worker.worker_id"
          :worker="worker"
          @edit="handleEditWorker"
          @delete="handleDeleteWorker"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white rounded-xl">
        <Users class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500 text-base">No workers found matching your search</p>
      </div>
    </div>

    <!-- Create/Edit Worker Modal -->
    <WorkerModals
      v-if="showModal"
      :show="showModal"
      :worker="selectedWorker"
      :is-editing="isEditing"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation Modal -->
    <ActionModal
      v-model="showDeleteModal"
      title="Delete Worker"
      message="Are you sure you want to delete this worker? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Search,
  Plus,
  List,
  Grid3x3,
  FileText,
  FileSpreadsheet,
  RefreshCw,
  ChevronUp
} from 'lucide-vue-next'
import { useWorkerStore } from '@/stores/workerStore'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useRoleStore } from '@/stores/roleStore'
import { useActionMessage } from '@/composable/useActionMessage'
import ActionModal from '@/components/ui/ActionModal.vue'
import WorkersCard from '@/components/workers/WorkersCard.vue'
import WorkerModals from '@/components/workers/WorkerModals.vue'

const { showSuccess, showError } = useActionMessage()

const store = useWorkerStore()
const enterpriseStore = useEntrepriseStore()
const roleStore = useRoleStore()

// State
const showModal = ref(false)
const searchTerm = ref('')
const filterDepartment = ref('')
const filterDesignation = ref('')
const isEditing = ref(false)
const selectedWorker = ref(null)
const showDeleteModal = ref(false)
const workerToDelete = ref(null)

// Load data on mount
onMounted(async () => {
  store.fetchAllWorkers()
  await roleStore.fetchRoles()
  await enterpriseStore.fetchEntreprises()
})

// Computed
const stats = computed(() => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))

  return {
    total: store.workers.length,
    active: store.workers.filter((w) => w.status === 'active').length,
    inactive: store.workers.filter((w) => w.status === 'inactive').length,
    newJoiners: store.workers.filter((w) => new Date(w.date_hired) >= thirtyDaysAgo).length,
  }
})

const departments = computed(() => {
  return [...new Set(store.workers.map((w) => w.entreprise_name).filter(Boolean))]
})

const positions = computed(() => {
  return [...new Set(store.workers.map((w) => w.position).filter(Boolean))]
})

const filteredWorkers = computed(() => {
  let workers = store.workers

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    workers = workers.filter(
      (worker) =>
        worker.name?.toLowerCase().includes(term) ||
        worker.email?.toLowerCase().includes(term) ||
        worker.position?.toLowerCase().includes(term)
    )
  }

  if (filterDepartment.value) {
    workers = workers.filter((w) => w.entreprise_name === filterDepartment.value)
  }

  if (filterDesignation.value) {
    workers = workers.filter((w) => w.position === filterDesignation.value)
  }

  return workers
})

// Methods
const handleEditWorker = (worker) => {
  isEditing.value = true
  selectedWorker.value = { ...worker }
  showModal.value = true
}

const handleSubmit = async (formData) => {
  try {
    if (isEditing.value) {
      const success = await store.updateWorker(formData.worker_id, formData)
      if (success) {
        showSuccess('Worker updated successfully!')
      } else {
        showError('Failed to update worker')
      }
    } else {
      const success = await store.addWorker(formData)
      if (success) {
        showSuccess('Worker created successfully!')
      } else {
        showError('Failed to create worker')
      }
    }
    closeModal()
  } catch (error) {
    console.error('Error saving worker:', error)
    showError('Error saving worker. Please try again.')
  }
}

const handleDeleteWorker = (workerId) => {
  workerToDelete.value = workerId
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    const success = await store.removeWorker(workerToDelete.value)
    if (success) {
      showSuccess('Worker deleted successfully!')
    } else {
      showError('Failed to delete worker')
    }
  } catch (error) {
    console.error('Error deleting worker:', error)
    showError('Failed to delete worker')
  } finally {
    showDeleteModal.value = false
    workerToDelete.value = null
  }
}

const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  selectedWorker.value = null
}
</script>
