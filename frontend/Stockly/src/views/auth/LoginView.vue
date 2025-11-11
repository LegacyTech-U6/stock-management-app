<template>
  <div
    class="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 overflow-hidden"
  >
    <!-- Left Section - Dynamic Content (Login/Register) -->
    <div
      ref="leftSection"
      :style="{ backgroundImage: `url('/src/assets/image/branding.png')` }"
      class="hidden lg:flex lg:flex-1 flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-orange-100 p-12 space-y-8 transition-all duration-500 ease-in-out"
    >
      <!-- Login Content -->
      <div v-if="isLogin" class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-gray-900">Welcome Back to Stockly</h1>
        <p class="text-lg text-gray-600">Your Inventory Management Solution</p>
      </div>

      <!-- Register Content -->
      <div v-else class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-gray-900">Join Stockly</h1>
        <p class="text-lg text-gray-600">Manage your inventory and sales like never before</p>
      </div>

      <div class="relative w-full max-w-sm">
        <div class="rounded-2xl overflow-hidden shadow-lg">
          <img
            ref="heroImage"
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
            alt="Team collaboration"
            class="w-full h-80 object-cover"
          />
        </div>
      </div>

      <div class="space-y-2 text-center max-w-sm">
        <h2 class="text-2xl font-bold text-indigo-600">
          {{ isLogin ? 'Manage with Confidence' : 'Professional Stock Management' }}
        </h2>
        <p class="text-gray-600">
          {{
            isLogin
              ? 'Track inventory, manage clients, and generate professional invoices all in one place. Built for modern businesses.'
              : 'Create professional invoices in seconds, automate your billing process, and get paid faster than ever before.'
          }}
        </p>
      </div>
    </div>

    <!-- Right Section - Dynamic Form (Login/Register) -->
    <div
      ref="rightSection"
      class="flex-1 flex w-full lg:h-screen items-center justify-center lg:p-28 pt-20 pb-8 px-4 lg:px-0 lg:bg-background bg-transparent transition-all duration-500 ease-in-out"
    >
      <div class="w-full lg:max-w-md max-w-sm space-y-3">
        <!-- Back Button -->
        <button
          @click="goBack"
          class="lg:flex hidden items-center text-gray-600 hover:text-gray-900 transition mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </button>

        <!-- Dynamic Branding -->
        <div class="hidden lg:block text-center space-y-2">
          <h1 class="text-3xl font-bold text-indigo-600">Stockly</h1>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ isLogin ? 'Welcome Back' : 'Create Account' }}
          </h1>
          <p class="text-gray-600 text-sm">
            {{ isLogin ? 'Sign in to your account' : 'Start your free trial today' }}
          </p>
        </div>

        <!-- Mobile Branding -->
        <div class="lg:hidden space-y-1 mb-4">
          <h1 class="text-2xl font-bold text-indigo-600">Stockly</h1>
          <h1 class="text-2xl font-bold text-gray-900">
            {{ isLogin ? 'Welcome Back' : 'Create Account' }}
          </h1>
          <p class="text-gray-600 text-xs">
            {{ isLogin ? 'Sign in to your account' : 'Start your free trial today' }}
          </p>
        </div>

        <!-- Form Card -->
        <div ref="formCard" class="lg:bg-white lg:rounded-2xl lg:shadow-md lg:p-8 p-0 space-y-2">
          <!-- Login Form -->
          <div v-if="isLogin" class="space-y-4">
            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-3">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  id="email"
                  type="email"
                  v-model="loginData.email"
                  placeholder="john@example.com"
                  required
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              <div>
                <div class="flex items-center justify-between mb-2">
                  <label for="password" class="block text-sm font-medium text-gray-700"
                    >Password</label
                  >
                  <a href="#" class="text-sm text-indigo-600 hover:underline">Forgot password?</a>
                </div>
                <div class="relative">
                  <input
                    id="password"
                    :type="showLoginPassword ? 'text' : 'password'"
                    v-model="loginData.password"
                    placeholder="Enter your password"
                    required
                    class="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    @click="showLoginPassword = !showLoginPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      v-if="!showLoginPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="loginData.rememberMe"
                  class="w-4 h-4 text-indigo-600 rounded border-gray-300"
                />
                <label class="ml-2 text-sm text-gray-600">Remember me</label>
              </div>

              <div v-if="loginError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-700">{{ loginError }}</p>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading">Signing in...</span>
                <span v-else>Sign In</span>
              </button>

              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <button
                type="button"
                @click="useDemoAccount"
                :disabled="isLoading"
                class="w-full py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition disabled:opacity-50"
              >
                Try Demo Account
              </button>
            </form>

            <!-- Sign Up Link -->
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Don't have an account?
                <button
                  @click="switchToRegister"
                  class="font-semibold text-indigo-600 hover:underline ml-1"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          <!-- Register Form -->
          <div v-else class="space-y-4">
            <div class="hidden lg:block mb-4">
              <h2 class="text-lg font-semibold text-gray-800">Sign up</h2>
              <p class="text-sm text-gray-600">Enter your information to create your account</p>
            </div>

            <!-- Register Form -->
            <form @submit.prevent="handleRegister" class="space-y-2.5">
              <div class="grid grid-cols-2 gap-2 lg:gap-4">
                <div>
                  <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2"
                    >First name</label
                  >
                  <input
                    type="text"
                    v-model="registerData.username"
                    placeholder="John"
                    required
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2"
                    >Last name</label
                  >
                  <input
                    type="text"
                    v-model="registerData.Last_name"
                    placeholder="Doe"
                    required
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  v-model="registerData.email"
                  placeholder="john@example.com"
                  required
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                />
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2"
                  >Company name</label
                >
                <input
                  type="text"
                  v-model="registerData.company"
                  placeholder="Your company name"
                  required
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                />
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2"
                  >Phone (Optional)</label
                >
                <input
                  type="tel"
                  v-model="registerData.telephone"
                  placeholder="+237 675 453 456"
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                />
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2"
                  >Password</label
                >
                <div class="relative">
                  <input
                    :type="showRegisterPassword ? 'text' : 'password'"
                    v-model="registerData.password"
                    placeholder="Create a password"
                    required
                    minlength="6"
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                  />
                  <button
                    type="button"
                    @click="showRegisterPassword = !showRegisterPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      v-if="!showRegisterPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 lg:w-5 lg:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 lg:w-5 lg:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2"
                  >Confirm password</label
                >
                <div class="relative">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    minlength="6"
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      v-if="!showConfirmPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 lg:w-5 lg:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 lg:w-5 lg:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  v-model="registerData.accept_terms"
                  required
                  class="mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300"
                />
                <label class="text-xs lg:text-sm text-gray-600">
                  I agree to the
                  <span class="text-indigo-600 hover:underline cursor-pointer"
                    >Terms of Service</span
                  >
                  and
                  <span class="text-indigo-600 hover:underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              <div class="flex items-start space-x-2">
                <input
                  type="checkbox"
                  v-model="marketingOptIn"
                  class="mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300"
                />
                <label class="text-xs lg:text-sm text-gray-600"
                  >Send me updates and marketing emails</label
                >
              </div>

              <div
                v-if="registerError"
                class="p-3 lg:p-4 bg-red-50 border border-red-200 lg:rounded-lg rounded mt-2"
              >
                <p class="text-xs lg:text-sm text-red-700">{{ registerError }}</p>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-2.5 lg:py-3 rounded-lg lg:rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition transform hover:scale-105 text-sm lg:text-base mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading">Creating account...</span>
                <span v-else>Create account →</span>
              </button>
            </form>

            <!-- Sign In Link -->
            <p class="text-center text-xs lg:text-sm text-gray-600 mt-3">
              Already have an account?
              <button
                @click="switchToLogin"
                class="font-semibold text-indigo-600 hover:underline ml-1"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { gsap } from "gsap";

