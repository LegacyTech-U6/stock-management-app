<template>
  <div class="h-full flex flex-col">
    <!-- Unified Sidebar (Expands on Hover) -->
    <aside
      @mouseenter="handleSidebarEnter"
      @mouseleave="handleSidebarLeave"
      class="h-full bg-white flex flex-col transition-all duration-300 ease-in-out"
      :class="[
        sidebarExpanded ? 'w-80' : 'w-[72px]',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Header -->
      <div class="relative px-5 py-5 border-b border-gray-200">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-4">
          <div class="flex items-center justify-center min-w-[44px] w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
            <Package :size="22" class="text-white" />
          </div>
          <transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-show="sidebarExpanded" class="overflow-hidden">
              <h1 class="text-lg font-bold text-gray-900 whitespace-nowrap">StockFlow</h1>
            </div>
          </transition>
        </div>

        <!-- Quick Search (only when expanded) -->
        <transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-show="sidebarExpanded" class="relative">
            <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Quick search"
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </transition>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 custom-scrollbar"
        :class="sidebarExpanded ? 'px-4' : 'px-3'"
      >
        <!-- Enterprise Badge (only when expanded) -->
        <transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="activeEntreprise && sidebarExpanded" class="mb-4 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div class="flex items-center gap-2 mb-1">
              <Building2 :size="16" class="text-blue-600" />
              <span class="text-xs font-semibold text-blue-600 uppercase tracking-wide">Active Enterprise</span>
            </div>
            <p class="text-sm font-bold text-gray-900 truncate">{{ activeEntreprise.name }}</p>
          </div>
        </transition>

        <div class="mb-3" :class="sidebarExpanded ? 'px-3' : 'px-0'">
          <transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <span v-show="sidebarExpanded" class="text-xs font-bold text-gray-400 uppercase tracking-wider">Menu</span>
          </transition>
        </div>

        <!-- Menu Items -->
        <div class="space-y-1">
          <router-link
            :to="dashboardRoute"
            class="flex items-center gap-3 rounded-xl text-sm font-medium transition-all relative group"
            :class="[
              sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center',
              route.path === dashboardRoute ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-gray-50'
            ]"
            @click="closeMobileMenu"
          >
            <LayoutDashboard :size="20" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Dashboard</span>
            </transition>
            <div v-if="route.path === dashboardRoute && !sidebarExpanded" class="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"></div>
          </router-link>

          <router-link
            :to="productsRoute"
            class="flex items-center gap-3 rounded-xl text-sm font-medium transition-all relative group"
            :class="[
              sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center',
              route.path === productsRoute ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-gray-50'
            ]"
            @click="closeMobileMenu"
          >
            <Package :size="20" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Products</span>
            </transition>
            <div v-if="route.path === productsRoute && !sidebarExpanded" class="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"></div>
          </router-link>

          <router-link
            :to="categoriesRoute"
            class="flex items-center gap-3 rounded-xl text-sm font-medium transition-all relative group"
            :class="[
              sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center',
              route.path === categoriesRoute ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-gray-50'
            ]"
            @click="closeMobileMenu"
          >
            <FolderTree :size="20" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Categories</span>
            </transition>
            <div v-if="route.path === categoriesRoute && !sidebarExpanded" class="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"></div>
          </router-link>

          <router-link
            :to="salesRoute"
            class="flex items-center gap-3 rounded-xl text-sm font-medium transition-all relative group"
            :class="[
              sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center',
              route.path === salesRoute ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-gray-50'
            ]"
            @click="closeMobileMenu"
          >
            <ShoppingCart :size="20" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Sales</span>
            </transition>
            <div v-if="route.path === salesRoute && !sidebarExpanded" class="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"></div>
          </router-link>

          <router-link
            :to="invoicesRoute"
            class="flex items-center gap-3 rounded-xl text-sm font-medium transition-all relative group"
            :class="[
              sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center',
              route.path === invoicesRoute ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-gray-50'
            ]"
            @click="closeMobileMenu"
          >
            <FileText :size="20" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Invoices</span>
            </transition>
            <div v-if="route.path === invoicesRoute && !sidebarExpanded" class="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"></div>
          </router-link>

          <router-link
            :to="clientsRoute"
            class="flex items-center gap-3 rounded-xl text-sm font-medium transition-all relative group"
            :class="[
              sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center',
              route.path === clientsRoute ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-gray-50'
            ]"
            @click="closeMobileMenu"
          >
            <Users :size="20" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Clients</span>
            </transition>
            <div v-if="route.path === clientsRoute && !sidebarExpanded" class="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"></div>
          </router-link>
        </div>
      </nav>

      <!-- Bottom Settings -->
      <div class="border-t border-gray-200 py-4 space-y-1"
        :class="sidebarExpanded ? 'px-5' : 'px-3'"
      >
        <button class="flex items-center gap-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all w-full"
          :class="sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center'"
        >
          <Settings :size="20" />
          <transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <span v-show="sidebarExpanded">Settings</span>
          </transition>
        </button>

        <button class="flex items-center gap-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all w-full"
          :class="sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center'"
        >
          <Moon :size="20" />
          <transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <span v-show="sidebarExpanded">Dark mode</span>
          </transition>
        </button>

        <button class="flex items-center gap-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all w-full"
          :class="sidebarExpanded ? 'px-4 py-3' : 'w-11 h-11 justify-center'"
        >
          <HelpCircle :size="20" />
          <transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <span v-show="sidebarExpanded">Help</span>
          </transition>
        </button>
      </div>

      <!-- User Profile Footer -->
      <div class="border-t border-gray-200 p-4"
        :class="sidebarExpanded ? 'px-5' : 'px-3'"
      >
        <div v-if="!sidebarExpanded" class="flex flex-col items-center gap-3">
          <div class="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              class="w-11 h-11 rounded-xl border-2 border-gray-200 object-cover cursor-pointer hover:border-blue-400 transition-colors"
            />
            <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <button
            @click="logoutEntreprise"
            class="flex items-center justify-center w-11 h-11 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-red-700 transition-colors"
          >
            <LogOut :size="18" />
          </button>
        </div>

        <div v-else class="space-y-3">
          <div class="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              alt="Demo User"
              class="w-10 h-10 rounded-xl border-2 border-gray-200 object-cover"
            />
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Demo User</h4>
              <p class="text-xs text-gray-500">user@demo.com</p>
            </div>
          </div>

          <button
            @click="logoutEntreprise"
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-red-700 font-medium text-sm transition-colors"
          >
            <LogOut :size="16" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile Menu Button -->
    <button
      @click="sidebarOpen = true"
      class="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      aria-label="Open menu"
    >
      <Menu :size="22" class="text-gray-700" />
    </button>

    <!-- Close button for mobile -->
    <button
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed top-4 right-4 z-50 lg:hidden flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      aria-label="Close menu"
    >
      <X :size="22" class="text-gray-700" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useRouter, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  LogOut,
  Menu,
  Building2,
  Search,
  Settings,
  Moon,
  HelpCircle,
  FolderTree,
  X
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const entrepriseStore = useEntrepriseStore()

