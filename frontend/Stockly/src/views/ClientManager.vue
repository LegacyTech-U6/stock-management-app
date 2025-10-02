
<template>
  <div class="h-screen space-y-5 pt-20 max-w-7xl mx-auto text-center">
    <div class="grid grid-cols-2">
      <div>
        <h1 class="text-4xl font-bold">Client Management</h1>
        <p class="text-gray-400">manage your customer database here</p>
      </div>
      <div class="flex gap-4">

        <BaseButton
          text="back to sales"
          color="bg-white rounded-xl text-black hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg"
          :dark-text="true"
          ></BaseButton>
            <BaseButton
          text="add client"
          color="bg-black  rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"

          ></BaseButton>

      </div>
    </div>
    <div v-for="client in clientStore.clients" :key="client.id" class=" grid lg:grid-cols-4 md:grid-cols-2 rounded-xl">
      <ClientCard :client="client" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import ClientCard from '@/components/clients/ClientCard.vue';
import { useClientStore } from '@/stores/clientStore';
import { onMounted } from 'vue';

const clientStore = useClientStore();


onMounted(async () => {
  await clientStore.fetchClients();
});
</script>