const router = useRouter()
const authStore = useAuthStore()

// Refs for GSAP animations
const leftSection = ref(null)
const rightSection = ref(null)
const formCard = ref(null)
const heroImage = ref(null)

// State management
const isLogin = ref(true)
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)
const marketingOptIn = ref(false)
const loginError = ref('')
const registerError = ref('')
const isLoading = ref(false)
const confirmPassword = ref('')

// Login data
const loginData = ref({
  email: '',
  password: '',
  rememberMe: false,
})
// Register data
const registerData = ref({
  username: '',
  Last_name: '',
  email: '',
  telephone: '',
  company: '',
  password: '',
  accept_terms: false,
})

// Computed properties for form validation
const isLoginFormValid = computed(() => {
  return loginData.value.email && loginData.value.password
})

const isRegisterFormValid = computed(() => {
  return (
    registerData.value.username &&
    registerData.value.Last_name &&
    registerData.value.email &&
    registerData.value.company &&
    registerData.value.password &&
    confirmPassword.value &&
    registerData.value.accept_terms
  )
})

// Safe error clearing method
const clearErrors = () => {
  loginError.value = ''
  registerError.value = ''
  if (authStore && typeof authStore.error !== 'undefined') {
    if (typeof authStore.clearError === 'function') {
      authStore.clearError()
    } else {
      authStore.error = ''
    }
  }
}

