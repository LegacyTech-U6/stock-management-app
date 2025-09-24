<template>
  <div class="bg-gray-100 h-screen flex flex-col items-center justify-center space-y-5">
    <div class="font-bold text-3xl">Stockly</div>
    <p>Sign in to your account</p>

    <div
      class="border-none lg:p-7 p-5 bg-white rounded-xl shadow-md w-full sm:w-3/4 lg:w-1/4 space-y-5"
    >
      <div class="text-lg font-semibold">Welcome back</div>

      <!-- Formulaire -->
      <form @submit.prevent="seConnecter" class="space-y-5">
        <!-- Email -->
        <div>
          <label for="email" class="font-bold">Email</label>
          <div class="bg-gray-200 flex rounded py-2 px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="false"
              role="img"
            >
              <title>Mail</title>
              <path
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 7.5v9A2.5 2.5 0 0 0 5.5 19h13A2.5 2.5 0 0 0 21 16.5v-9A2.5 2.5 0 0 0 18.5 5h-13A2.5 2.5 0 0 0 3 7.5z"
              />
              <path
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 7.5l-9 6-9-6"
              />
            </svg>

            <input
              id="email"
              type="text"
              v-model="username"
              class="focus:outline-none w-full "
              placeholder="john@gmail.com"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="font-bold">Password</label>
          <div class="bg-gray-200 flex rounded py-2 px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Password / Lock</title>
              <rect x="5" y="11" width="14" height="10" rx="2" ry="2" stroke-width="1.6" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke-width="1.6" />
            </svg>

            <input
              id="password"
              type="password"
              v-model="password"
              class="focus:outline-none w-full bg-gray-200"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <!-- Bouton login -->
        <button
          type="submit"
          class="w-full rounded-xl bg-black text-white p-2 hover:bg-white hover:text-black border transition"
        >
          Sign In
        </button>

        <hr />

        <!-- Demo -->
        <button type="button" class="w-full rounded-xl border p-2 text-black hover:bg-gray-100">
          Try Demo Account
        </button>

        <!-- Lien inscription -->
        <div class="text-center">
          Don't have an account?
          <span class="font-bold">
            <router-link to="/register">Sign up</router-link>
          </span>
        </div>

        <!-- Affichage erreur -->
        <p v-if="authStore.error" class="text-red-600">
          {{ authStore.error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const seConnecter = async () => {
  await authStore.login(username.value, password.value)

  if (authStore.token) {
    console.log('✅ Connexion réussie :', authStore.user)
    router.push('/about') // Redirection après login réussi
  } else {
    console.warn('❌ Connexion échouée :', authStore.error)
  }
}
</script>
