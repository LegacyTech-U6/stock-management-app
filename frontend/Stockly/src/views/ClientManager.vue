<template>
  <div class="main">


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
   <div v-if="loadingClients">
  <LazyLoader :loading="loadingClients" :skeleton-count="6">
    <template #icon>
      <n-spin size="40" />
    </template>
    <template #message>
      <p class="text-lg font-semibold text-gray-800">Loading clients...</p>
    </template>
  </LazyLoader>
</div>


      <!-- Client Cards Grid -->
      <div
        v-else-if="filteredClients.length > 0"
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
      :open="showModal"
      :isEdit="isEditMode"
      :clientData="selectedClient"
      :loading="loading"
      :error="error"
      @close="handleCloseModal"
      @submit="handleSubmit"
    />


  </div>
  <ActionModal
    v-model="showDeleteModal"
    title="Delete Category"
    :message="`Are you sure you want to delete ${selectedClient?.client_name}? This action cannot be undone.`"
    confirm-text="Delete"
    cancel-text="Cancel"
    @confirm="confirmDelete"
  />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useClientStore } from '@/stores/clientStore';
import { useActionMessage } from '@/composable/useActionMessage';
import ClientCard from '@/components/clients/ClientCard.vue';
import FromModal from '../components/clients/FromModal.vue';
import ActionModal from '@/components/ui/ActionModal.vue';
import LazyLoader from '@/components/ui/LazyLoader.vue';

const { showSuccess, showError } = useActionMessage();
const clientStore = useClientStore();

const search = ref('');
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditMode = ref(false);
const selectedClient = ref(null);
const loading = ref(false);
const error = ref('');
const loadingClients = ref(true);

// Computed
const filteredClients = computed(() =>
  clientStore.clients.filter(client =>
    client.client_name?.toLowerCase().includes(search.value.toLowerCase()) ||
    client.email?.toLowerCase().includes(search.value.toLowerCase())
  )
);

// Methods
const handleAddClient = () => {
  isEditMode.value = false;
  selectedClient.value = null;
  showModal.value = true;
  error.value = '';
};

const handleEditClient = (client) => {
  isEditMode.value = true;
  selectedClient.value = client;
  showModal.value = true;
  error.value = '';
};

const handleCloseModal = () => {
  showModal.value = false;
  error.value = '';
};

const handleSubmit = async (formData) => {
  loading.value = true;
  error.value = '';

  try {
    if (isEditMode.value) {
      await clientStore.updateClient(selectedClient.value.id, formData);
      showSuccess('Client updated successfully!');
    } else {
      await clientStore.addClient(formData);
      showSuccess('Client created successfully!');
    }

    showModal.value = false;
    await clientStore.fetchClients();
  } catch (err) {
    error.value = err.response?.data?.message || 'Operation failed';
  } finally {
    loading.value = false;
  }
};

const handleDeleteClient = (client) => {
  selectedClient.value = client;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  try {
    await clientStore.deleteclient(selectedClient.value.id);
    showSuccess('Client deleted successfully!');
    await clientStore.fetchClients();
  } catch (err) {
    showError('Failed to delete client');
  } finally {
    showDeleteModal.value = false;
    selectedClient.value = null;
  }
};
// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Lifecycle
onMounted(async () => {
  loadingClients.value = true;
  await clientStore.fetchClients();
  loadingClients.value = false;
});
</script>
<style scoped>
/* Add any additional custom styles here if needed */
</style>
