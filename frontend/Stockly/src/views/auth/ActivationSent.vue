<!-- ActivationSent.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
      <!-- Logo -->
      <div class="mb-6">
        <svg class="mx-auto w-16 h-16 text-indigo-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m0 0l4-4m-4 4l4 4" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-gray-800 mb-3">Lien d’activation envoyé !</h1>
      <p class="text-gray-600 mb-6">
        Un email contenant votre lien d’activation a été envoyé à <span class="font-semibold">{{ email }}</span>.
        Il expirera dans :
      </p>

      <!-- Timer -->
      <div class="mb-6">
        <span class="text-3xl font-mono text-indigo-600">{{ minutes }}:{{ secondsFormatted }}</span>
      </div>

      <p class="text-gray-500 mb-6 text-sm">
        Si vous ne recevez pas l’email, vérifiez votre dossier spam ou
      </p>

      <router-link to="/login">
        <button class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all">
          Retour à la connexion
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// ⚡ Props ou valeurs dynamiques
const email = ref(route.query.email || 'utilisateur@example.com') // tu peux passer depuis le store ou props
const expireTime = ref(10 * 60) // expire dans 10 minutes

const minutes = ref(Math.floor(expireTime.value / 60))
const seconds = ref(expireTime.value % 60)
let timerInterval = null

const secondsFormatted = computed(() => (seconds.value < 10 ? '0' + seconds.value : seconds.value))

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (expireTime.value <= 0) {
      clearInterval(timerInterval)
      return
    }
    expireTime.value--
    minutes.value = Math.floor(expireTime.value / 60)
    seconds.value = expireTime.value % 60
  }, 1000)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})


</script>

<style scoped>
/* Font custom */
h1 {
  font-family: 'Inter', sans-serif;
}
</style>
