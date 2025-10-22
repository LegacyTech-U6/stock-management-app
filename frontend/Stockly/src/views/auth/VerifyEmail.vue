<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  const token = route.params.token;
  await authStore.verifyEmail(token);

  // Redirige après succès
  if (!authStore.error) {
    setTimeout(() => router.push("/login"), 3000);
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div v-if="authStore.isLoading" class="text-gray-600">Activation en cours...</div>
    <div v-else-if="authStore.successMessage" class="text-green-600">{{ authStore.successMessage }}</div>
    <div v-else-if="authStore.error" class="text-red-600">{{ authStore.error }}</div>
  </div>
</template>
