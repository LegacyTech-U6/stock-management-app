[file name]: MainPage.vue
[file content begin]
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Welcome Section -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, {{ userName }}! 👋</h2>
          <p class="text-gray-600">Here's what's happening with your enterprises today</p>
        </div>
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
          <button class="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Filter class="w-4 h-4" />
            <span class="text-sm">Filter: all</span>
          </button>
          <button @click="showCreateModal = true" class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
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
        <button @click="showCreateModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Create Enterprise
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 class="text-xl font-bold text-gray-900 mb-4">{{ isEditing ? 'Edit enterprise' : 'Add new enterprise' }}</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="entrepriseData.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="entrepriseData.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              v-model="entrepriseData.category"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Building2, Heart, DollarSign, ShoppingCart, Users, Activity, Search, Plus, Filter, BarChart3,Package,TrendingUp } from 'lucide-vue-next'
import StatCard from '@/components/StatCard.vue'
import EnterpriseCard from '@/components/EnterpriseCard.vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const store = useEntrepriseStore()
const authStore = useAuthStore()
const router = useRouter()

// Reactive data
const isSubmitting = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const showCreateModal = ref(false)
const entrepriseData = ref({ name: '', description: '', category: '' })

// Computed properties
const userName = computed(() => {
  return authStore.user?.username || 'User'
})

const filteredEntreprises = computed(() => {
  if (!searchQuery.value) return store.entreprises
  return store.entreprises.filter(e =>
    e.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    e.description?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    e.category?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectEntreprise = (entreprise) => {
  store.setActiveEntreprise(entreprise)
}

// Calculate real stats from enterprises data
// Calculate real stats from enterprises data
const stats = computed(() => {
  const totalRevenue = store.entreprises.reduce((sum, e) => sum + (Number(e.totalRevenue) || 0), 0)
  const totalInventory = store.entreprises.reduce((sum, e) => sum + (Number(e.inventoryValue) || 0), 0)
  const totalMembers = store.entreprises.reduce((sum, e) => sum + (Number(e.totalMembers) || 0), 0)
  
  return [
    { 
      icon: Building2, 
      label: 'Enterprises', 
      value: store.entreprises.length.toString(), 
      color: 'bg-blue-500' 
    },
    { 
      icon: DollarSign, 
      label: 'Total Revenue', 
      value: `$${totalRevenue.toLocaleString()}`, 
      color: 'bg-green-500' 
    },
    { 
      icon: Package, 
      label: 'Inventory Value', 
      value: `$${totalInventory.toLocaleString()}`, 
      color: 'bg-purple-500' 
    },
    { 
      icon: Users, 
      label: 'Total Team', 
      value: totalMembers.toString(), 
      color: 'bg-orange-500' 
    },
    { 
      icon: Activity, 
      label: 'Active', 
      value: store.entreprises.length.toString(), 
      color: 'bg-cyan-500' 
    },
    { 
      icon: TrendingUp, 
      label: 'Avg Health', 
      value: calculateAverageHealth(), 
      color: 'bg-pink-500' 
    },
  ]
})

// Methods
const handleEditEnterprise = (enterprise) => {
  isEditing.value = true
  entrepriseData.value = { ...enterprise }
  showCreateModal.value = true
}

const handleOpenEnterprise =(enterprise)=>{
  console.log("clicked")
  selectEntreprise(enterprise)
  router.push('/dashboar')
}

const createEntreprise = async () => {
  isSubmitting.value = true
  try {
    if (isEditing.value) {
      await store.updateEntreprise(entrepriseData.value.id, entrepriseData.value)
    } else {
      await store.createEntreprise(entrepriseData.value)
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
  await store.fetchEntreprises()
})
</script>
[file content end]