<template>
 <header
  :class="[
    'fixed top-0 transition-all duration-300 z-50',
    isScrolled
      ? 'max-w-5xl left-1/2 -translate-x-1/2 mx-auto mt-3 rounded-xl shadow-lg bg-white'
      : 'w-full left-0 justify-center bg-white shadow-sm'
  ]"
>
    <div class="px-6 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div class="bg-black text-white p-2 rounded-lg">📊</div>
        <span class="font-bold text-lg">StockFlow</span>
      </div>

      <!-- Desktop navigation -->
      <nav class="hidden md:flex space-x-8 text-gray-600 font-medium">
        <router-link to="" class="hover:text-black transition">Features</router-link>
        <router-link to="" class="hover:text-black transition">Benefits</router-link>
        <router-link to="" class="hover:text-black transition">Reviews</router-link>
        <router-link to="" class="hover:text-black transition">Pricing</router-link>
      </nav>

      <!-- CTA buttons (desktop only) -->
      <div class="hidden md:flex items-center space-x-5">
        <router-link to="/login" class="text-gray-600 hover:text-black transition">
          Sign In
        </router-link>
        <router-link
          to="/register"
          class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2"
        >
          <span>Get Started</span>
          <span>→</span>
        </router-link>
      </div>

      <!-- Mobile hamburger button -->
      <button
        class="md:hidden flex flex-col space-y-1 focus:outline-none"
        @click="isOpen = !isOpen"
      >
        <span class="w-6 h-0.5 bg-black"></span>
        <span class="w-6 h-0.5 bg-black"></span>
        <span class="w-6 h-0.5 bg-black"></span>
      </button>
    </div>

    <!-- Mobile dropdown menu -->
    <div
      v-if="isOpen"
      class="md:hidden px-6 py-4 bg-white border-t space-y-4 text-gray-600 font-medium"
    >
      <router-link to="" class="block hover:text-black transition">Features</router-link>
      <router-link to="" class="block hover:text-black transition">Benefits</router-link>
      <router-link to="" class="block hover:text-black transition">Reviews</router-link>
      <router-link to="" class="block hover:text-black transition">Pricing</router-link>
      <hr />
      <router-link to="/login" class="block hover:text-black transition">Sign In</router-link>
      <router-link
        to="/register"
        class="block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Get Started →
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const isScrolled = ref(false)
const isOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>
