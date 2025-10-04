<template>
  <div class="client-selector w-full border p-5 space-y-5 rounded-lg">
    <div class="flex gap-2 items-start">
      <UserIcon />
      <label for="client" class="font-semibold mr-2">Select Client</label>
    </div>

    <select v-model="selected" @change="emitClient" class="border w-full rounded-xl p-2 bg-gray-100">
      <option disabled value="">Choose client...</option>
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

onMounted(async () => {
  await clientStore.fetchClients()
  clients.value = clientStore.clients
})
const selected = ref('')
function emitClient() {
  emit('select-client', selected.value)
}
onMounted(() => {
  // Fetch clients from API if needed
})
</script>
