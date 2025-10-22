<template>
  <div class="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
    <!-- Left Section - Dynamic Content -->
    <div
      class="hidden lg:flex lg:flex-1 flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-12 space-y-8 transition-all duration-500 ease-in-out"
      :class="isLogin ? 'slide-in-left' : 'slide-out-left'"
    >
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-gray-900">{{ isLogin ? 'Stockly' : 'Join Stockly' }}</h1>
        <p class="text-lg text-gray-600">
          {{ isLogin ? 'Your Inventory Management Solution' : 'Manage your inventory and sales like never before' }}
        </p>
      </div>

      <div class="relative w-full max-w-sm">
        <div class="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
            alt="Team collaboration"
            class="w-full h-80 object-cover"
          />
        </div>
      </div>

      <div class="space-y-2 text-center max-w-sm">
        <h2 class="text-2xl font-bold text-blue-600">
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

    <!-- Right Section - Dynamic Form -->
    <div
      class="flex-1 flex w-full lg:h-screen items-center justify-center lg:p-28 pt-20 pb-8 px-4 lg:px-0 lg:bg-background bg-transparent transition-all duration-500 ease-in-out"
      :class="isLogin ? 'slide-in-right' : 'slide-out-right'"
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <!-- Dynamic Branding -->
        <div class="hidden lg:block text-center space-y-2">
          <h1 class="text-3xl font-bold text-primary">Stockly</h1>
          <h1 class="text-3xl font-bold text-gray-900">{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h1>
          <p class="text-gray-600 text-sm">{{ isLogin ? 'Sign in to your account' : 'Start your free trial today' }}</p>
        </div>

        <!-- Mobile Branding -->
        <div class="lg:hidden space-y-1 mb-4">
          <h1 class="text-2xl font-bold text-primary">Stockly</h1>
          <h1 class="text-2xl font-bold text-gray-900">{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h1>
          <p class="text-gray-600 text-xs">{{ isLogin ? 'Sign in to your account' : 'Start your free trial today' }}</p>
        </div>

        <!-- Form Card -->
        <div class="lg:bg-white lg:rounded-2xl lg:shadow-md lg:p-8 p-0 space-y-2">
          <!-- Login Form -->
          <div v-if="isLogin" class="space-y-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">Welcome back</h2>
              <p class="text-sm text-gray-600 mt-1">Enter your credentials to continue</p>
            </div>

            <!-- Social Login -->
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  class="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  class="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
              </div>
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">OR CONTINUE WITH EMAIL</span>
                </div>
              </div>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-3">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  v-model="loginData.email"
                  placeholder="john@example.com"
                  required
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>

              <div>
                <div class="flex items-center justify-between mb-2">
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <div class="relative">
                  <input
                    id="password"
                    :type="showLoginPassword ? 'text' : 'password'"
                    v-model="loginData.password"
                    placeholder="Enter your password"
                    required
                    class="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    @click="showLoginPassword = !showLoginPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg v-if="!showLoginPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="loginData.rememberMe"
                  class="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <label class="ml-2 text-sm text-gray-600">Remember me</label>
              </div>

              <div v-if="loginError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-700">{{ loginError }}</p>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <button @click="toggleForm" class="font-semibold text-blue-600 hover:underline ml-1">
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

            <!-- Social Login -->
            <div class="space-y-2 lg:mb-4">
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  class="flex items-center justify-center py-2 px-4 lg:border lg:border-gray-300 lg:rounded-lg lg:hover:bg-gray-50 transition border-0"
                >
                  <svg class="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="flex items-center justify-center py-2 px-4 lg:border lg:border-gray-300 lg:rounded-lg lg:hover:bg-gray-50 transition border-0"
                >
                  <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </button>
              </div>
              <div class="relative lg:block hidden">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">OR CONTINUE WITH EMAIL</span>
                </div>
              </div>
            </div>

            <!-- Register Form -->
            <form @submit.prevent="handleRegister" class="space-y-2.5">
              <div class="grid grid-cols-2 gap-2 lg:gap-4">
                <div>
                  <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">First name</label>
                  <input
                    type="text"
                    v-model="registerData.username"
                    placeholder="John"
                    required
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Last name</label>
                  <input
                    type="text"
                    v-model="registerData.last_name"
                    placeholder="Doe"
                    required
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Email</label>
                <input
                  type="email"
                  v-model="registerData.email"
                  placeholder="john@example.com"
                  required
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
                />
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Company name</label>
                <input
                  type="text"
                  v-model="registerData.company"
                  placeholder="Your company name"
                  required
                  class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
                />
              </div>

              <div class="grid grid-cols-2 gap-2 lg:gap-4">
                <div>
                  <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Business type</label>
                  <select
                    v-model="registerData.role"
                    required
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition appearance-none text-sm"
                  >
                    <option value="">Select role</option>
                    <option value="owner">Owner</option>
                    <option value="manager">Manager</option>
                    <option value="invoice_head">Invoice Head</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    v-model="registerData.telephone"
                    placeholder="+237 675 453 456"
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Password</label>
                <div class="relative">
                  <input
                    :type="showRegisterPassword ? 'text' : 'password'"
                    v-model="registerData.password"
                    placeholder="Create a password"
                    required
                    minlength="6"
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 lg:w-5 lg:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-xs lg:text-sm font-medium text-gray-700 mb-1 lg:mb-2">Confirm password</label>
                <div class="relative">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    minlength="6"
                    class="w-full px-3 lg:px-4 py-2 bg-white lg:bg-gray-50 border border-gray-300 lg:rounded-lg rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm"
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 lg:w-5 lg:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  v-model="registerData.accept_terms"
                  required
                  class="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <label class="text-xs lg:text-sm text-gray-600">
                  I agree to the
                  <span class="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>
                  and
                  <span class="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              <div class="flex items-start space-x-2">
                <input
                  type="checkbox"
                  v-model="marketingOptIn"
                  class="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <label class="text-xs lg:text-sm text-gray-600">Send me updates and marketing emails</label>
              </div>

              <div v-if="registerError" class="p-3 lg:p-4 bg-red-50 border border-red-200 lg:rounded-lg rounded mt-2">
                <p class="text-xs lg:text-sm text-red-700">{{ registerError }}</p>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-2.5 lg:py-3 rounded-lg lg:rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105 text-sm lg:text-base mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading">Creating account...</span>
                <span v-else>Create account →</span>
              </button>
            </form>

            <!-- Sign In Link -->
            <p class="text-center text-xs lg:text-sm text-gray-600 mt-3">
              Already have an account?
              <button @click="toggleForm" class="font-semibold text-blue-600 hover:underline ml-1">
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
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

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
  rememberMe: false
})

