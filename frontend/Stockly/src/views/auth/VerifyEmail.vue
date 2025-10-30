<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const countdown = ref(3);

onMounted(async () => {
  const token = route.params.token;

  try {
    await authStore.verifyEmail(token);

    if (!authStore.error) {
      // Start countdown for automatic redirect
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value === 0) {
          clearInterval(timer);

          // Try to auto-login if we have user data
          if (authStore.user && authStore.token) {
            authStore.redirectAfterLogin();
          } else {
            router.push("/login");
          }
        }
      }, 1000);
    }
  } catch (error) {
    console.error("Activation error:", error);
  }
});

const redirectNow = () => {
  if (authStore.user && authStore.token) {
    authStore.redirectAfterLogin();
  } else {
    router.push("/login");
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <!-- Success State -->
      <div v-if="authStore.successMessage && !authStore.error" class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <!-- Success Icon -->
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <!-- Success Message -->
        <h1 class="text-2xl font-bold text-gray-900 mb-3">Account Activated!</h1>
        <p class="text-gray-600 mb-2">{{ authStore.successMessage }}</p>
        <p class="text-sm text-gray-500 mb-6">
          Your email has been successfully verified. You'll be redirected in {{ countdown }} seconds...
        </p>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            class="bg-green-600 h-2 rounded-full transition-all duration-1000 ease-linear"
            :style="{ width: `${(3 - countdown) / 3 * 100}%` }"
          ></div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="redirectNow"
            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            Continue Now
          </button>
          <button
            @click="router.push('/login')"
            class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="authStore.isLoading" class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <!-- Loading Spinner -->
        <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-indigo-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-10h-4M6 12H2m15.364-7.364l-2.828 2.828M7.464 17.536l-2.828 2.828m11.314 0l-2.828-2.828M7.464 6.464L4.636 3.636"></path>
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-3">Activating Your Account</h1>
        <p class="text-gray-600 mb-2">Please wait while we verify your email address...</p>
        <p class="text-sm text-gray-500">This will only take a moment.</p>
      </div>

      <!-- Error State -->
      <div v-else-if="authStore.error" class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <!-- Error Icon -->
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-3">Activation Failed</h1>
        <p class="text-gray-600 mb-2">{{ authStore.error }}</p>
        <p class="text-sm text-gray-500 mb-6">
          The activation link may be invalid or expired.
        </p>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="router.push('/login')"
            class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            Go to Login
          </button>
          <button
            @click="router.push('/register')"
            class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Create New Account
          </button>
        </div>
      </div>

      <!-- Unknown State -->
      <div v-else class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>

        <h1 class="text-2xl font-bold text-gray-900 mb-3">Processing</h1>
        <p class="text-gray-600">Please wait while we process your request...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Smooth progress bar animation */
.progress-bar {
  transition: width 1s ease-in-out;
}
</style>
