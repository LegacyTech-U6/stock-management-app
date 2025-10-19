<!-- MainPage.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
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

    <div v-else class="max-w-8xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <!-- Header -->
      <div class="mb-4 sm:mb-6">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Companies</h1>
        <p class="text-sm text-gray-500">Manage your companies</p>
      </div>

      <!-- Stats Grid Component -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
         <n-card
      v-for="(stat, idx) in stats"
      :key="idx"
      class="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
      :content-style="{ padding: '1.25rem 1.5rem' }"
    >
      <div class="flex items-center justify-between">
        <!-- Left section -->
        <div class="flex items-center gap-3">
          <div
            :class="[
              'w-12 h-12 flex items-center justify-center rounded-lg text-white shadow-sm',
              stat.bg,
            ]"
          >
            <n-icon :size="22">
              <component :is="stat.icon" />
            </n-icon>
          </div>
          <div>
            <p class="text-gray-500 text-sm font-medium">{{ stat.label }}</p>
            <p class="text-2xl font-semibold text-gray-800">{{ stat.value }}</p>
          </div>
        </div>

        <!-- Tiny chart -->
        <svg class="w-20 h-10 opacity-70" viewBox="0 0 80 40">
          <defs>
            <linearGradient :id="`gradient-${idx}`" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#ff7b54; stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:#ff7b54; stop-opacity:0" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="#ff7b54"
            stroke-width="2.5"
            points="0,25 15,20 30,23 45,15 60,17 75,12"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <polyline
            :fill="`url(#gradient-${idx})`"
            points="0,25 15,20 30,23 45,15 60,17 75,12 75,40 0,40"
          />
        </svg>
      </div>
    </n-card>
      </div>
      <div class="border rounded-xl border-gray-200">
                <!-- Controls Bar -->
      <div class="bg-white rounded-t-xl shadow-sm border border-gray-200 p-3 sm:p-4  ">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div class="flex-1">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
                class="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 bg-white transition-all"
              />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
              <span class="hidden sm:inline">Select Plan</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button class="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
              <span class="hidden sm:inline">Select Status</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button class="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
              <span class="hidden sm:inline">Sort By : Last 7 Days</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button class="p-2 sm:hidden bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
            <button
              @click="showCreateModal = true"
              class="px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all text-sm font-medium flex items-center gap-2 whitespace-nowrap"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="hidden sm:inline">Add Company</span>
              <span class="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      <!-- View Toggle - Mobile Only -->
      <div class="flex gap-2 mb-4 sm:hidden">
        <button
          @click="viewMode = 'grid'"
          :class="[
            'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            viewMode === 'grid'
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 border border-gray-200'
          ]"
        >
          Grid View
        </button>
        <button
          @click="viewMode = 'table'"
          :class="[
            'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            viewMode === 'table'
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 border border-gray-200'
          ]"
        >
          Table View
        </button>
      </div>

      <!-- Table View (Desktop by default, toggleable on mobile) -->
      <EnterpriseTable
        v-if="viewMode === 'table' || !isMobile"
        :enterprises="filteredEntreprises"
        @view="handleOpenEnterprise"
        @edit="handleEditEnterprise"
      />

      <!-- Grid View (Mobile only when selected) -->
      <EnterpriseGrid
        v-if="viewMode === 'grid' && isMobile"
        :enterprises="filteredEntreprises"
        @view="handleOpenEnterprise"
        @edit="handleEditEnterprise"
      />

      <!-- Empty State -->
      <div v-if="filteredEntreprises.length === 0" class="text-center py-12 sm:py-16">
        <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
        <p class="text-sm text-gray-600 mb-6">Create your first company to get started</p>
        <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all text-sm font-medium"
        >
          Add Company
        </button>
      </div>
      </div>


    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          {{ isEditing ? 'Edit Company' : 'Add New Company' }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Company Name *</label>
            <input
              v-model="entrepriseData.name"
              type="text"
              placeholder="Enter company name"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              v-model="entrepriseData.description"
              placeholder="Enter description"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
              rows="3"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1.5">City</label>
              <input
                v-model="entrepriseData.ville"
                type="text"
                placeholder="City"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1.5">Postal Code</label>
              <input
                v-model="entrepriseData.code_postal"
                type="text"
                placeholder="Postal code"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
            <input
              v-model="entrepriseData.email_contact"
              type="email"
              placeholder="company@email.com"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1.5">Phone</label>
            <input
              v-model="entrepriseData.telephone_contact"
              type="text"
              placeholder="Phone number"
              class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
            />
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="closeModal"
              class="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium"
            >
              Cancel
            </button>
            <button
              @click="createEntreprise"
              :disabled="isSubmitting"
              class="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import EnterpriseGrid from '@/components/Enterprise/EnterpriseGrid.vue'
import EnterpriseTable from '@/components/Enterprise/EnterpriseTable.vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useActionMessage } from '@/composable/useActionMessage'
import LazyLoader from '@/components/ui/LazyLoader.vue'
import StatsGrid from '@/components/Enterprise/StatsGrid.vue'
const { showSuccess, showError } = useActionMessage()
const store = useEntrepriseStore()
const authStore = useAuthStore()
const router = useRouter()

const isSubmitting = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const showCreateModal = ref(false)
const viewMode = ref('table')
const loadingClients = ref(true)
const isMobile = ref(window.innerWidth < 640)

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

const handleResize = () => {
  isMobile.value = window.innerWidth < 640
}

const getChartColor = (gradient) => {
  const colorMap = {
    'from-orange-400 to-orange-500': '#fb923c',
    'from-green-400 to-green-500': '#4ade80',
    'from-red-400 to-red-500': '#f87171',
    'from-cyan-400 to-cyan-500': '#22d3ee'
  }
  return colorMap[gradient] || '#fb923c'
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
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
      color: 'from-orange-400 to-orange-500',
      icon: 'building'
    },
    {
      label: 'Active Companies',
      value: (store.entreprises.length - 30).toString(),
      color: 'from-green-400 to-green-500',
      icon: 'check'
    },
    {
      label: 'Inactive Companies',
      value: '30',
      color: 'from-red-400 to-red-500',
      icon: 'x'
    },
    {
      label: 'Company Locations',
      value: '180',
      color: 'from-cyan-400 to-cyan-500',
      icon: 'location'
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
