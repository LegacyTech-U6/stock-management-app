<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import type { isCarouselItem } from 'naive-ui/es/carousel/src/CarouselItem'

const isScrolled = ref(false)
const isOpen = ref(false)

const handleScroll = () => {
   isScrolled.value =  window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navItems = ['Feutures', 'Tarifs', 'Documentation']
</script>

<template>
  <header
  :style="{  backgroundImage: `url('/src/assets/image/branding.png')`, }"
    :class="[
      'fixed top-0 transition-all ease-in duration-300 z-50',
      isScrolled
        ? ' backdrop-blur bg-indigo-500 text-white w-full justify-center'
        : 'w-full justify-center items-center bg-gray-50 backdrop-blur  border-gray-200'
    ]"
  >
    <div class="px-6  w-5xl space-x-2 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gray-900 flex items-center justify-center text-white text-sm font-medium">
          S
        </div>
        <span class="text-lg font-light tracking-tight">Stockly</span>
      </div>

      <nav :class="['hidden md:flex items-center gap-8',isScrolled ? 'text-white': 'text-black']">
        <a
          v-for="item in navItems"
          :key="item"
          href="#"
          class="text-sm  hover:text-gray-900 transition-colors font-light"
        >
          {{ item }}
        </a>
      </nav>

      <div class="hidden md:flex items-center gap-4">
        <router-link
          to="/login"
          class="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
        >
          Connexion
        </router-link>
        <router-link
          to="/register"
          class="px-6 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors font-light"
        >
          Commencer
        </router-link>
      </div>

      <button
        class="md:hidden"
        @click="isOpen = !isOpen"
      >
        <Menu v-if="!isOpen" :size="24" :stroke-width="1.5" />
        <X v-else :size="24" :stroke-width="1.5" />
      </button>
    </div>

    <div
      v-if="isOpen"
      class="md:hidden px-6 py-6 border-t border-gray-200 space-y-6 bg-white"
    >
      <a
        v-for="item in navItems"
        :key="item"
        href="#"
        class="block text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
      >
        {{ item }}
      </a>
      <div class="pt-4 border-t border-gray-200 space-y-4">
        <router-link
          to="/login"
          class="block text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
        >
          Connexion
        </router-link>
        <router-link
          to="/register"
          class="block px-6 py-3 bg-gray-900 text-white text-sm text-center hover:bg-gray-800 transition-colors font-light"
        >
          Commencer
        </router-link>
      </div>
    </div>
  </header>
</template>