const currentUuid = computed(() => route.params.uuid)

const dashboardRoute = computed(() => `/${currentUuid.value}/dashboard`)
const salesRoute = computed(() => `/${currentUuid.value}/sales`)
const productsRoute = computed(() => `/${currentUuid.value}/products`)
const clientsRoute = computed(() => `/${currentUuid.value}/clients`)
const invoicesRoute = computed(() => `/${currentUuid.value}/invoices`)
const categoriesRoute = computed(() => `/${currentUuid.value}/categories`)

const activeEntreprise = computed(() => entrepriseStore.activeEntreprise)

const sidebarOpen = ref(false)
const sidebarExpanded = ref(false)

// Emit sidebar state changes
const emit = defineEmits(['sidebar-state-changed'])

const handleSidebarEnter = () => {
  sidebarExpanded.value = true
  emit('sidebar-state-changed', true)
  // Also dispatch custom event for parent component
  window.dispatchEvent(new CustomEvent('sidebar-state-changed', {
    detail: { expanded: true }
  }))
}

const handleSidebarLeave = () => {
  sidebarExpanded.value = false
  emit('sidebar-state-changed', false)
  // Also dispatch custom event for parent component
  window.dispatchEvent(new CustomEvent('sidebar-state-changed', {
    detail: { expanded: false }
  }))
}

const closeMobileMenu = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}

const logoutEntreprise = () => {
  entrepriseStore.clearActiveEntreprise()
  router.push('/ad/admin')
}

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
