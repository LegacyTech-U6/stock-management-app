<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="px-8 py-8 border-b border-gray-200 bg-white">
      <div class="max-w-7xl mx-auto flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Entreprise Management</h1>
          <p class="text-gray-600 mt-1">Manage all your entreprises • {{ entreprises.length }} entreprises total</p>
        </div>
        <button
          @click="showCreateModal = true"
          class="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
        >
          <span>+</span> Add Entreprise
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-8">
      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative">
          <svg class="absolute left-3 top-3 text-gray-400" width="20" height="20" fill="none" stroke="currentColor">
            <circle cx="9" cy="9" r="8"></circle>
            <path d="m14 14 4 4"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search entreprises..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <div class="flex items-center gap-3">
            <svg class="text-gray-400" width="24" height="24" fill="none" stroke="currentColor">
              <path d="M4 4h16v12H4z"></path>
              <path d="M4 16h5v3H4z"></path>
              <path d="M10 16h5v3h-5z"></path>
              <path d="M16 16h5v3h-5z"></path>
            </svg>
            <div>
              <p class="text-gray-600 text-sm">Total Entreprises</p>
              <p class="text-2xl font-bold text-gray-900">{{ entreprises.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <div class="flex items-center gap-3">
            <svg class="text-blue-400" width="24" height="24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
            </svg>
            <div>
              <p class="text-gray-600 text-sm">Active Entreprises</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeEntreprisesCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <div class="flex items-center gap-3">
            <svg class="text-green-400" width="24" height="24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m8 12 2 2 4-4"></path>
            </svg>
            <div>
              <p class="text-gray-600 text-sm">With Users</p>
              <p class="text-2xl font-bold text-gray-900">{{ entreprisesWithUsers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <div class="flex items-center gap-3">
            <svg class="text-yellow-400" width="24" height="24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <div>
              <p class="text-gray-600 text-sm">Inactive</p>
              <p class="text-2xl font-bold text-gray-900">{{ inactiveEntreprisesCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Entreprises Grid -->
      <div v-if="filteredEntreprises.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="entreprise in filteredEntreprises"
          :key="entreprise.id"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <!-- Color Indicator -->
          <div
            :style="{ backgroundColor: entreprise.color }"
            class="h-1 w-full"
          ></div>

          <!-- Card Content -->
          <div class="p-6">
            <!-- Title and Description -->
            <div class="mb-4">
              <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span :style="{ color: entreprise.color }" class="text-2xl">●</span>
                {{ entreprise.name }}
              </h3>
              <p class="text-gray-600 text-sm mt-1">{{ entreprise.description }}</p>
            </div>

            <!-- Info -->
            <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div class="flex items-center gap-1">
                <svg width="16" height="16" fill="none" stroke="currentColor">
                  <path d="M8 1v6m0 4v4M1 8h6m4 0h6"></path>
                </svg>
                <span>{{ entreprise.users }} users</span>
              </div>
              <span>•</span>
              <span>Created {{ formatDate(entreprise.created) }}</span>
              <span v-if="entreprise.active" class="ml-auto">
                <span class="inline-block w-2 h-2 rounded-full" :style="{ backgroundColor: entreprise.color }"></span>
                <span class="ml-1 text-xs font-semibold" :style="{ color: entreprise.color }">Active</span>
              </span>
            </div>

            <!-- Badge -->
            <div class="mb-4">
              <span
                :style="{ backgroundColor: entreprise.color + '20', color: entreprise.color }"
                class="inline-block px-2 py-1 rounded text-xs font-semibold"
              >
                {{ entreprise.category }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button
                @click="editEntreprise(entreprise)"
                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors border border-gray-200"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor">
                  <path d="m11 4 1-1a2 2 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.828l-1 1M3 14H1v-2l8.586-8.586"></path>
                </svg>
                Edit
              </button>
              <button
                @click="deleteEntreprise(entreprise.id)"
                class="flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors border border-gray-200"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor">
                  <path d="M3 6h12M8 3v14M5 6l1 8c0 1 1 2 2 2h4c1 0 2-1 2-2l1-8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-gray-600">No entreprises found</p>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Add New Entreprise</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="newEntreprise.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="newEntreprise.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              v-model="newEntreprise.category"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex gap-3 mt-6">
            <button
              @click="showCreateModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="createEntreprise"
              class="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const entreprises = ref([
  {
    id: 1,
    name: 'Tech Solutions',
    description: 'Software development and IT services',
    category: 'Technology',
    users: 12,
    created: '2024-01-15',
    active: true,
    color: '#3B82F6'
  },
  {
    id: 2,
    name: 'Design Studio',
    description: 'Creative design and branding services',
    category: 'Design',
    users: 8,
    created: '2024-02-10',
    active: true,
    color: '#10B981'
  },
  {
    id: 3,
    name: 'Marketing Pro',
    description: 'Digital marketing and advertising',
    category: 'Marketing',
    users: 6,
    created: '2024-01-20',
    active: false,
    color: '#F59E0B'
  },
  {
    id: 4,
    name: 'Finance Corp',
    description: 'Financial consulting and planning',
    category: 'Finance',
    users: 15,
    created: '2023-12-05',
    active: true,
    color: '#8B5CF6'
  }
])

const searchQuery = ref('')
const showCreateModal = ref(false)
const newEntreprise = ref({ name: '', description: '', category: '' })

const filteredEntreprises = computed(() => {
  if (!searchQuery.value) return entreprises.value
  return entreprises.value.filter(e =>
    e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const activeEntreprisesCount = computed(() => {
  return entreprises.value.filter(e => e.active).length
})

const inactiveEntreprisesCount = computed(() => {
  return entreprises.value.filter(e => !e.active).length
})

const entreprisesWithUsers = computed(() => {
  return entreprises.value.filter(e => e.users > 0).length
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const createEntreprise = () => {
  if (newEntreprise.value.name) {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444']
    entreprises.value.push({
      id: Math.max(...entreprises.value.map(e => e.id)) + 1,
      ...newEntreprise.value,
      users: 0,
      created: new Date().toISOString().split('T')[0],
      active: true,
      color: colors[Math.floor(Math.random() * colors.length)]
    })
    newEntreprise.value = { name: '', description: '', category: '' }
    showCreateModal.value = false
  }
}

const editEntreprise = (entreprise) => {
  console.log('Edit entreprise:', entreprise)
}

const deleteEntreprise = (id) => {
  if (confirm('Are you sure you want to delete this entreprise?')) {
    entreprises.value = entreprises.value.filter(e => e.id !== id)
  }
}
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
