<template>
  <div class="min-h-screen bg-gray-50">
    <n-config-provider :theme-overrides="themeOverrides">
      <!-- Header Section -->
      <div class=" border-gray-200 px-8  mx-auto py-5">
        <div class="flex justify-between items-center max-w-8xl mx-auto flex-col md:flex-row gap-4 md:gap-0">
          <div class="flex flex-col gap-1">
            <n-text class="text-2xl font-semibold text-gray-900">Customers</n-text>
            <n-text depth="3" class="text-sm text-gray-500">Manage your customers</n-text>
          </div>

          <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <n-button quaternary circle @click="exportPDF" :focusable="false" class="w-10 h-10">
              <template #icon>
                <n-icon :component="FileText" size="20" color="#ef4444" />
              </template>
            </n-button>

            <n-button quaternary circle @click="exportExcel" :focusable="false" class="w-10 h-10">
              <template #icon>
                <n-icon :component="FileSpreadsheet" size="20" color="#10b981" />
              </template>
            </n-button>

            <n-button quaternary circle @click="handleRefresh" :focusable="false" class="w-10 h-10">
              <template #icon>
                <n-icon :component="RefreshCw" size="20" />
              </template>
            </n-button>

            <n-button type="success" @click="handleAddClient" :focusable="false"
              class="h-10 px-5 font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md">
              <template #icon>
                <n-icon :component="Plus" />
              </template>
              Add Customer
            </n-button>
          </div>
        </div>
      </div>

      <div class="max-w-8xl mx-auto px-8 py-6">
        <!-- Search and Filter Bar -->
        <n-card :bordered="false" class="border border-gray-100 shadow-sm">
          <div class="flex flex-col md:flex-row gap-4 items-center">
            <n-input v-model:value="search" placeholder="Search" class="flex-1 max-w-[300px] w-full" clearable
              :input-props="{ autocomplete: 'off' }">
              <template #prefix>
                <n-icon :component="Search" />
              </template>
            </n-input>

            <n-select v-model:value="statusFilter" :options="statusOptions" placeholder="Status"
              class="w-full md:w-[200px]" clearable />
          </div>
        </n-card>

        <!-- Loading State -->
        <div v-if="loadingClients"
          class="flex justify-center items-center min-h-[400px] bg-white rounded-lg shadow-sm mt-6">
          <n-space vertical align="center" :size="24">
            <n-spin size="large" />
            <n-text depth="3">Loading customers...</n-text>
          </n-space>
        </div>

        <!-- Client Table -->
        <n-card v-else-if="filteredClients.length > 0" :bordered="false" class="shadow-sm mt-6">
          <n-data-table :columns="columns" :data="paginatedClients" :bordered="false" :single-line="false"
            class="text-sm" />

          <!-- Pagination -->
          <div class="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <div class="flex items-center gap-3">
              <n-text depth="3">Row Per Page</n-text>
              <n-select v-model:value="pageSize" :options="pageSizeOptions" size="small" class="w-20" />
              <n-text depth="3">Entries</n-text>
            </div>

            <n-pagination v-model:page="currentPage" :page-count="pageCount" :page-slot="5" />
          </div>
        </n-card>

        <!-- Empty State -->
        <n-card v-else :bordered="false" class="shadow-sm mt-6">
          <n-empty class="py-16 px-6" :description="search ? 'No customers found' : 'No customers yet'" size="large">
            <template #icon>
              <n-icon size="64" :component="Inbox" />
            </template>
            <template #extra>
              <n-space vertical :size="12" align="center">
                <n-text depth="3">
                  {{ search ? 'Try adjusting your search terms' : 'Get started by adding your first customer' }}
                </n-text>
                <n-button v-if="!search" type="success" @click="handleAddClient" size="large"
                  class="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <template #icon>
                    <n-icon :component="Plus" />
                  </template>
                  Add Your First Customer
                </n-button>
                <n-button v-else @click="search = ''" size="large" class="bg-gray-100 hover:bg-gray-200">
                  Clear Search
                </n-button>
              </n-space>
            </template>
          </n-empty>
        </n-card>
      </div>

      <!-- Modals -->
      <FromModal :open="showModal" :isEdit="isEditMode" :clientData="selectedClient" :loading="loading" :error="error"
        @close="handleCloseModal" @submit="handleSubmit" />

      <n-modal v-model:show="showDeleteModal" preset="dialog" title="Delete Customer" :positive-text="'Delete'"
        :negative-text="'Cancel'" @positive-click="confirmDelete">
        <n-space vertical :size="16">
          <n-alert type="warning" :show-icon="true">
            This action cannot be undone
          </n-alert>
          <n-text>
            Are you sure you want to delete
            <n-text strong>{{ selectedClient?.client_name }}</n-text>?
          </n-text>
        </n-space>
      </n-modal>
    </n-config-provider>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, h } from 'vue';
