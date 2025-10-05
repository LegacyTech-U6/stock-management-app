<template>
  <div class="min-h-screen pt-10 bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
    <div class="space-y-6">
      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Client Management</h1>
          <p class="text-sm text-gray-500 mt-1">Manage your customer database</p>
        </div>
        <div class="flex gap-3">
          <button
            @click="handleBackToSales"
            class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-sm"
          >
            Back to Sales
          </button>
          <button
            @click="handleAddClient"
            class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium text-sm flex items-center gap-2"
          >
            <span class="text-lg leading-none">+</span>
            Add Client
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total Clients -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <UserGroupIcon />
            </div>
            <span class="text-xs font-medium text-gray-600">Total Clients</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{{ clientStore.clients.length }}</div>
        </div>

        <!-- Active Clients -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
              <TickIcon />
            </div>
            <span class="text-xs font-medium text-gray-600">Active Clients</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{{ activeClientsCount }}</div>
        </div>

        <!-- Total Revenue -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
              <DollarIcon />
            </div>
            <span class="text-xs font-medium text-gray-600">Total Revenue</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalRevenue) }}</div>
        </div>

        <!-- Avg Order Value -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
              <GraphIcon />
            </div>
            <span class="text-xs font-medium text-gray-600">Avg Order Value</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{{ formatCurrency(avgOrderValue) }}</div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search clients by name, email, or company..."
          class="w-full outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
          v-model="search"
        />
        <span v-if="search" class="text-xs text-gray-500">
          {{ filteredClients.length }} result{{ filteredClients.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Client Cards Grid -->
      <div
        v-if="filteredClients.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-8"
      >
        <ClientCard
          v-for="client in filteredClients"
          :key="client.id"
          :client="client"
          @edit="handleEditClient"
          @delete="handleDeleteClient"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div
          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <EmptyStateIcon />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ search ? 'No clients found' : 'No clients yet' }}
        </h3>
        <p class="text-sm text-gray-500 mb-6">
          {{
            search ? 'Try adjusting your search terms' : 'Get started by adding your first client'
          }}
        </p>
        <button
          v-if="!search"
          @click="handleAddClient"
          class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium text-sm inline-flex items-center gap-2"
        >
          <span class="text-lg leading-none">+</span>
          Add Your First Client
        </button>
        <button
          v-else
          @click="search = ''"
          class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium text-sm"
        >
          Clear Search
        </button>
      </div>
    </div>
    <FromModal
      :open="clientStore.isFormOpen"
      :form="clientStore.clientForm"
      @submit="handleSubmit"
      @close="clientStore.fermerFormulaire"
    />
  </div>
</template>

<script setup lang="ts">
import DollarIcon from '@/assets/icon svg/DollarIcon.vue'
import EmptyStateIcon from '@/assets/icon svg/EmptyStateIcon.vue'
import GraphIcon from '@/assets/icon svg/GraphIcon.vue'
import SearchIcon from '@/assets/icon svg/SearchIcon.vue'
import TickIcon from '@/assets/icon svg/TickIcon.vue'
import UserGroupIcon from '@/assets/icon svg/userGroupIcon.vue'
import ClientCard from '@/components/clients/ClientCard.vue'
import FromModal from '../components/clients/FromModal.vue'
import { useClientStore } from '@/stores/clientStore'
import { onMounted, ref, computed } from 'vue'

const clientStore = useClientStore()
const search = ref('')

onMounted(async () => {
  await clientStore.fetchClients()
})

// Filtered clients based on search
const filteredClients = computed(() =>
  clientStore.clients.filter(
    (c) =>
      c.client_name?.toLowerCase().includes(search.value.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.value.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

// Active clients count
const activeClientsCount = computed(
  () => clientStore.clients.filter((c) => (c.status || 'active').toLowerCase() === 'active').length,
)

// Total revenue calculation
const totalRevenue = computed(() =>
  clientStore.clients.reduce((sum, client) => sum + (client.totalSpent || 0), 0),
)

// Average order value calculation
const avgOrderValue = computed(() => {
  const totalOrders = clientStore.clients.reduce(
    (sum, client) => sum + (client.totalOrders || 0),
    0,
  )
  return totalOrders > 0 ? totalRevenue.value / totalOrders : 0
})

// Format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Event handlers
const handleBackToSales = () => {
  // Navigate back to sales page
  // Example: router.push('/sales')
  console.log('Navigate to sales')
}

const handleAddClient = () => {
  // Open add client modal/form
  clientStore.ouvrirFormulaire()
  console.log('Open add client modal')
}
const handleSubmit = async () => {
  try {
    await clientStore.addClient();

  } catch (error) {
   throw error
  }
};

const handleEditClient = (client: any) => {
  // Open edit client modal/form

  console.log('Edit client:', client)
}

const handleDeleteClient = (client: any) => {
  // Show confirmation dialog and delete
  if (confirm(`Are you sure you want to delete ${client.client_name}?`)) {
    // clientStore.deleteClient(client.id)
    console.log('Delete client:', client)
  }
}
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
