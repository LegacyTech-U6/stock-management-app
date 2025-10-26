<template>
  <div class="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Left Section - Marketing Content (Hidden on Mobile) -->
    <div
      class="hidden lg:flex lg:flex-1 flex-col lg:items-center lg:justify-center bg-gradient-to-br from-primary/10 to-accent/10">
      <div class="max-w-md text-center space-y-6 p-8">
        <h1 class="text-4xl font-bold text-gray-900">Join Stockly</h1>
        <p class="text-lg text-gray-600">Manage your inventory and sales like never before</p>
      </div>

      <div class="relative w-full max-w-sm overflow-hidden">
        <div class="rounded-2xl overflow-hidden shadow-lg" :class="imageSlideClass">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
            alt="Team collaboration" class="w-full h-80 object-cover" />
        </div>
      </div>

      <div class="space-y-2 text-center max-w-sm">
        <h2 class="text-2xl font-bold text-blue-600">Professional Stock Management</h2>
        <p class="text-muted-foreground">
          Create professional invoices in seconds, automate your billing process, and get paid
          faster than ever before.
        </p>
      </div>
    </div>

    <!-- Right Section - Form -->
    <div
      class="flex-1 flex w-full lg:h-screen items-center justify-center lg:p-28 pt-20 pb-8 px-4 lg:px-0 lg:bg-background bg-transparent">
      <div class="w-full lg:max-w-md max-w-sm space-y-3">
        <!-- Back Button (Mobile Only) -->
        <button @click="goBack" class="lg:flex hidden items-center text-gray-600 hover:text-gray-900 transition mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <!-- Branding -->
        <div class="hidden lg:block text-center space-y-2">
          <h1 class="text-3xl font-bold text-primary">Stockly</h1>
          <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
          <p class="text-gray-600 text-sm">Start your free trial today</p>
        </div>

        <!-- Mobile Branding -->
        <div class="lg:hidden space-y-1 mb-4">
          <h1 class="text-2xl font-bold text-primary">Stockly</h1>
          <h1 class="text-2xl font-bold text-gray-900">Create Account</h1>
          <p class="text-gray-600 text-xs">Start your free trial today</p>
        </div>

        <!-- Form Card -->
        <div class="lg:bg-white lg:rounded-2xl lg:shadow-md lg:p-8 p-0 space-y-2">
          <div class="lg:block hidden mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Sign up</h2>
            <p class="text-sm text-gray-600">Enter your information to create your account</p>
          </div>

          <!-- Social Login -->

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-2.5">
            <!-- First & Last Name -->
            <div class="grid grid-cols-2 gap-2 lg:gap-4">
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">First name</label>
                <input type="text" v-model="user.username" placeholder="John"
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm" />
              </div>
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Last name</label>
                <input type="text" v-model="user.last_name" placeholder="Doe"
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm" />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Email</label>
              <input type="email" v-model="user.email" placeholder="john@example.com"
                class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm" />
            </div>

            <!-- Company Name -->
            <div>
              <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Company name</label>
              <input type="text" v-model="user.company" placeholder="Your company name"
                class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm" />
            </div>

            <!-- Business Type & Role -->
            <div class="grid grid-cols-2 gap-2 lg:gap-4">
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Business type</label>
                <select v-model="user.role"
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition appearance-none text-sm">
                  <option value="">Select role</option>
                  <option value="owner">Owner</option>
                  <option value="manager">Manager</option>
                  <option value="invoice_head">Invoice Head</option>
                </select>
              </div>
              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Phone (Optional)</label>
                <input type="tel" v-model="user.telephone" placeholder="+237 675 453 456"
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm" />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Password</label>
              <div class="relative">
                <input :type="showPassword ? 'text' : 'password'" v-model="user.password"
                  placeholder="Create a password"
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm" />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:w-5 lg:h-5"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Confirm password</label>
              <div class="relative">
                <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
                  placeholder="Confirm your password"
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm" />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:w-5 lg:h-5"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Terms & Conditions -->
            <div class="flex items-start space-x-2 pt-1">
              <input type="checkbox" v-model="user.accept_terms"
                class="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300" />
              <label class="text-xs lg:text-sm text-gray-600">
                I agree to the
                <span class="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>
                and
                <span class="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            <!-- Marketing Opt-in -->
            <div class="flex items-start space-x-2">
              <input type="checkbox" v-model="marketingOptIn"
                class="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300" />
              <label class="text-xs lg:text-sm text-gray-600">Send me updates and marketing emails</label>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-3 lg:p-4 bg-red-50 border border-red-200 lg:rounded-lg rounded mt-2">
              <p class="text-xs lg:text-sm text-red-700">{{ error }}</p>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="loading"
              class="w-full py-2.5 lg:py-3 rounded-lg lg:rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105 text-sm lg:text-base mt-3 flex items-center justify-center">
              <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span v-if="!loading">Create account →</span>
              <span v-else>Registering...</span>
            </button>
          </form>

          <!-- Sign In Link -->
          <p class="text-center text-xs lg:text-sm text-gray-600 mt-3">
            Already have an account?
            <router-link to="/login" class="font-semibold text-blue-600 hover:underline"
              @click="setNavigationDirection('to-login')">
              Sign in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const marketingOptIn = ref(false)
const imageSlideClass = ref('')

onMounted(() => {
  // Set the animation direction based on navigation history
  const navigationDirection = sessionStorage.getItem('navigation-direction')

  if (navigationDirection === 'from-login') {
    imageSlideClass.value = 'slide-in-from-right'
  } else {
    imageSlideClass.value = 'slide-in-from-left'
  }

  // Clear the navigation direction after use
  sessionStorage.removeItem('navigation-direction')
})

onUnmounted(() => {
  // Set navigation direction for the next page
  if (router.currentRoute.value.path === '/login') {
    sessionStorage.setItem('navigation-direction', 'from-register')
  }
})

const setNavigationDirection = (direction) => {
  sessionStorage.setItem('navigation-direction', direction)
}

const user = ref({
  username: '',
  Last_name: '',
  email: '',
  telephone: '',
  company: '',
  role: '',
  password: '',
  accept_terms: false,
})

const confirmPassword = ref('')
const error = ref(null)

const handleRegister = async () => {
  error.value = null
  loading.value = true

  if (user.value.password !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }

  if (!user.value.accept_terms) {
    error.value = 'You must accept the terms and conditions'
    loading.value = false
    return
  }

  try {
    await authStore.register(
      user.value.username,
      user.value.Last_name,
      user.value.email,
      user.value.telephone,
      user.value.password,
    )

    if (authStore.error) {
      error.value = authStore.error
    } else {
      router.push({ name: 'activation', query: { email: user.value.email } })
    }
  } catch (err) {
    console.error(err)
    error.value = 'Registration failed'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* Slide in from right animation */
.slide-in-from-right {
  animation: slideInFromRight 0.5s ease-in-out forwards;
}

/* Slide in from left animation */
.slide-in-from-left {
  animation: slideInFromLeft 0.5s ease-in-out forwards;
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Initial state for the image container */
.rounded-2xl {
  opacity: 0;
}
</style>
