<template>
  <div class="customer-information relative bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>

    <div class="relative">
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        placeholder="Search clients or type 'walk-in'..."
        class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        @keydown.down.prevent="highlightNext"
        @keydown.up.prevent="highlightPrev"
        @keydown.enter.prevent="selectHighlightedOrWalkIn"
      />

      <!-- Add New Client Button -->
      <button
        @click.stop="addNewClient"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 focus:outline-none transition-colors"
        title="Add New Client"
      >
        <UserPlusIcon class="w-5 h-5" />
      </button>

      <!-- Selected / Info Indicator -->
      <div v-if="selectedDisplay" class="absolute top-full mt-2 left-0 text-sm text-gray-600">
        Selected: {{ selectedDisplay }}
      </div>

      <!-- Filtered clients list -->
      <ul
        v-if="filteredClients.length > 0 && showFilteredList"
        class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
      >
        <li
          v-for="(client, index) in filteredClients"
          :key="client.id"
          :class="{
            'bg-teal-500 text-white': index === highlightedIndex,
            'px-4 py-2 text-sm cursor-pointer hover:bg-gray-100': true,
          }"
          @mouseenter="highlightedIndex = index"
          @click="selectClient(client)"
        >
          {{ client.client_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useClientStore } from '@/stores/clientStore'
import { UserPlusIcon } from 'lucide-vue-next'

const clientStore = useClientStore()
const emit = defineEmits(['select-client'])

const clients = ref([])
const selected = ref(null)
const searchQuery = ref('')
const searchInput = ref(null)
const highlightedIndex = ref(-1)
const showFilteredList = ref(false)

// Fetch clients
onMounted(async () => {
  await clientStore.fetchClients()
  clients.value = clientStore.clients

  // Keyboard shortcut Ctrl + R to focus search
  window.addEventListener('keydown', handleGlobalShortcut)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalShortcut)
})

// Global keyboard shortcut
function handleGlobalShortcut(e) {
  if (e.ctrlKey && e.key.toLowerCase() === 'a') {
    e.preventDefault()
    searchInput.value?.focus()
    showFilteredList.value = true
  }
}

// Computed filtered clients
const filteredClients = computed(() => {
  if (!searchQuery.value.trim() || searchQuery.value.toLowerCase() === 'walk-in') return []
  const query = searchQuery.value.toLowerCase()
  return clients.value.filter((client) => client.client_name.toLowerCase().includes(query))
})

// Display text
const selectedDisplay = computed(() => {
  if (!selected.value) return ''
  if (selected.value === 'walk-in') return 'Walk in Customer'
  return selected.value.client_name
})

// Keyboard navigation
function highlightNext() {
  if (filteredClients.value.length === 0) return
  highlightedIndex.value = (highlightedIndex.value + 1) % filteredClients.value.length
  showFilteredList.value = true
}

function highlightPrev() {
  if (filteredClients.value.length === 0) return
  highlightedIndex.value =
    (highlightedIndex.value - 1 + filteredClients.value.length) % filteredClients.value.length
  showFilteredList.value = true
}

// Enter key: select highlighted client or walk-in
function selectHighlightedOrWalkIn() {
  if (searchQuery.value.toLowerCase() === 'walk-in') {
    selected.value = 'walk-in'
    searchQuery.value = 'Walk in Customer'
    highlightedIndex.value = -1
    showFilteredList.value = false
    emit('select-client', selected.value)
    return
  }

  if (highlightedIndex.value >= 0 && highlightedIndex.value < filteredClients.value.length) {
    selectClient(filteredClients.value[highlightedIndex.value])
  }
}

// Select client function
function selectClient(client) {
  selected.value = client
  searchQuery.value = client.client_name
  highlightedIndex.value = -1
  showFilteredList.value = false
  emit('select-client', selected.value)
}

// Add new client
function addNewClient() {
  selected.value = null
  searchQuery.value = ''
  highlightedIndex.value = -1
  showFilteredList.value = false
  emit('select-client', { action: 'add-new-client' })
}

// Show filtered list while typing
watch(searchQuery, (val) => {
  if (val.trim()) {
    showFilteredList.value = true
  } else {
    showFilteredList.value = false
  }
})
</script>

<style scoped>
.customer-information {
  position: relative;
}

ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background: #cbd5e1; /* gray-300 */
  border-radius: 3px;
}
</style>
