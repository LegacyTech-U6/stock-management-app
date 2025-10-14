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
              <h2 class="text-xl font-semibold text-gray-900">
                {{ isEdit ? 'Modifier le client' : 'Nouveau client' }}
              </h2>
            </div>
            <button
              @click="$emit('close')"
              :disabled="loading"
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-center gap-2 text-red-700">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm font-medium">{{ error }}</span>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
            <!-- Nom -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Nom complet <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.client_name"
                type="text"
                placeholder="Jean Dupont"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                :disabled="loading"
                required
              />
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="jean.dupont@example.com"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                :disabled="loading"
              />
            </div>

            <!-- Téléphone -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                v-model="formData.client_PhoneNumber"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                :disabled="loading"
              />
            </div>

            <!-- Adresse -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Adresse</label>
              <textarea
                v-model="formData.location"
                rows="3"
                placeholder="123 Rue de la Paix, 75001 Paris"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                :disabled="loading"
              />
            </div>

            <!-- Signature -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Signature</label>
              <textarea
                v-model="formData.client_Signature"
                rows="3"
                placeholder="Signature du client"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                :disabled="loading"
              />
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                @click="$emit('close')"
                :disabled="loading"
                class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <div v-if="loading" class="loader-small"></div>
                <span>{{ isEdit ? 'Modifier' : 'Ajouter' }}</span>
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
import { ref, watch } from 'vue';

const props = defineProps({
  open: Boolean,
  isEdit: Boolean,
  clientData: Object,
  loading: Boolean,
  error: String
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
  client_name: '',
  email: '',
  client_PhoneNumber: '',
  location: '',
  client_Signature: ''
});

// Initialiser le formulaire
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    if (props.isEdit && props.clientData) {
      // Mode édition
      formData.value = { ...props.clientData };
    } else {
      // Mode création
      formData.value = {
        client_name: '',
        email: '',
        client_PhoneNumber: '',
        location: '',
        client_Signature: ''
      };
    }
  }
});

const handleSubmit = () => {
  emit('submit', formData.value);
};

const handleBackdropClick = () => {
  if (!props.loading) {
    emit('close');
  }
};
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
