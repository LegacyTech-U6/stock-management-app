<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-gray-800">Paramètres du profil</h1>
        <p class="text-gray-500 text-sm">
          Modifiez vos informations personnelles, votre photo et votre mot de passe.
        </p>
      </div>

      <button
        @click="updateProfile"
        :disabled="authStore.isLoading"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {{ authStore.isLoading ? 'Enregistrement...' : 'Enregistrer' }}
      </button>
    </div>

    <!-- Bloc profil -->
    <div class="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-2xl space-y-10">
      <!-- Photo + infos -->
      <div class="flex flex-col items-center space-y-6">
        <!-- Photo -->
        <div class="relative">
          <img
            :src="previewImage || authStore.user?.avatar_url || '/default-avatar.png'"
            alt="Photo de profil"
            class="w-32 h-32 rounded-full object-cover border border-gray-300"
          />

          <label
            class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700"
          >
            <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4.414-4.414A2 2 0 0011.586 3H4zm6 4a3 3 0 11-6 0 3 3 0 016 0zm2 10a4 4 0 00-8 0h8z"
              />
            </svg>
          </label>
        </div>

        <!-- Infos utilisateur -->
        <div class="w-full space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-700">Nom d’utilisateur</label>
            <input
              v-model="profileForm.username"
              type="text"
              class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Nom</label>
            <input
              v-model="profileForm.Last_name"
              type="text"
              class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="profileForm.email"
              type="email"
              class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Téléphone</label>
            <input
              v-model="profileForm.telephone"
              type="text"
              class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      <hr class="my-6" />

      <!-- Bloc mot de passe -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Changer le mot de passe</h2>

        <div>
          <label class="text-sm font-medium text-gray-700">Mot de passe actuel</label>
          <input
            v-model="passwordForm.oldPassword"
            type="password"
            class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">Nouveau mot de passe</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button
          @click="changePassword"
          :disabled="authStore.isLoading"
          class="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ authStore.isLoading ? 'Mise à jour...' : 'Changer le mot de passe' }}
        </button>

        <div v-if="authStore.successMessage" class="text-green-600 text-sm mt-2">
          {{ authStore.successMessage }}
        </div>
        <div v-if="authStore.error" class="text-red-600 text-sm mt-2">
          {{ authStore.error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// 🧍 Infos profil
const profileForm = ref({
  username: '',
  Last_name: '',
  email: '',
  telephone: '',
})

// 📸 Photo
const previewImage = ref(null)
const selectedFile = ref(null)

// 🔐 Mot de passe
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Charger les infos utilisateur
watch(
  () => authStore.user,
  (user) => {
    if (user) {
      profileForm.value.username = user.username || ''
      profileForm.value.Last_name = user.Last_name || ''
      profileForm.value.email = user.email || ''
      profileForm.value.telephone = user.telephone || ''
    }
  },
  { immediate: true },
)

// Changement de photo
const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  selectedFile.value = file
  previewImage.value = URL.createObjectURL(file)
}

// Mise à jour du profil
const updateProfile = async () => {
  await authStore.updateProfile({ ...profileForm.value, avatar: selectedFile.value })
}

// Changement de mot de passe
const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    authStore.error = 'Les mots de passe ne correspondent pas ❌'
    return
  }
  await authStore.changePassword(passwordForm.value.oldPassword, passwordForm.value.newPassword)
  passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
