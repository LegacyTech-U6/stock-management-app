<!-- MainPage.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
    <div v-if="loadingClients" class="max-w-7xl mx-auto">
      <LazyLoader :loading="loadingClients" :skeleton-count="6">
        <template #icon>
          <n-spin size="40" />
        </template>
        <template #message>
          <p class="text-lg font-semibold text-gray-800">Loading clients...</p>
        </template>
      </LazyLoader>
    </div>

    <div v-else class="max-w-8xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
        <p class="text-gray-600">Manage your companies</p>
      </div>

      <!-- Stats Grid Component -->
      <StatsGrid :stats="stats" class="mb-8" />

      <!-- Controls Bar -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-5 mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex-1 max-w-md">
            <div class="relative">
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search companies..."
                class="w-full pl-12 pr-4 py-3 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 bg-white/50 transition-all"
              />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="p-3 bg-white/80 border border-gray-200/50 rounded-xl hover:bg-white hover:shadow-sm transition-all">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button class="p-3 bg-white/80 border border-gray-200/50 rounded-xl hover:bg-white hover:shadow-sm transition-all">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
            <button
              @click="showCreateModal = true"
              class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all font-medium flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Company
            </button>
          </div>
        </div>
      </div>

      <!-- View Toggle -->
      <div class="flex gap-2 mb-6">
        <button
          @click="viewMode = 'grid'"
          :class="[
            'px-5 py-2.5 rounded-xl font-medium transition-all',
            viewMode === 'grid'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
              : 'bg-white/80 text-gray-700 border border-gray-200/50 hover:bg-white hover:shadow-sm'
          ]"
        >
          Grid View
        </button>
        <button
          @click="viewMode = 'table'"
          :class="[
            'px-5 py-2.5 rounded-xl font-medium transition-all',
            viewMode === 'table'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
              : 'bg-white/80 text-gray-700 border border-gray-200/50 hover:bg-white hover:shadow-sm'
          ]"
        >
          Table View
        </button>
      </div>

      <!-- Grid View -->
      <EnterpriseGrid
        v-if="viewMode === 'grid'"
        :enterprises="filteredEntreprises"
        @view="handleOpenEnterprise"
        @edit="handleEditEnterprise"
      />

      <!-- Table View -->
      <EnterpriseTable
        v-else
        :enterprises="filteredEntreprises"
        @view="handleOpenEnterprise"
        @edit="handleEditEnterprise"
      />

      <!-- Empty State -->
      <div v-if="filteredEntreprises.length === 0" class="text-center py-16">
        <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
        <p class="text-gray-600 mb-6">Create your first company to get started</p>
        <button
          @click="showCreateModal = true"
          class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all font-medium"
        >
          Add Company
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          {{ isEditing ? 'Edit Company' : 'Add New Company' }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
            <input
              v-model="entrepriseData.name"
              type="text"
              placeholder="Enter company name"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="entrepriseData.description"
              placeholder="Enter description"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              rows="3"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                v-model="entrepriseData.ville"
                type="text"
                placeholder="City"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input
                v-model="entrepriseData.code_postal"
                type="text"
                placeholder="Postal code"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="entrepriseData.email_contact"
              type="email"
              placeholder="company@email.com"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              v-model="entrepriseData.telephone_contact"
              type="text"
              placeholder="Phone number"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
            />
          </div>

          <div class="flex gap-3 mt-8">
            <button
              @click="closeModal"
              class="flex-1 px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              @click="createEntreprise"
              :disabled="isSubmitting"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all font-medium"
            >
              {{ isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StatsGrid from '@/components/Enterprise/StatsGrid.vue'
import EnterpriseGrid from '@/components/Enterprise/EnterpriseGrid.vue'
import EnterpriseTable from '@/components/Enterprise/EnterpriseTable.vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useActionMessage } from '@/composable/useActionMessage'
import LazyLoader from '@/components/ui/LazyLoader.vue'

const { showSuccess, showError } = useActionMessage()
const store = useEntrepriseStore()
const authStore = useAuthStore()
const router = useRouter()

const isSubmitting = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const showCreateModal = ref(false)
const viewMode = ref('grid')
const loadingClients = ref(true)

const entrepriseData = ref({
  name: '',
  description: '',
  adresse: '',
  ville: '',
  code_postal: '',
  logo_url: '',
  numero_fiscal: '',
  nui: '',
  email_contact: '',
  telephone_contact: '',
  informations_bancaires: '',
})

const userName = computed(() => {
  return authStore.user?.username || 'User'
})

const filteredEntreprises = computed(() => {
  if (!searchQuery.value) return store.entreprises
  return store.entreprises.filter(
    (e) =>
      e.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const stats = computed(() => {
  const totalRevenue = store.entreprises.reduce((sum, e) => sum + (Number(e.totalRevenue) || 0), 0)
  const totalInventory = store.entreprises.reduce((sum, e) => sum + (Number(e.inventoryValue) || 0), 0)
  const totalMembers = store.entreprises.reduce((sum, e) => sum + (Number(e.totalMembers) || 0), 0)

  return [
    {
      label: 'Total Companies',
      value: store.entreprises.length.toString(),
      color: 'from-orange-500 to-orange-600',
    },
    {
      label: 'Active Companies',
      value: (store.entreprises.length - 30).toString(),
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Inactive Companies',
      value: '30',
      color: 'from-red-500 to-red-600',
    },
    {
      label: 'Company Locations',
      value: '180',
      color: 'from-cyan-500 to-cyan-600',
    },
  ]
})

const handleEditEnterprise = (enterprise) => {
  isEditing.value = true
  entrepriseData.value = { ...enterprise }
  showCreateModal.value = true
}

const handleOpenEnterprise = (enterprise) => {
  store.setActiveEntreprise(enterprise)
  router.push(`/${store.activeEntreprise.uuid}/dashboar`)
}

const createEntreprise = async () => {
  isSubmitting.value = true
  try {
    if (isEditing.value) {
      const success = await store.updateEntreprise(entrepriseData.value.id, entrepriseData.value)
      if (success) {
        showSuccess('Company updated successfully')
      } else {
        showError('Failed to update company')
      }
    } else {
      const success = await store.createEntreprise(entrepriseData.value)
      if (success) {
        showSuccess('Company created successfully')
      } else {
        showError('Failed to create company')
      }
    }
    closeModal()
  } catch (error) {
    console.error('Error creating/updating company:', error)
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  isEditing.value = false
  entrepriseData.value = {
    name: '',
    description: '',
    adresse: '',
    ville: '',
    code_postal: '',
    logo_url: '',
    numero_fiscal: '',
    nui: '',
    email_contact: '',
    telephone_contact: '',
    informations_bancaires: '',
  }
}

onMounted(async () => {
  loadingClients.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))
  await store.fetchEntreprises()
  loadingClients.value = false
})
</script>
