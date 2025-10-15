[file name]: MainPage.vue [file content begin]
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
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
    <div v-else class="max-w-7xl mx-auto px-6 py-8">
      <!-- Welcome Section -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, {{ userName }}! 👋</h2>
          <p class="text-gray-600">Here's what's happening with your enterprises today</p>
        </div>
        <button
          class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <BarChart3 class="w-4 h-4" />
          <span class="text-sm font-semibold text-gray-700">Export Report</span>
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <StatCard v-for="(stat, idx) in stats" :key="idx" :stat="stat" />
      </div>

      <!-- Search and Filter Bar -->
      <div class="flex items-center justify-between mb-6">
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search enterprises..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="flex items-center gap-3">
          <button
            class="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Filter class="w-4 h-4" />
            <span class="text-sm">Filter: all</span>
          </button>
          <button
            @click="showCreateModal = true"
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Plus class="w-4 h-4" />
            Create Enterprise
          </button>
        </div>
      </div>

      <!-- Enterprise Cards Grid -->
      <div v-if="filteredEntreprises.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EnterpriseCard
          @view="handleOpenEnterprise"
          @edit="handleEditEnterprise"
          v-for="enterprise in filteredEntreprises"
          :key="enterprise.id"
          :enterprise="enterprise"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <Building2 class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No enterprises found</h3>
        <p class="text-gray-600 mb-6">Create your first enterprise to get started</p>
        <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Create Enterprise
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
    <h2 class="text-xl font-bold text-gray-900 mb-4">
      {{ isEditing ? 'Edit enterprise' : 'Add new enterprise' }}
    </h2>

    <div class="space-y-4">
      <!-- Nom -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input
          v-model="entrepriseData.name"
          type="text"
          placeholder="Nom de l'entreprise"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="entrepriseData.description"
          placeholder="Description de l'entreprise"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      <!-- Adresse -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
        <input
          v-model="entrepriseData.adresse"
          type="text"
          placeholder="Rue, numéro"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Ville -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
        <input
          v-model="entrepriseData.ville"
          type="text"
          placeholder="Ville"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Code postal -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
        <input
          v-model="entrepriseData.code_postal"
          type="text"
          placeholder="Code postal"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Logo -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
        <input
          v-model="entrepriseData.logo_url"
          type="text"
          placeholder="Lien vers le logo"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Numéro fiscal -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Numéro fiscal</label>
        <input
          v-model="entrepriseData.numero_fiscal"
          type="text"
          placeholder="Numéro fiscal / SIRET"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- NUI -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">NUI</label>
        <input
          v-model="entrepriseData.nui"
          type="text"
          placeholder="Numéro d’Identification Unique"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Email contact -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email contact</label>
        <input
          v-model="entrepriseData.email_contact"
          type="email"
          placeholder="Email du contact principal"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Téléphone contact -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone contact</label>
        <input
          v-model="entrepriseData.telephone_contact"
          type="text"
          placeholder="Téléphone du contact principal"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Informations bancaires -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Informations bancaires</label>
        <input
          v-model="entrepriseData.informations_bancaires"
          type="text"
          placeholder="IBAN / compte bancaire"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Boutons -->
      <div class="flex gap-3 mt-6">
        <button
          @click="closeModal"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="createEntreprise"
          :disabled="isSubmitting"
          class="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
import { ref, onMounted, computed } from 'vue'
import {
  Building2,
  Heart,
  DollarSign,
  ShoppingCart,
  Users,
  Activity,
  Search,
  Plus,
  Filter,
  BarChart3,
  Package,
  TrendingUp,
} from 'lucide-vue-next'
import StatCard from '@/components/StatCard.vue'
import EnterpriseCard from '@/components/EnterpriseCard.vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useActionMessage } from '@/composable/useActionMessage'
const { showSuccess, showError } = useActionMessage()
import LazyLoader from '@/components/ui/LazyLoader.vue'
const store = useEntrepriseStore()
const authStore = useAuthStore()
const router = useRouter()

// Reactive data
const isSubmitting = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const showCreateModal = ref(false)
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


// Computed properties
const userName = computed(() => {
  return authStore.user?.username || 'User'
})

const filteredEntreprises = computed(() => {
  if (!searchQuery.value) return store.entreprises
  return store.entreprises.filter(
    (e) =>
      e.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.description?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.category?.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const selectEntreprise = (entreprise) => {
  store.setActiveEntreprise(entreprise)
}
const loadingClients = ref(true)

// Calculate real stats from enterprises data
// Calculate real stats from enterprises data
const stats = computed(() => {
  const totalRevenue = store.entreprises.reduce((sum, e) => sum + (Number(e.totalRevenue) || 0), 0)
  const totalInventory = store.entreprises.reduce(
    (sum, e) => sum + (Number(e.inventoryValue) || 0),
    0,
  )
  const totalMembers = store.entreprises.reduce((sum, e) => sum + (Number(e.totalMembers) || 0), 0)

  return [
    {
      icon: Building2,
      label: 'Enterprises',
      value: store.entreprises.length.toString(),
      color: 'bg-blue-500',
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      color: 'bg-green-500',
    },
    {
      icon: Package,
      label: 'Inventory Value',
      value: `$${totalInventory.toLocaleString()}`,
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      label: 'Total Team',
      value: totalMembers.toString(),
      color: 'bg-orange-500',
    },
    {
      icon: Activity,
      label: 'Active',
      value: store.entreprises.length.toString(),
      color: 'bg-cyan-500',
    },
    {
      icon: TrendingUp,
      label: 'Avg Health',
      value: calculateAverageHealth(),
      color: 'bg-pink-500',
    },
  ]
})

// Methods
const handleEditEnterprise = (enterprise) => {
  isEditing.value = true
  entrepriseData.value = { ...enterprise }
  showCreateModal.value = true
}

const handleOpenEnterprise = (enterprise) => {
  console.log('clicked')
  selectEntreprise(enterprise)
  router.push(`/${store.activeEntreprise.uuid}/dashboar`)
}

const createEntreprise = async () => {
  isSubmitting.value = true
  try {
    if (isEditing.value) {
      const success = await store.updateEntreprise(entrepriseData.value.id, entrepriseData.value)
      if (success) {
        showSuccess('Enterprise updated succesfully')
      } else {
        showError('not updated')
      }
    } else {
      const success = await store.createEntreprise(entrepriseData.value)
      if (success) {
        showSuccess('Enterprise created successfully')
      } else {
        showError('Failed to create enterprise')
      }
    }
    closeModal()
  } catch (error) {
    console.error('Error creating/updating enterprise:', error)
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  isEditing.value = false
  entrepriseData.value = { name: '', description: '', category: '' }
}

// Helper function to calculate average health score
const calculateAverageHealth = () => {
  if (store.entreprises.length === 0) return '0%'

  const totalHealth = store.entreprises.reduce((sum, e) => {
    // Calculate health based on available data
    let health = 50 // Base health

    if (e.total_products > 0) health += 20
    if (e.total_revenue > 0) health += 20
    if (e.total_orders > 0) health += 10

    return sum + Math.min(health, 100)
  }, 0)

  const averageHealth = Math.round(totalHealth / store.entreprises.length)
  return `${averageHealth}%`
}

// Lifecycle
onMounted(async () => {
    loadingClients.value = true
    await new Promise((resolve) => setTimeout(resolve, 2000))
  await store.fetchEntreprises()
  loadingClients.value = false
})
</script>
[file content end]
