
<template>
  <div class="h-screen pt-20">
    <div v-for="client in clientStore.clients" :key="client.id">
      <ClientCard :client="client" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ClientCard from '@/components/clients/ClientCard.vue';
import { useClientStore } from '@/stores/clientStore';
import { onMounted } from 'vue';

const clientStore = useClientStore();


onMounted(async () => {
  await clientStore.fetchClients();
});
</script>