// Register data
const registerData = ref({
  username: '',
  last_name: '',
  email: '',
  telephone: '',
  company: '',
  role: '',
  password: '',
  accept_terms: false,
})

// Computed properties for form validation
const isLoginFormValid = computed(() => {
  return loginData.value.email && loginData.value.password
})

const isRegisterFormValid = computed(() => {
  return registerData.value.username &&
    registerData.value.last_name &&
    registerData.value.email &&
    registerData.value.company &&
    registerData.value.role &&
    registerData.value.password &&
    confirmPassword.value &&
    registerData.value.accept_terms
})

// Safe error clearing method
const clearErrors = () => {
  loginError.value = ''
  registerError.value = ''
  // If authStore has an error property, clear it safely
  if (authStore && typeof authStore.error !== 'undefined') {
    // Try to clear the error if the method exists, otherwise set it to empty string
    if (typeof authStore.clearError === 'function') {
      authStore.clearError()
    } else if (typeof authStore.setError === 'function') {
      authStore.setError('')
    } else {
      // If we can't clear it, at least set our local errors
      authStore.error = ''
    }
  }
}

// Toggle between login and register
const toggleForm = () => {
  isLogin.value = !isLogin.value
  clearErrors()
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
    await authStore.login(loginData.value.email, loginData.value.password)

    if (authStore.token) {
      console.log('✅ Login successful:', authStore.user)
      router.push('/ad/admin')
    } else {
      loginError.value = authStore.error || 'Login failed. Please check your credentials.'
    }
  } catch (err) {
    console.error('Login error:', err)
    loginError.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Handle register
const handleRegister = async () => {
  // Reset errors
  registerError.value = ''
  clearErrors()

  // Validation
  if (!isRegisterFormValid.value) {
    registerError.value = 'Please fill in all required fields'
    return
  }

  if (registerData.value.password !== confirmPassword.value) {
    registerError.value = 'Passwords do not match'
    return
  }

  if (registerData.value.password.length < 6) {
    registerError.value = 'Password must be at least 6 characters long'
    return
  }

  if (!registerData.value.accept_terms) {
    registerError.value = 'You must accept the terms and conditions'
    return
  }

  isLoading.value = true

  try {
    // Prepare registration data
    const registrationData = {
      username: registerData.value.username,
      last_name: registerData.value.last_name,
      email: registerData.value.email,
      telephone: registerData.value.telephone || '',
      company: registerData.value.company,
      role: registerData.value.role,
      password: registerData.value.password,
    }

    console.log('Registration data:', registrationData)

    await authStore.register(registrationData)

    if (authStore.error) {
      registerError.value = authStore.error
    } else {
      console.log('✅ Registration successful')
      // Redirect to company setup or dashboard
      router.push('/company')
    }
  } catch (err) {
    console.error('Registration error:', err)
    registerError.value = 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Demo account functionality
const useDemoAccount = () => {
  loginData.value.email = 'demo@stockly.com'
  loginData.value.password = 'demopassword123'
  handleLogin()
}

const goBack = () => {
  router.back()
}

// Initialize based on route
onMounted(() => {
  const route = router.currentRoute.value
  if (route.path === '/register') {
    isLogin.value = false
  }

  // Clear any existing errors
  clearErrors()
})
</script>

<style scoped>
/* Animation classes */
.slide-in-left {
  animation: slideInLeft 0.5s ease-in-out forwards;
}

.slide-out-left {
  animation: slideOutLeft 0.5s ease-in-out forwards;
}

.slide-in-right {
  animation: slideInRight 0.5s ease-in-out forwards;
}

.slide-out-right {
  animation: slideOutRight 0.5s ease-in-out forwards;
}

@keyframes slideInLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutLeft {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slideInRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
