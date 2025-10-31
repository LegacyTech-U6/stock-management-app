<template>
  <div class="client-manager">
    <n-config-provider :theme-overrides="themeOverrides">
      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-left">
            <n-text class="header-title">Customers</n-text>
            <n-text depth="3" class="header-subtitle">Manage your customers</n-text>
          </div>
          <div class="header-actions">
            <n-button class="icon-button" quaternary circle @click="exportPDF" :focusable="false">
              <template #icon>
                <n-icon :component="FileText" size="20" color="#ef4444" />
              </template>
            </n-button>
            <n-button class="icon-button" quaternary circle @click="exportExcel" :focusable="false">
              <template #icon>
                <n-icon :component="FileSpreadsheet" size="20" color="#10b981" />
              </template>
            </n-button>
            <n-button class="icon-button" quaternary circle @click="handleRefresh" :focusable="false">
              <template #icon>
                <n-icon :component="RefreshCw" size="20" />
              </template>
            </n-button>
            <n-button type="success" @click="handleAddClient" :focusable="false" class="add-button">
              <template #icon>
                <n-icon :component="Plus" />
              </template>
              Add Customer
            </n-button>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <!-- Search and Filter Bar -->
        <n-card :bordered="false" class="toolbar-card">
          <div class="toolbar-content">
            <n-input v-model:value="search" placeholder="Search" class="search-input" clearable
              :input-props="{ autocomplete: 'off' }">
              <template #prefix>
                <n-icon :component="Search" />
              </template>
            </n-input>

            <n-select v-model:value="statusFilter" :options="statusOptions" placeholder="Status" class="status-select"
              clearable />
          </div>
        </n-card>

        <!-- Loading State -->
        <div v-if="loadingClients" class="loading-container">
          <n-space vertical align="center" :size="24">
            <n-spin size="large" />
            <n-text depth="3">Loading customers...</n-text>
          </n-space>
        </div>

        <!-- Client Table -->
        <n-card v-else-if="filteredClients.length > 0" :bordered="false" class="table-card">
          <n-data-table :columns="columns" :data="paginatedClients" :bordered="false" :single-line="false"
            class="clients-table" />

          <!-- Pagination -->
          <div class="pagination-container">
            <div class="pagination-info">
              <n-text depth="3">Row Per Page</n-text>
              <n-select v-model:value="pageSize" :options="pageSizeOptions" size="small" class="page-size-select" />
              <n-text depth="3">Entries</n-text>
            </div>
            <n-pagination v-model:page="currentPage" :page-count="pageCount" :page-slot="5" class="pagination" />
          </div>
        </n-card>

        <!-- Empty State -->
        <n-card v-else :bordered="false" class="empty-card">
          <n-empty class="empty-state" :description="search ? 'No customers found' : 'No customers yet'" size="large">
            <template #icon>
              <n-icon size="64" :component="Inbox" />
            </template>
            <template #extra>
              <n-space vertical :size="12" align="center">
                <n-text depth="3">
                  {{ search ? 'Try adjusting your search terms' : 'Get started by adding your first customer' }}
                </n-text>
                <n-button v-if="!search" type="success" @click="handleAddClient" size="large">
                  <template #icon>
                    <n-icon :component="Plus" />
                  </template>
                  Add Your First Customer
                </n-button>
                <n-button v-else @click="search = ''" size="large">
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
            Are you sure you want to delete <n-text strong>{{ selectedClient?.client_name }}</n-text>?
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
import { useGlobalModal } from "@/composable/useValidation";
const { show } = useGlobalModal();
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
      show('Customer updated successfully!', 'success');
    } else {
      console.log('====================================');
      console.log(formData);
      console.log('====================================');
      await clientStore.addClient(formData);
      show('Customer created successfully!', 'success');
    }

    showModal.value = false;
    await clientStore.fetchClients();
  } catch (err) {
    error.value = err.response?.data?.message || 'Operation failed';
    show('Operation failed: ' + error.value, 'error');
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
    show('Customer deleted successfully!', 'success');
    await clientStore.fetchClients();
  } catch (err) {
    show('Failed to delete customer', 'error');
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

<style scoped>
.client-manager {
  min-height: 100vh;
  background: #f9fafb;
}

.page-header {

  border-bottom: 1px solid #f3f4f6;
  padding: 20px 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
}

.header-subtitle {
  font-size: 14px;
  color: #6b7280;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon-button {
  width: 40px;
  height: 40px;
}

.add-button {
  height: 40px;
  padding: 0 20px;
  font-weight: 500;
}

.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px 32px;
}

.toolbar-card {
  border: 1px solid #f3f4f6;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.toolbar-content {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-input {
  flex: 1;
  max-width: 300px;
}

.status-select {
  width: 200px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.table-card {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.clients-table {
  font-size: 14px;
}

:deep(.customer-cell) {
  display: flex;
  align-items: center;
  gap: 12px;
}

:deep(.customer-name) {
  font-weight: 500;
  color: #111827;
}

:deep(.action-buttons) {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-size-select {
  width: 80px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
}

.empty-card {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.empty-state {
  padding: 64px 24px;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .page-header {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .content-wrapper {
    padding: 16px;
  }

  .toolbar-content {
    flex-direction: column;
  }

  .search-input,
  .status-select {
    width: 100%;
    max-width: none;
  }

  .pagination-container {
    flex-direction: column;
    gap: 16px;
  }

  .pagination {
    justify-content: center;
  }
}

/* Smooth transitions */
* {
  -webkit-tap-highlight-color: transparent;
}

:deep(.n-button) {
  font-weight: 500;
  transition: all 0.2s ease;
}

:deep(.n-card) {
  overflow: hidden;
}

:deep(.n-data-table-td) {
  padding: 16px 12px;
}

:deep(.n-data-table-th) {
  padding: 12px;
  font-weight: 600;
  color: #6b7280;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
