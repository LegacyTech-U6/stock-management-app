<template>
  <div class="h-full fixed flex flex-col">
    <!-- Unified Sidebar -->
    <aside
      class="h-full bg-white flex flex-col transition-all duration-300 ease-in-out shadow-lg"
      :class="[
        sidebarExpanded ? 'w-64' : 'w-20',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Header -->
      <div class="relative px-4 py-6 border-b border-gray-200">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div
            class="flex items-center justify-center min-w-[40px] w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md"
          >
            <Package :size="20" class="text-white" />
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
              <p class="text-xs text-gray-500">POS System</p>
            </div>
          </transition>
        </div>
      </div>

      <!-- Expand/Collapse Button -->
      <div class="px-4 py-3 border-b border-gray-100">
        <button
          @click="toggleSidebar"
          class="w-full flex items-center justify-center p-2 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
        >
          <ChevronRight
            :size="20"
            class="text-orange-500 transition-transform duration-300"
            :class="{ 'rotate-180': sidebarExpanded }"
          />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <!-- Main Section -->
        <div class="mb-6">
          <div class="px-4 mb-2">
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span
                v-show="sidebarExpanded"
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Main
              </span>
            </transition>
          </div>

          <!-- Dashboard -->
          <router-link
            :to="dashboardRoute"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="[
              route.path === dashboardRoute
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="closeMobileMenu"
          >
            <LayoutDashboard :size="20" class="min-w-[20px]" />
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
          </router-link>


        </div>
        <!-- Inventory Section -->
        <div class="mb-6">
          <div class="px-4 mb-2">
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span
                v-show="sidebarExpanded"
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Inventory
              </span>
            </transition>
          </div>

          <!-- Products -->
          <router-link
            :to="productsRoute"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="[
              route.path === productsRoute
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="closeMobileMenu"
          >
            <Package :size="20" class="min-w-[20px]" />
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
          </router-link>

          <!-- Categories -->
          <router-link
            :to="categoriesRoute"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="[
              route.path === categoriesRoute
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="closeMobileMenu"
          >
            <FolderTree :size="20" class="min-w-[20px]" />
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
          </router-link>

          <!-- Low Stocks -->
          <router-link
            to="/low-stocks"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-700 hover:bg-gray-50"
            @click="closeMobileMenu"
          >
            <TrendingDown :size="20" class="min-w-[20px]" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Low Stocks</span>
            </transition>
          </router-link>

          <!-- Brands -->



        </div>

        <!-- Sales & Reports Section -->
        <div class="mb-6">
          <div class="px-4 mb-2">
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span
                v-show="sidebarExpanded"
                class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Sales & Reports
              </span>
            </transition>
          </div>

          <!-- Sales -->
          <router-link
            :to="salesRoute"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="[
              route.path === salesRoute
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="closeMobileMenu"
          >
            <ShoppingCart :size="20" class="min-w-[20px]" />
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
          </router-link>

          <!-- Invoices -->
          <router-link
            :to="invoicesRoute"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="[
              route.path === invoicesRoute
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="closeMobileMenu"
          >
            <FileText :size="20" class="min-w-[20px]" />
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
          </router-link>

          <!-- Clients -->
          <router-link
            :to="clientsRoute"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="[
              route.path === clientsRoute
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="closeMobileMenu"
          >
            <Users :size="20" class="min-w-[20px]" />
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
          </router-link>

          <!-- Reports (New) -->
          <router-link
            :to="reportsRoute"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="[
              route.path === reportsRoute
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="closeMobileMenu"
          >
            <BarChart3 :size="20" class="min-w-[20px]" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Reports</span>
            </transition>
          </router-link>

          <!-- Audit Trail -->
          <router-link
            :to="ActivityRoute"
            class="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="[
              route.path === ActivityRoute
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="closeMobileMenu"
          >
            <Activity :size="20" class="min-w-[20px]" />
            <transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-150"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span v-show="sidebarExpanded">Audit Trail</span>
            </transition>
          </router-link>
        </div>
      </nav>

      <!-- User Profile Footer -->
      <div class="border-t border-gray-200 p-4">
        <div v-if="!sidebarExpanded" class="flex flex-col items-center gap-3">
          <div class="relative">
            <div
              class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
            >
              {{ userInitials }}
            </div>
            <div
              class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
            ></div>
          </div>
          <button
            @click="logoutEntreprise"
            class="flex items-center justify-center w-10 h-10 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
          >
            <LogOut :size="18" />
          </button>
        </div>

        <div v-else class="space-y-3">
          <div class="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
            <div class="relative">
              <div
                class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
              >
                {{ userInitials }}
              </div>
              <div
                class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
              ></div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate">{{ userName }}</p>
              <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
            </div>
          </div>

          <button
            @click="logoutEntreprise"
            class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 font-medium text-sm transition-colors"
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

    <!-- Overlay for mobile -->
    <transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      ></div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
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
  FolderTree,
  X,
  Activity,
  ChevronRight,
  ChevronDown,
  Shield,
  Smartphone,
  Layout,
  TrendingDown,
  Tag,
  ShieldCheck,
  BarChart3,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore.js'

const router = useRouter()
const route = useRoute()
const entrepriseStore = useEntrepriseStore()
const authStore = useAuthStore()

const currentUuid = computed(() => route.params.uuid)

const dashboardRoute = computed(() => `/${currentUuid.value}/dashboar`)
const salesRoute = computed(() => `/${currentUuid.value}/sales`)
const productsRoute = computed(() => `/${currentUuid.value}/products`)
const clientsRoute = computed(() => `/${currentUuid.value}/clients`)
const invoicesRoute = computed(() => `/${currentUuid.value}/invoices`)
const categoriesRoute = computed(() => `/${currentUuid.value}/categories`)
const ActivityRoute = computed(() => `/${currentUuid.value}/AuditTrail`)
const reportsRoute = computed(() => `/${currentUuid.value}/reports`)

const activeEntreprise = computed(() => entrepriseStore.activeEntreprise)

const sidebarOpen = ref(false)
const sidebarExpanded = ref(false)

const expandedSections = reactive({
  admin: false,
  application: false,
  layouts: false,
})

const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
  emit('sidebar-state-changed', sidebarExpanded.value)
  window.dispatchEvent(
    new CustomEvent('sidebar-state-changed', {
      detail: { expanded: sidebarExpanded.value },
    })
  )
}

const toggleSection = (section) => {
  if (sidebarExpanded.value) {
    expandedSections[section] = !expandedSections[section]
  } else {
    // Expand sidebar if trying to toggle section while collapsed
    sidebarExpanded.value = true
    expandedSections[section] = true
  }
}

const emit = defineEmits(['sidebar-state-changed'])

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

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  if (authStore.token && !authStore.user) {
    await authStore.getAccount()
  }
})

const userName = computed(() => {
  if (authStore.user) {
    return `${authStore.user.username || ''} ${authStore.user.Last_name || ''}`.trim()
  }
  return 'Demo User'
})

const userEmail = computed(() => {
  return authStore.user?.email || 'demo@demo.com'
})

const userInitials = computed(() => {
  if (authStore.user) {
    const first = authStore.user.username?.[0] || ''
    const last = authStore.user.Last_name?.[0] || ''
    return `${first}${last}`.toUpperCase() || 'DU'
  }
  return 'DU'
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

/* Smooth max-height transition */
.max-h-0 {
  max-height: 0;
}

.max-h-96 {
  max-height: 24rem;
}
</style>
