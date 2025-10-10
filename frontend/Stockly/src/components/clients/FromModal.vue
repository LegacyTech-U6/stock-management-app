<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div
        v-if="open"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
        @click="handleBackdropClick"
      >
        <div
          class="bg-white w-full sm:w-auto sm:min-w-[400px] sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <UserIcon />
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Nouveau client</h2>
            </div>
            <button
              @click="handleClose"
              :disabled="store.submitLoading"
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Fermer"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Global Error Message -->
          <div v-if="store.submitError" class="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-center gap-2 text-red-700">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm font-medium">{{ store.submitError }}</span>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
            <!-- Nom -->
            <div class="space-y-2">
              <label for="nom" class="block text-sm font-medium text-gray-700">
                Nom complet <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="store.clientForm.client_name"
                type="text"
                placeholder="Jean Dupont"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.nom }"
                :disabled="store.submitLoading"
                required
              />
              <p v-if="errors.nom" class="text-sm text-red-600">{{ errors.nom }}</p>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                v-model="store.clientForm.email"
                type="email"
                placeholder="jean.dupont@example.com"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email }"
                :disabled="store.submitLoading"
              />
              <p v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <!-- Téléphone -->
            <div class="space-y-2">
              <label for="telephone" class="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                id="telephone"
                v-model="store.clientForm.client_PhoneNumber"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.telephone }"
                :disabled="store.submitLoading"
              />
              <p v-if="errors.telephone" class="text-sm text-red-600">{{ errors.telephone }}</p>
            </div>

            <!-- Adresse -->
            <div class="space-y-2">
              <label for="adresse" class="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <textarea
                id="adresse"
                v-model="store.clientForm.location"
                rows="3"
                placeholder="123 Rue de la Paix, 75001 Paris"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 resize-none"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.adresse }"
                :disabled="store.submitLoading"
              />
              <p v-if="errors.adresse" class="text-sm text-red-600">{{ errors.adresse }}</p>
            </div>

            <!-- Signature -->
            <div class="space-y-2">
              <label for="signature" class="block text-sm font-medium text-gray-700">
                Signature
              </label>
              <textarea
                id="signature"
                v-model="store.clientForm.client_Signature"
                rows="3"
                placeholder="Signature du client"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 resize-none"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.signature }"
                :disabled="store.submitLoading"
              />
              <p v-if="errors.signature" class="text-sm text-red-600">{{ errors.signature }}</p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                @click="handleClose"
                :disabled="store.submitLoading"
                class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="store.submitLoading"
                class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                <!-- Loader -->
                <div v-if="store.submitLoading" class="flex items-center gap-2">
                  <div class="loader-small"></div>
                  <span>Ajout en cours...</span>
                </div>
                <template v-else>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  Ajouter le client
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import UserIcon from '@/assets/icon svg/UserIcon.vue';
import { ref, reactive, watch, nextTick } from 'vue';
import { useClientStore } from '@/stores/clientStore';

const store = useClientStore();

const props = defineProps({
  open: Boolean,
  form: Object
});

const emit = defineEmits(['close', 'success', 'submit']);

const errors = reactive({
  nom: '',
  email: '',
  telephone: '',
  adresse: '',
  signature: ''
});

// Validation des champs
const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });

  let isValid = true;

  // Validation nom
  if (!store.clientForm.client_name || store.clientForm.client_name.trim().length < 2) {
    errors.nom = 'Le nom doit contenir au moins 2 caractères';
    isValid = false;
  }

  // Validation email
  if (store.clientForm.email && store.clientForm.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(store.clientForm.email)) {
      errors.email = 'Format d\'email invalide';
      isValid = false;
    }
  }

  // Validation téléphone
  if (store.clientForm.client_PhoneNumber && store.clientForm.client_PhoneNumber.trim()) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const cleanPhone = store.clientForm.client_PhoneNumber.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.telephone = 'Format de téléphone invalide';
      isValid = false;
    }
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    await store.addClient();
    emit('success');
  } catch (error) {
    // Error is handled in the store and displayed in the template
    console.error('Erreur lors de l\'ajout du client:', error);
  }
};

const handleClose = () => {
  if (!store.submitLoading) {
    store.fermerFormulaire();
    emit('close');
  }
};

const handleBackdropClick = () => {
  if (!store.submitLoading) {
    handleClose();
  }
};

// Focus sur le premier champ quand le modal s'ouvre
watch(() => props.open, (newVal) => {
  if (newVal) {
    nextTick(() => {
      const firstInput = document.getElementById('name');
      if (firstInput) {
        firstInput.focus();
      }
    });
  }
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Loader Styles */
.loader-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Animation pour mobile */
@media (max-width: 640px) {
  .modal-enter-from {
    opacity: 0;
    transform: translateY(100%);
  }

  .modal-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
