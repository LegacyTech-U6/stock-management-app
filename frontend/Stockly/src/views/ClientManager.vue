<template>
  <div class="client-manager">
    <n-config-provider :theme-overrides="themeOverrides">
      <!-- Header Section -->
      <n-page-header class="page-header" @back="handleBackToSales">
        <template #title>
          <n-text class="header-title">Client Management</n-text>
        </template>
        <template #subtitle>
          <n-text depth="3">Manage your customer database</n-text>
        </template>
        <template #extra>
          <n-space>
            <n-button
              secondary
              @click="handleBackToSales"
              :focusable="false"
            >
              <template #icon>
                <n-icon :component="ArrowLeft" />
              </template>
              Back to Sales
            </n-button>
            <n-button
              type="primary"
              @click="handleAddClient"
              :focusable="false"
            >
              <template #icon>
                <n-icon :component="Plus" />
              </template>
              Add Client
            </n-button>
          </n-space>
        </template>
      </n-page-header>

      <div class="content-wrapper">
        <!-- Summary Cards -->
        <n-grid :x-gap="16" :y-gap="16" :cols="2" class="stats-grid">
          <n-gi>
            <n-card
              :bordered="false"
              class="stat-card"
              hoverable
            >
              <n-statistic label="Total Clients" :value="clientStore.clients.length">
                <template #prefix>
                  <n-icon size="24" :component="Users" color="#1890ff" />
                </template>
              </n-statistic>
            </n-card>
          </n-gi>

          <n-gi>
            <n-card
              :bordered="false"
              class="stat-card"
              hoverable
            >
              <n-statistic
                label="Active Clients"
                :value="activeClients"
              >
                <template #prefix>
                  <n-icon size="24" :component="CheckCircle" color="#52c41a" />
                </template>
              </n-statistic>
            </n-card>
          </n-gi>
        </n-grid>

        <!-- Search Section -->
        <n-card
          :bordered="false"
          class="search-card"
        >
          <n-input
            v-model:value="search"
            placeholder="Search clients by name, email, or company..."
            size="large"
            clearable
            :input-props="{ autocomplete: 'off' }"
          >
            <template #prefix>
              <n-icon :component="Search" />
            </template>
            <template #suffix v-if="search">
              <n-tag size="small" :bordered="false">
                {{ filteredClients.length }} result{{ filteredClients.length !== 1 ? 's' : '' }}
              </n-tag>
            </template>
          </n-input>
        </n-card>

        <!-- Loading State -->
        <div v-if="loadingClients" class="loading-container">
          <n-space vertical align="center" :size="24">
            <n-spin size="large" />
            <n-text depth="3">Loading clients...</n-text>
          </n-space>
        </div>

        <!-- Client Cards Grid -->
        <n-grid
          v-else-if="filteredClients.length > 0"
          :x-gap="16"
          :y-gap="16"
          :cols="responsiveCards"
          class="clients-grid"
        >
          <n-gi v-for="client in filteredClients" :key="client.id">
            <ClientCard
              :client="client"
              @edit="handleEditClient"
              @delete="handleDeleteClient"
            />
          </n-gi>
        </n-grid>

        <!-- Empty State -->
        <n-empty
          v-else
          class="empty-state"
          :description="search ? 'No clients found' : 'No clients yet'"
          size="large"
        >
          <template #icon>
            <n-icon size="64" :component="Inbox" />
          </template>
          <template #extra>
            <n-space vertical :size="12" align="center">
              <n-text depth="3">
                {{ search ? 'Try adjusting your search terms' : 'Get started by adding your first client' }}
              </n-text>
              <n-button
                v-if="!search"
                type="primary"
                @click="handleAddClient"
                size="large"
              >
                <template #icon>
                  <n-icon :component="Plus" />
                </template>
                Add Your First Client
              </n-button>
              <n-button
                v-else
                @click="search = ''"
                size="large"
              >
                Clear Search
              </n-button>
            </n-space>
          </template>
        </n-empty>
      </div>

      <!-- Modals -->
      <FromModal
        :open="showModal"
        :isEdit="isEditMode"
        :clientData="selectedClient"
        :loading="loading"
        :error="error"
        @close="handleCloseModal"
        @submit="handleSubmit"
      />

      <n-modal
        v-model:show="showDeleteModal"
        preset="dialog"
        title="Delete Client"
        :positive-text="'Delete'"
        :negative-text="'Cancel'"
        @positive-click="confirmDelete"
      >
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
import { ref, computed, onMounted } from 'vue';
import {
  NConfigProvider, NPageHeader, NCard, NButton, NIcon, NSpace, NText,
  NGrid, NGi, NStatistic, NInput, NSpin, NEmpty, NTag, NModal, NAlert
} from 'naive-ui';
// Import icons from lucide-vue-next (already available)
import { Users, CheckCircle, Search, Plus, ArrowLeft, Inbox } from 'lucide-vue-next';
import { useClientStore } from '@/stores/clientStore';
import { useActionMessage } from '@/composable/useActionMessage';
import ClientCard from '@/components/clients/ClientCard.vue';
import FromModal from '../components/clients/FromModal.vue';

const { showSuccess, showError } = useActionMessage();
const clientStore = useClientStore();

// Theme customization
const themeOverrides = {
  common: {
    borderRadius: '12px',
    borderRadiusSmall: '8px',
  },
  Card: {
    borderRadius: '12px',
  },
  Button: {
    borderRadiusMedium: '8px',
  },
  Input: {
    borderRadius: '10px',
  }
};

// Responsive columns
const responsiveCards = computed(() => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1536) return 3;
    return 4;
  }
  return 4;
});

// State
const search = ref('');
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditMode = ref(false);
const selectedClient = ref(null);
const loading = ref(false);
const error = ref('');
const loadingClients = ref(true);

// Computed properties
const filteredClients = computed(() =>
  clientStore.clients.filter(client =>
    client.client_name?.toLowerCase().includes(search.value.toLowerCase()) ||
    client.email?.toLowerCase().includes(search.value.toLowerCase())
  )
);

const activeClients = computed(() =>
  clientStore.clients.filter(c => c.status === 'active').length
);

// Methods
const handleBackToSales = () => {
  // Navigation logic
};

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
  background: #f5f5f5;
}

.page-header {
  background: white;
  padding: 20px 24px;
  border-bottom: 1px solid #e8e8e8;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
}

.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
}

.stats-grid {
  margin-bottom: 24px;
}

.stat-card {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03),
              0 1px 6px -1px rgba(0, 0, 0, 0.02),
              0 2px 4px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08),
              0 2px 6px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.search-card {
  margin-bottom: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03),
              0 1px 6px -1px rgba(0, 0, 0, 0.02);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.clients-grid {
  margin-bottom: 32px;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 64px 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .page-header {
    padding: 16px;
  }

  .content-wrapper {
    padding: 16px;
  }

  .header-title {
    font-size: 20px;
  }

  .empty-state {
    padding: 48px 16px;
  }
}

/* Native-like transitions */
* {
  -webkit-tap-highlight-color: transparent;
}

:deep(.n-button) {
  font-weight: 500;
}

:deep(.n-card) {
  overflow: hidden;
}

:deep(.n-statistic) {
  user-select: none;
}
</style>
