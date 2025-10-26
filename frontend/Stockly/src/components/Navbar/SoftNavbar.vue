<template>
  <nav class="bg-white border-b fixed w-full mb-20 border-gray-200 px-6 py-3 shadow-sm">
    <div class="flex items-center justify-between">
      <!-- Left Section - Search -->
      <div class="flex items-center flex-1 max-w-md">
        <div class="relative w-full">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
          <span
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-medium"
          >
            ⌘K
          </span>
        </div>
      </div>

      <!-- Right Section - Actions -->
      <div class="flex items-center gap-3 ml-6">
        <!-- Store Selector -->
        <div class="relative">
          <button
            @click="isDropdownOpen = !isDropdownOpen"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <div
              class="w-5 h-5 bg-green-600 rounded flex items-center justify-center"
            >
              <span class="text-white text-xs font-bold">{{getInitials(activeEntreprise.name)}}</span>
            </div>
            <span>{{ activeEntreprise.name }}</span>
          
          </button>
        </div>

        <!-- Add New Button -->
        <button
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all shadow-sm"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New
        </button>

        <!-- POS Button -->
        <button
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all shadow-sm"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          POS
        </button>

        <!-- Icon Buttons -->
        <button
          class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
        >
          <img
            src="https://flagcdn.com/w20/us.png"
            alt="US Flag"
            class="w-5 h-5"
          />
        </button>

        <button
          class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>

        <button
          class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span
            class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
          ></span>
        </button>

        <button
          class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <button
          class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        <!-- User Avatar -->
        <button
          class="w-9 h-9 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 transition-all overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="User"
            class="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref ,computed} from 'vue';
import { useEntrepriseStore } from '@/stores/entrepriseStore'
const entrepriseStore = useEntrepriseStore()
const activeEntreprise = computed(() => entrepriseStore.activeEntreprise)
const isDropdownOpen = ref(false);
// Generate initials from name
const getInitials = (name: string): string => {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