import {
  NConfigProvider, NCard, NButton, NIcon, NSpace, NText,
  NInput, NSpin, NEmpty, NSelect, NModal, NAlert, NDataTable,
  NPagination, NAvatar, NTag
} from 'naive-ui';
import {
  Users, Search, Plus, Inbox, FileText, FileSpreadsheet,
  RefreshCw, Eye, Edit2, Trash2
} from 'lucide-vue-next';
import { useClientStore } from '@/stores/clientStore';
import { useActionMessage } from '@/composable/useActionMessage';
import FromModal from '../components/clients/FromModal.vue';

const { showSuccess, showError } = useActionMessage();
const clientStore = useClientStore();

// Theme customization with green primary
const themeOverrides = {
  common: {
    primaryColor: '#10b981',
    primaryColorHover: '#059669',
    primaryColorPressed: '#047857',
    successColor: '#10b981',
    successColorHover: '#059669',
    successColorPressed: '#047857',
    borderRadius: '8px',
    borderRadiusSmall: '6px',
  },
  Button: {
    borderRadiusMedium: '8px',
    textColorSuccess: '#ffffff',
  },
  Input: {
    borderRadius: '8px',
  },
  Card: {
    borderRadius: '8px',
  },
  DataTable: {
    thColor: '#f9fafb',
    borderColor: '#f3f4f6',
  }
};

// State
const search = ref('');
const statusFilter = ref(null);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditMode = ref(false);
const selectedClient = ref(null);
const loading = ref(false);
const error = ref('');
const loadingClients = ref(true);
const currentPage = ref(1);
const pageSize = ref(10);

// Options
const statusOptions = [
  { label: 'All Status', value: null },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' }
];

const pageSizeOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 }
];

// Helper functions
const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (name) => {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Table columns
const columns = [
  {
    title: 'Code',
    key: 'client_signature',
    width: 100,
  },
  {
    title: 'Customer',
    key: 'customer',
    render: (row) => {
      return h('div', { class: 'customer-cell' }, [
        h(NAvatar, {
          size: 32,
          round: true,
          style: { backgroundColor: getAvatarColor(row.client_name) }
        }, {
          default: () => getInitials(row.client_name)
        }),
        h('span', { class: 'customer-name' }, row.client_name)
      ]);
    }
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Phone',
    key: 'client_PhoneNumber',
  },
  {
    title: 'Country',
    key: 'location',
  },
  {
    title: 'Status',
    key: 'status',
    render: (row) => {
      const status = row.status || 'active';
      const type = status === 'active' ? 'success' : status === 'inactive' ? 'default' : 'warning';
      return h(NTag, {
        type,
        size: 'small',
        round: true
      }, {
        default: () => status.charAt(0).toUpperCase() + status.slice(1)
      });
    }
  },
  {
    title: '',
    key: 'actions',
    width: 120,
    render: (row) => {
      return h('div', { class: 'action-buttons' }, [
        h(NButton, {
          quaternary: true,
          circle: true,
          size: 'small',
          onClick: () => handleViewClient(row)
        }, {
          icon: () => h(NIcon, { component: Eye, size: 18 })
        }),
        h(NButton, {
          quaternary: true,
          circle: true,
          size: 'small',
          onClick: () => handleEditClient(row)
        }, {
          icon: () => h(NIcon, { component: Edit2, size: 18 })
        }),
        h(NButton, {
          quaternary: true,
          circle: true,
          size: 'small',
          onClick: () => handleDeleteClient(row)
        }, {
          icon: () => h(NIcon, { component: Trash2, size: 18, color: '#ef4444' })
        })
      ]);
    }
  }
];

// Computed properties
const filteredClients = computed(() => {
  let clients = clientStore.clients;

  // Filter by search
  if (search.value) {
    clients = clients.filter(client =>
      client.client_name?.toLowerCase().includes(search.value.toLowerCase()) ||
      client.email?.toLowerCase().includes(search.value.toLowerCase()) ||
      client.client_signature?.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  // Filter by status
  if (statusFilter.value) {
    clients = clients.filter(c => c.status === statusFilter.value);
  }

  return clients;
});

const pageCount = computed(() => Math.ceil(filteredClients.value.length / pageSize.value));

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredClients.value.slice(start, end);
});

// Methods
const handleAddClient = () => {
  isEditMode.value = false;
  selectedClient.value = null;
  showModal.value = true;
  error.value = '';
};

const handleViewClient = (client) => {
  // Implement view logic
  console.log('View client:', client);
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
      showSuccess('Customer updated successfully!');
    } else {
      await clientStore.addClient(formData);
      showSuccess('Customer created successfully!');
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
    showSuccess('Customer deleted successfully!');
    await clientStore.fetchClients();
  } catch (err) {
    showError('Failed to delete customer');
  } finally {
    showDeleteModal.value = false;
    selectedClient.value = null;
  }
};

const handleRefresh = async () => {
  loadingClients.value = true;
  await clientStore.fetchClients();
  loadingClients.value = false;
  showSuccess('Data refreshed!');
};

const exportPDF = () => {
  showSuccess('PDF export feature coming soon!');
};

const exportExcel = () => {
  showSuccess('Excel export feature coming soon!');
};

// Lifecycle
onMounted(async () => {
  loadingClients.value = true;
  await clientStore.fetchClients();
  loadingClients.value = false;
});
</script>

<style scoped></style>
