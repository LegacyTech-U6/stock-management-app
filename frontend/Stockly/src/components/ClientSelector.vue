<template>
  <div class="client-selector bg-white border border-gray-200 rounded-lg p-4 lg:p-5">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
        <UserIcon class="text-white w-5 h-5" />
      </div>
      <label for="client" class="font-semibold text-gray-900">Select Client</label>
    </div>

    <select
      v-model="selected"
      @change="emitClient"
      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
    >
      <option disabled value="">Choose a client...</option>
      <option v-for="client in clients" :key="client.id" :value="client">
        {{ client.client_name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import UserIcon from '@/assets/icon svg/UserIcon.vue'
import { onMounted, ref } from 'vue'
import { useClientStore } from '@/stores/clientStore'

const clientStore = useClientStore()
const emit = defineEmits(['select-client'])
const clients = ref([])
const selected = ref('')

onMounted(async () => {
  await clientStore.fetchClients()
  clients.value = clientStore.clients
})

function emitClient() {
  emit('select-client', selected.value)
}
</script>