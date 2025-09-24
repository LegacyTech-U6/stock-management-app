<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-6">
      <h2 class="text-2xl font-bold text-center">Mot de passe oublié</h2>

      <form @submit.prevent="sendResetLink" class="space-y-4">
        <div>
          <label class="font-bold">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full p-2 border rounded"
            placeholder="john@gmail.com"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white p-2 rounded hover:bg-white hover:text-black border transition"
          :disabled="authStore.isLoading"
        >
          <span v-if="authStore.isLoading">⏳ Envoi...</span>
          <span v-else>Envoyer le lien</span>
        </button>
      </form>

      <!-- Messages -->
      <p v-if="authStore.error" class="text-red-600">{{ authStore.error }}</p>
      <p v-if="authStore.successMessage" class="text-green-600">
        {{ authStore.successMessage }}
      </p>

      <p class="text-center">
        <router-link to="/login" class="font-bold">Retour connexion</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const email = ref("");

const sendResetLink = () => {
  authStore.forgotPassword(email.value);
};
</script>
