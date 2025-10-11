<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="font-semibold text-gray-900">StockFlow</h1>
            <p class="text-xs text-gray-500">Enterprise Manager</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell class="w-5 h-5 text-gray-600" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings class="w-5 h-5 text-gray-600" />
          </button>
          <button><router-link to="/dashboard">dashboard</router-link></button>
          <router-link to="/workers" class="text-gray-400 hover:text-blue-600 transition">  <button class="text-gray-400 hover:text-blue-600 transition">workers</button></router-link>
          <div class="flex items-center gap-2 pl-4 border-l border-gray-200">
            <div class="text-right">



              <p class="text-sm font-semibold text-gray-900">Demo User</p>
              <p class="text-xs text-gray-500">demo@demo.com</p>
            </div>
            <div class="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              DU
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Welcome Section -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, Demo! 👋</h2>
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
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EnterpriseCard @view="handleOpenEnterprise" @edit="handleEditEnterprise" v-for="enterprise in filteredEntreprises" :key="enterprise.id" :enterprise="enterprise" />
      </div>
    </div>
    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 class="text-xl font-bold text-gray-900 mb-4"> {{ isEditing ? 'Edit enterprise' : 'Add new enterprise' }}</h2>
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
              @click="showCreateModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="createEntreprise"
               :disabled="isSubmitting"
              class="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
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
import { ref,onMounted,computed } from 'vue'
import { Building2, Heart, DollarSign, ShoppingCart, Users, Activity, Search, Plus, Filter, MoreVertical, BarChart3, Eye, Bell, Settings, LogOut } from 'lucide-vue-next'
import StatCard from '@/components/StatCard.vue'
import EnterpriseCard from '@/components/EnterpriseCard.vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useRouter } from 'vue-router'
const store = useEntrepriseStore()

// Charger les entreprises au montage
onMounted(async () => {
  await store.fetchEntreprises()

  // Définir la première entreprise comme active par défaut
  
})
// Supprimer une entreprise
const deleteEntreprise = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
    const success = await store.deleteEntreprise(id)
    if (success) {
      alert('Entreprise supprimée avec succès 🎉')
    }
  }
}

// Sélectionner une entreprise
const selectEntreprise = (entreprise) => {
  store.setActiveEntreprise(entreprise)
}
const isSubmitting = ref(false)
const isEditing = ref(false)
const enterprises = store.entreprises
console.log(enterprises)
const router = useRouter()
const searchQuery = ref('')
const showCreateModal = ref(false)
const entrepriseData = ref({ name: '', description: '', logo_url: '' })

const filteredEntreprises = computed(() => {
  if (!searchQuery.value) return store.entreprises
  return store.entreprises.filter(e =>
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
// Methods
const handleEditEnterprise = (enterprise) => {
  isEditing.value = true
  entrepriseData.value = { ...enterprise }
  showCreateModal.value = true
}

const handleOpenEnterprise =(enterprise)=>{
  console.log("clicked")
  selectEntreprise(enterprise)
  router.push('/clients')
}
const entreprisesWithUsers = computed(() => {
  return entreprises.value.filter(e => e.users > 0).length
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}


const createEntreprise = async () => {
  isSubmitting.value = true
  try {
  if (isEditing.value) {
    await store.updateEntreprise(entrepriseData.value.id, entrepriseData.value)
    alert("Edited successfully ✅")
  } else {
    await store.createEntreprise(entrepriseData.value)
    alert("Created successfully ✅")
  }
  closeModal()
} catch (error) {
  console.error(error)
  alert("Error creating or updating ❌")
} finally {
  isSubmitting.value = false
}



  }

  const closeModal=()=>{
    showCreateModal.value= false
    isEditing.value = false
    entrepriseData.value={
      name:'',
      description:'',
      logo_url:''
    }
  }


const stats = ref([
  { icon: Building2, label: 'Enterprises', value: '3', color: 'bg-blue-500' },
  { icon: Heart, label: 'Total Products', value: '2,790', color: 'bg-purple-500' },
  { icon: DollarSign, label: 'Total Revenue', value: '$370,000', color: 'bg-green-500' },
  { icon: ShoppingCart, label: 'Total Orders', value: '1,450', color: 'bg-orange-500' },
  { icon: Users, label: 'Team Members', value: '35', color: 'bg-cyan-500' },
  { icon: Activity, label: 'Avg Health', value: '84%', color: 'bg-pink-500' },
])
</script>
