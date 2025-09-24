<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-3 grid grid-cols-3 items-center ">

      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div class="bg-black text-white p-2 rounded-lg">
          📊
        </div>
        <span class="font-bold text-lg">StockFlow</span>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8 text-gray-600 font-medium">
        <router-link
          to=""
          class="hover:text-black transition"
        >
          Features
        </router-link>
        <router-link
          to=""
          class="hover:text-black transition"
        >
          Benefits
        </router-link>
        <router-link
          to=""
          class="hover:text-black transition"
        >
          Reviews
        </router-link>
        <router-link
          to=""
          class="hover:text-black transition"
        >
          Pricing
        </router-link>
      </nav>

      <!-- CTA buttons -->
      <div class="flex items-center justify-end space-x-5">
        <button class="text-gray-600 hover:text-black transition">
          <router-link to="/login">
            Sign In
          </router-link>

        </button>
        <button class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2">
          <router-link to="/register">
              <span>Get Started</span>
          <span>→</span>
          </router-link>

        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>
