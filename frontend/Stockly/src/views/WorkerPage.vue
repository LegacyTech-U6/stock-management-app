<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Worker Management</h1>
        <p class="text-gray-600">
          Manage your team members • {{ store.workers.length }} workers total
        </p>
      </div>

      <!-- Search and Add Button -->
      <div class="flex gap-4 mb-6">
        <div class="flex-1 relative">
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
            class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg p-6 border border-gray-200">
          <div class="flex items-center gap-3 mb-2">
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
            <span class="text-gray-600 text-sm">Total Workers</span>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ stats.total }}</div>
        </div>

        <div class="bg-white rounded-lg p-6 border border-gray-200">
          <div class="flex items-center gap-3 mb-2">
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
            <span class="text-gray-600 text-sm">Active Workers</span>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ stats.active }}</div>
        </div>

        <div class="bg-white rounded-lg p-6 border border-gray-200">
          <div class="flex items-center gap-3 mb-2">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-gray-600 text-sm">Inactive Workers</span>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ stats.inactive }}</div>
        </div>

        <div class="bg-white rounded-lg p-6 border border-gray-200">
          <div class="flex items-center gap-3 mb-2">
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span class="text-gray-600 text-sm">Departments</span>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ stats.departments }}</div>
        </div>
      </div>

      <!-- Worker Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="worker in filteredWorkers"
          :key="worker.id"
          class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition"
        >
          <!-- Card Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg',
                  getColorForWorker(worker.worker_id),
                ]"
              >
                {{ worker?.name .charAt(0)}}
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ worker?.name }}</h3>
                <p class="text-sm text-gray-500">{{ worker?.position }}</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="text-gray-400 hover:text-blue-600 transition">
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
                @click="handleDeleteWorker(worker.id)"
                class="text-gray-400 hover:text-red-600 transition"
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
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span class="font-medium">Email:</span>
              <span class="truncate">{{ worker.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span class="font-medium">Department:</span>
              <span>{{ worker.entreprise_name }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span class="font-medium">Hired:</span>
              <span>{{ formatDate(worker.date_hired) }}</span>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <span
              :class="['px-3 py-1 rounded-full text-xs font-medium', statusColors[worker.status]]"
            >
              {{ worker.status.charAt(0).toUpperCase() + worker.status.slice(1) }}
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
        </div>
      </div>

      <div v-if="filteredWorkers.length === 0" class="text-center py-12">
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
        <p class="text-gray-500">No workers found matching your search</p>
      </div>
    </div>

    <!-- Create Worker Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Add New Worker</h2>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-600 transition">
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

        <form @submit.prevent="handleCreateWorker">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                v-model="newWorker.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                v-model="newWorker.email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john.doe@company.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Position *</label>
              <input
                type="text"
                required
                v-model="newWorker.position"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Department *</label>
              <select
                required
                v-model="newWorker.department"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                required
                v-model="newWorker.date_of_birth"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date Hired *</label>
              <input
                type="date"
                required
                v-model="newWorker.date_hired"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                required
                v-model="newWorker.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div class="flex gap-3 justify-end">
            <button
              type="button"
              @click="showModal = false"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Create Worker
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWorkerStore } from '@/stores/workerStore'
// -----------------------------
// State
// -----------------------------
const store = useWorkerStore()

onMounted(async () => {
  await store.fetchAllWorkers()
})

const showModal = ref(false)
const searchTerm = ref('')
const newWorker = ref({
  name: '',
  email: '',
  date_of_birth: '',
  position: '',
  date_hired: '',
  status: 'active',
  department: '',
})


// -----------------------------
// Computed
// -----------------------------
const stats = computed(() => ({
  total: store.workers.length,
  active: store.workers.filter((w) => w.status === 'active').length,
  inactive: store.workers.filter((w) => w.status === 'inactive').length,
  departments: [...new Set(store.workers.map((w) => w.department))].length,
}))

const filteredWorkers = computed(() =>{
  if (!searchTerm.value) return store.workers
  return store.workers.filter(worker =>
    worker.id.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    worker.position.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

// -----------------------------
// Methods
// -----------------------------
function handleCreateWorker() {

    try {
    store.addWorker(newWorker.value)
    alert("created succesfully")
  } catch (error) {
    console.error(error)
    alert("erros creating")

  }finally{
    showModal.value = false
  }

}

function handleDeleteWorker(id) {
  workers.value = workers.value.filter((w) => w.id !== id)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
const statusColors = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  suspended: 'bg-red-100 text-red-700',
}

const departmentColors = {
  Engineering: 'bg-blue-500',
  Product: 'bg-green-500',
  Design: 'bg-purple-500',
  Marketing: 'bg-orange-500',
  Sales: 'bg-pink-500',
  HR: 'bg-indigo-500',
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
  'bg-cyan-500'
]
// Simple hash to always map worker.id → same color
function getColorForWorker(workerId) {
  let hash = 0
  const str = workerId.toString()

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash % colors.length)
  return colors[index]
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
<!-- id: 1,
      name: 'John Anderson',
      email: 'john.anderson@company.com',
      position: 'Senior Developer',
      date_of_birth: '1990-05-15',
      date_hired: '2020-01-15',
      status: 'active',
      department: 'Engineering' -->