// Switch to Register with slide animation
const switchToRegister = async () => {
  // Animate sections sliding to the left
  await animateSectionsToLeft()

  // Wait for animation to complete
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Switch to register
  isLogin.value = false

  // Wait for DOM update
  await nextTick()

  // Animate sections in from the right
  animateSectionsFromRight()

  clearErrors()
}

// Switch to Login with slide animation
const switchToLogin = async () => {
  // Animate sections sliding to the right
  await animateSectionsToRight()

  // Wait for animation to complete
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Switch to login
  isLogin.value = true

  // Wait for DOM update
  await nextTick()

  // Animate sections in from the left
  animateSectionsFromLeft()

  clearErrors()
}

// GSAP Animation: Slide sections to the left (Login → Register)
const animateSectionsToLeft = () => {
  const tl = gsap.timeline()

  tl.to([leftSection.value, rightSection.value], {
    duration: 0.5,
    x: '-100%',
    opacity: 0,
    ease: 'power2.inOut',
  })

  return tl
}

// GSAP Animation: Slide sections from the right (Register appears)
const animateSectionsFromRight = () => {
  const tl = gsap.timeline()

  // Set initial position off-screen to the right
  gsap.set([leftSection.value, rightSection.value], {
    x: '100%',
    opacity: 0,
  })

  // Animate in from right
  tl.to([leftSection.value, rightSection.value], {
    duration: 0.5,
    x: '0%',
    opacity: 1,
    ease: 'power2.out',
  })

  return tl
}

// GSAP Animation: Slide sections to the right (Register → Login)
const animateSectionsToRight = () => {
  const tl = gsap.timeline()

  tl.to([leftSection.value, rightSection.value], {
    duration: 0.5,
    x: '100%',
    opacity: 0,
    ease: 'power2.inOut',
  })

  return tl
}

// GSAP Animation: Slide sections from the left (Login appears)
const animateSectionsFromLeft = () => {
  const tl = gsap.timeline()

  // Set initial position off-screen to the left
  gsap.set([leftSection.value, rightSection.value], {
    x: '-100%',
    opacity: 0,
  })

  // Animate in from left
  tl.to([leftSection.value, rightSection.value], {
    duration: 0.5,
    x: '0%',
    opacity: 1,
    ease: 'power2.out',
  })

  return tl
}

// Initial page load animation
const animatePageIn = () => {
  const tl = gsap.timeline()

  // Animate left section in
  if (leftSection.value) {
    tl.fromTo(
      leftSection.value,
      {
        x: -50,
        opacity: 0,
      },
      {
        duration: 0.8,
        x: 0,
        opacity: 1,
        ease: 'power2.out',
      },
    )
  }

  // Animate right section in
  tl.fromTo(
    rightSection.value,
    {
      x: 50,
      opacity: 0,
    },
    {
      duration: 0.8,
      x: 0,
      opacity: 1,
      ease: 'power2.out',
    },
    0.2,
  )

  // Animate form card in
  tl.fromTo(
    formCard.value,
    {
      y: 30,
      opacity: 0,
    },
    {
      duration: 0.6,
      y: 0,
      opacity: 1,
      ease: 'power2.out',
    },
    0.5,
  )

  return tl
}

// Handle login
const handleLogin = async () => {
  if (!isLoginFormValid.value) {
    loginError.value = 'Please fill in all required fields'
    return
  }

  isLoading.value = true
  loginError.value = ''

  try {
    // Simulate API call

    // If using auth store, call login method
    if (authStore && typeof authStore.login === 'function') {
      await authStore.login(loginData.value.email, loginData.value.password)
    }
  } catch (error) {
    loginError.value = error.message || 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Handle register
const handleRegister = async () => {
  if (!isRegisterFormValid.value) {
    registerError.value = 'Please fill in all required fields'
    return
  }

  if (registerData.value.password !== confirmPassword.value) {
    registerError.value = 'Passwords do not match'
    return
  }

  if (registerData.value.password.length < 6) {
    registerError.value = 'Password must be at least 6 characters'
    return
  }

  isLoading.value = true
  registerError.value = ''

  try {
    // Simulate API call

console.log(registerData.value);

    // If using auth store, call register method
    if (authStore && typeof authStore.register === 'function') {
      await authStore.register(registerData.value)
    }

    // Navigate to activation
    router.push('/activation')
  } catch (error) {
    registerError.value = error.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Demo account login
const useDemoAccount = () => {
  loginData.value.email = 'demo@stockly.com'
  loginData.value.password = 'demo123'
  handleLogin()
}

// Go back to home
const goBack = () => {
  router.push('/')
}

// Initialize animations when component mounts
onMounted(() => {
  animatePageIn()
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Custom focus styles */
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Orange accent for some interactive elements */
button:hover .text-indigo-600 {
  color: #f97316; /* Orange-500 */
}

/* Animation for form errors */
.error-shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
</style>
