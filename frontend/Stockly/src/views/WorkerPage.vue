<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Worker Management</h1>
          <p class="text-gray-600">
            Manage your team members •
            <span class="font-semibold">{{ store.workers.length }}</span> workers total
          </p>
        </div>
        <button
          @click="showModal = true"
          class="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2 font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Worker
        </button>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search workers..."
            v-model="searchTerm"
            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-sm transition">
          <div class="flex items-center gap-3 mb-3">
            <svg
              class="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span class="text-gray-600 text-sm font-medium">Total Workers</span>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ stats.total }}</div>
        </div>

        <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-sm transition">
          <div class="flex items-center gap-3 mb-3">
            <svg
              class="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-gray-600 text-sm font-medium">Active Workers</span>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ stats.active }}</div>
        </div>

        <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-sm transition">
          <div class="flex items-center gap-3 mb-3">
            <svg
              class="w-5 h-5 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-gray-600 text-sm font-medium">Inactive Workers</span>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ stats.inactive }}</div>
        </div>

        <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-sm transition">
          <div class="flex items-center gap-3 mb-3">
            <svg
              class="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
              />
            </svg>
            <span class="text-gray-600 text-sm font-medium">Departments</span>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ stats.departments }}</div>
        </div>
      </div>

      <!-- Workers Grid -->
      <div
        v-if="filteredWorkers.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="worker in filteredWorkers"
          :key="worker.id"
          class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition"
        >
          <!-- Card Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3 flex-1">
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0',
                  getColorForWorker(worker.worker_id),
                ]"
              >
                {{ worker?.name?.charAt(0)?.toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 truncate">{{ worker?.name }}</h3>
                <p class="text-xs text-gray-500 truncate">{{ worker?.position }}</p>
              </div>
            </div>
            <div class="flex gap-1 flex-shrink-0">
              <button
                @click="handleEditWorker(worker)"
                class="p-2 text-gray-400 hover:text-blue-600 transition rounded hover:bg-blue-50"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="handleDeleteWorker(worker.worker_id)"
                class="p-2 text-gray-400 hover:text-red-600 transition rounded hover:bg-red-50"
                title="Delete"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Card Body -->
          <div class="space-y-3 mb-4">
            <div class="flex items-start gap-2 text-sm">
              <span class="text-gray-500 font-medium min-w-fit">Email:</span>
              <span class="text-gray-700 truncate">{{ worker.email }}</span>
            </div>
            <div class="flex items-start gap-2 text-sm">
              <span class="text-gray-500 font-medium min-w-fit">Department:</span>
              <span class="text-gray-700">{{ worker.entreprise_name }}</span>
            </div>
            <div class="flex items-start gap-2 text-sm">
              <span class="text-gray-500 font-medium min-w-fit">Hired:</span>
              <span class="text-gray-700">{{ formatDate(worker.date_hired) }}</span>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <span
              :class="['px-3 py-1 rounded-full text-xs font-medium', statusColors[worker.status]]"
            >
              {{ worker.status?.charAt(0).toUpperCase() + worker.status?.slice(1) }}
            </span>
            <span
              :class="[
                'px-2 py-1 rounded text-xs font-medium text-white',
                getColorForWorker(worker.entreprise_id) || 'bg-gray-500',
              ]"
            >
              {{ worker.entreprise_name }}
            </span>
          </div>

          <!-- Stats Row -->
          <div class="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <span>ID: {{ worker.worker_id }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg
          class="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <p class="text-gray-500 text-lg">No workers found matching your search</p>
      </div>
    </div>

    <!-- Create/Edit Worker Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ isEditing ? 'Edit Worker' : 'Add New Worker' }}
          </h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Full Name *</label>
            <input
              v-model="formWorker.name"
              type="text"
              placeholder="Enter full name"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Email *</label>
            <input
              v-model="formWorker.email"
              type="email"
              placeholder="Enter email"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <!-- Position -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Position</label>
            <input
              v-model="formWorker.position"
              type="text"
              placeholder="e.g. Frontend Developer"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <!-- Date Hired -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Date Hired</label>
            <input
              v-model="formWorker.date_hired"
              type="date"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <!-- Role -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Role *</label>
            <select
              v-model="formWorker.role_id"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a role</option>
              <option v-for="role in roleStore.roles" :key="role.id" :value="role.id">
                {{ role.name }}
              </option>
            </select>
          </div>

          <!-- Department -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Department</label>
            <select
              v-model="formWorker.entreprise_id"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a department</option>
              <option
                v-for="enterprise in enterpriseStore.entreprises"
                :key="enterprise.id"
                :value="enterprise.id"
              >
                {{ enterprise.name }}
              </option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Status</label>
            <select
              v-model="formWorker.status"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <!-- Password (only for new workers) -->
          <div v-if="!isEditing">
            <label class="block text-gray-700 font-medium mb-2">Password *</label>
            <input
              v-model="formWorker.password"
              type="password"
              placeholder="Enter password"
              class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-3 mt-8">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ActionModal
    v-model="showDeleteModal"
    title="Delete Worker"
    message="Are you sure you want to delete this worker? This action cannot be undone."
    confirm-text="Delete"
    cancel-text="Cancel"
    @confirm="confirmDelete"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkerStore } from '@/stores/workerStore'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useRoleStore } from '@/stores/roleStore'
