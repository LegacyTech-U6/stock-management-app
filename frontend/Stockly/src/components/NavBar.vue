<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import Iventello from '@/assets/icon svg/Iventello.vue'
const isScrolled = ref(false)
const isOpen = ref(false)

// Détecter le scroll vertical
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navItems = ['Features', 'Tarifs', 'Documentation']
</script>

<template>
  <!-- HEADER -->
  <header
    :class="[
      'fixed top-0 w-full z-50 transition-all ease-in duration-300 backdrop-blur',
      isScrolled ? 'shadow-md text-white' : 'text-white'
    ]"
  >
    <!-- Fond animé identique au Hero -->
    <div class="absolute inset-0 bg-animated-gradient -z-10"></div>

    <div class="px-6 max-w-7xl w-full mx-auto py-4 flex items-center justify-between relative z-10">
      <!-- Logo -->
      <div class="flex items-center gap-2">
       
        <span class="text-lg font-semibold tracking-tight">Iventello</span>
      </div>

      <!-- Navigation Desktop -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item"
          href="#"
          class="text-white/90 hover:text-indigo-300 transition-colors font-light"
        >
          {{ item }}
        </a>
      </nav>

      <!-- Boutons Desktop -->
      <div class="hidden md:flex items-center gap-4">
        <router-link
          to="/login"
          class="text-sm text-white/80 hover:text-white transition-colors font-light"
        >
          Connexion
        </router-link>
        <router-link
          to="/register"
          class="px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors font-light"
        >
          Commencer
        </router-link>
      </div>

      <!-- Menu Mobile -->
      <button class="md:hidden relative z-10" @click="isOpen = !isOpen">
        <Menu v-if="!isOpen" :size="26" :stroke-width="1.5" />
        <X v-else :size="26" :stroke-width="1.5" />
      </button>
    </div>

    <!-- Menu Mobile -->
    <div
      v-if="isOpen"
      class="md:hidden px-6 py-6 space-y-6 transition-all relative z-10"
    >
      <div class="absolute inset-0 bg-animated-gradient -z-10 rounded-lg"></div>
      <a
        v-for="item in navItems"
        :key="item"
        href="#"
        class="block text-white/90 hover:text-indigo-300 transition-colors font-light"
      >
        {{ item }}
      </a>

      <div class="pt-4 space-y-4">
        <router-link
          to="/login"
          class="block text-white/90 hover:text-indigo-300 transition-colors font-light"
        >
          Connexion
        </router-link>
        <router-link
          to="/register"
          class="block px-6 py-3 bg-gray-900 text-white text-sm text-center rounded-lg hover:bg-gray-800 transition-colors font-light"
        >
          Commencer
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
body {
  padding-top: 70px;
}

/* 🌈 Fond animé synchronisé avec le Hero */
.bg-animated-gradient,
.bg-animated-gradient::before {
  background: linear-gradient(120deg, #0f172a, #0d9488, #1e293b, #0f766e);
  background-size: 400% 400%;
  animation: gradientFlow 12s ease infinite;
}

.bg-animated-gradient {
  position: absolute;
  inset: 0;
  z-index: -10;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