import { useActionMessage } from '@/composable/useActionMessage'
import ActionModal from '@/components/ui/ActionModal.vue'
const { showSuccess, showError } = useActionMessage()
const router = useRouter()
const store = useWorkerStore()
const enterpriseStore = useEntrepriseStore()
const roleStore = useRoleStore()

// State
const showModal = ref(false)
const searchTerm = ref('')
const isSubmitting = ref(false)
const isEditing = ref(false)

const formWorker = ref({
  name: '',
  email: '',
  position: '',
  date_hired: '',
  status: 'active',
  entreprise_id: '',
  password: '',
  role_id: ''
})

// Load data on mount
onMounted(async () => {
  await store.fetchAllWorkers()
  await roleStore.fetchRoles()
  await enterpriseStore.fetchEntreprises()
})

// Computed
const stats = computed(() => ({
  total: store.workers.length,
  active: store.workers.filter((w) => w.status === 'active').length,
  inactive: store.workers.filter((w) => w.status === 'inactive').length,
  departments: [...new Set(store.workers.map((w) => w.entreprise_id))].length,
}))

const filteredWorkers = computed(() => {
  if (!searchTerm.value) return store.workers
  const term = searchTerm.value.toLowerCase()
  return store.workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(term) ||
      worker.email.toLowerCase().includes(term) ||
      worker.position.toLowerCase().includes(term)
  )
})

// Methods
const handleEditWorker = (worker) => {
  isEditing.value = true
  formWorker.value = { ...worker }
  showModal.value = true
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    if (isEditing.value) {
     const success = await store.updateWorker(formWorker.value.worker_id, formWorker.value)
      if (success) {
        showSuccess('Worker updated successfully!')
      } else {
        showError('Failed to update worker')
      }
    } else {

     const success = await store.addWorker(formWorker.value)
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
  } finally {
    isSubmitting.value = false
  }
}
const showDeleteModal = ref(false)
const workerToDelete = ref(null)
const handleDeleteWorker = (workerId) => {
  workerToDelete.value = workerId
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
   const successfully = await workerStore.removeWorker(workerToDelete.value)
    await workerStore.fetchWorkers()
    if (successfully) {
      showSuccess('Worker deleted successfully!')
    } else {
      showError('Failed to delete worker')
    }
  } catch (error) {
    console.error('Error deleting worker:', error)
    showError('Failed to delete worker')
  } finally {
    showDeleteModal.value = false
    categoryToDelete.value = null
  }
}


const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  formWorker.value = {
    name: '',
    email: '',
    position: '',
    date_hired: '',
    status: 'active',
    entreprise_id: '',
    password: '',
    role_id: ''
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const statusColors = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  suspended: 'bg-red-100 text-red-700',
}

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-teal-500',
  'bg-cyan-500',
]

const getColorForWorker = (workerId) => {
  let hash = 0
  const str = workerId?.toString() || ''

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash % colors.length)
  return colors[index]
}





</script>
