<template>
  <div class="flex h-screen bg-gray-50/50">
    <!-- Mobile Menu Button -->
    <div class="fixed top-4 left-4 z-50 lg:hidden">
      <button
        @click="sidebarOpen = !sidebarOpen"
        class="p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <Menu v-if="!sidebarOpen" class="w-5 h-5 text-gray-600" />
        <X v-else class="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static top-0 left-0 h-screen bg-white/95 backdrop-blur-md border-r border-gray-200/60 transition-all duration-500 z-40 flex flex-col',
        'w-72 lg:w-72',
        sidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0 lg:shadow-sm',
      ]"
    >
      <!-- Logo -->
      <div class="px-6 py-6 border-b border-gray-200/50">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm"
          >
            <Building2 class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="font-semibold text-gray-900 text-lg">StockFlow</h1>
            <p class="text-xs text-gray-500 font-medium">Enterprise Manager</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="px-3 py-6 space-y-1 flex-1 overflow-y-auto">
        <NavLink
          to="/ad/dashboard"
          :icon="LayoutDashboard"
          label="Dashboard"
          @click="closeSidebarOnMobile"
        />
        <NavLink to="/ad/workers" :icon="Users" label="Workers" @click="closeSidebarOnMobile" />
        <NavLink to="/ad/admin" :icon="Package" label="Companies" @click="closeSidebarOnMobile" />
        <NavLink to="/ad/company" :icon="BarChart3" label="Reports" @click="closeSidebarOnMobile" />
        <NavLink
          to="/ad/settings"
          :icon="Settings"
          label="Settings"
          @click="closeSidebarOnMobile"
        />
      </nav>

      <!-- User Profile Section - Moved to bottom -->
      <div class="mt-auto border-t border-gray-200/50">
        <div class="px-4 py-4">
          <div
            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group"
          >
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 shadow-sm"
            >
              {{ userInitials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate">{{ userName }}</p>
              <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
            </div>
            <ChevronDown
              class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-hover:rotate-180 duration-300"
            />
          </div>
          <div class="p-2 mt-2">
            <button
              class="w-full py-2.5 px-4 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar - Aligned with sidebar border -->
      <header
        class="bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-6 py-4 h-[88px] flex items-center"
      >
        <div class="flex items-center justify-between gap-4 w-full">
          <h2 class="text-lg font-semibold text-gray-900 hidden sm:block">
            Welcome back, <span class="text-blue-600">{{ userFirstName }}!</span>
          </h2>
          <div class="flex items-center gap-3 ml-auto">
            <button
              @click="notificationOpen = !notificationOpen"
              class="relative p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-300 hidden sm:block group"
            >
              <Bell class="w-5 h-5 text-gray-600 group-hover:text-gray-700 transition-colors" />
              <span
                v-if="unreadCount > 0"
                class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"
              ></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto">
        <slot></slot>
      </main>
    </div>

    <!-- Notification Panel - Right Sidebar -->
    <Transition name="slide-fade">
      <div
        v-if="notificationOpen"
        class="fixed top-0 right-0 h-screen w-96 bg-white/95 backdrop-blur-md z-50 flex flex-col shadow-2xl border-l border-gray-200/60"
      >
        <!-- Panel Header -->
        <div
          class="bg-gray-50/80 px-6 py-5 border-b border-gray-200/60 flex justify-between items-center"
        >
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Notifications</h2>
            <p class="text-sm text-gray-600 mt-1">
              You have {{ unreadCount }} unread notification{{ unreadCount !== 1 ? 's' : '' }}
            </p>
          </div>
          <button
            @click="notificationOpen = false"
            class="p-1.5 hover:bg-gray-200/50 rounded-lg transition-all duration-300"
          >
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <!-- Notifications List -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="notifications.length > 0">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              @click="markAsRead(notification.id)"
              :class="[
                'px-6 py-4 border-b border-gray-100 hover:bg-gray-50/80 cursor-pointer transition-all duration-300',
                notification.read ? 'bg-white' : 'bg-blue-50/50',
              ]"
            >
              <div class="flex items-start gap-4">
                <div
                  class="mt-1 flex-shrink-0"
                  v-html="getNotificationIcon(notification.icon)"
                ></div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="font-semibold text-gray-900 text-sm">
                      {{ notification.title }}
                    </h3>
                    <div
                      v-if="!notification.read"
                      class="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1 flex-shrink-0 ring-2 ring-blue-100"
                    ></div>
                  </div>
                  <p class="text-gray-600 text-sm mt-2 leading-relaxed">
                    {{ notification.message }}
                  </p>
                  <div class="flex items-center justify-between mt-3">
                    <p class="text-xs text-gray-500 font-medium">{{ notification.company }}</p>
                    <p class="text-xs text-gray-400">{{ notification.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full">
            <div class="text-center">
              <Bell class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500 text-lg font-medium">No notifications</p>
              <p class="text-gray-400 text-sm mt-2">You're all caught up!</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          v-if="notifications.length > 0"
          class="bg-gray-50/80 px-6 py-4 border-t border-gray-200/60"
        >
          <button
            @click="markAllAsRead"
            class="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300 py-2.5 rounded-lg hover:bg-blue-50/50"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Building2,
  Menu,
  X,
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Settings,
  ChevronDown,
  Bell,
  Search,
} from 'lucide-vue-next'
import NavLink from '@/components/NavLink.vue'
import { useAuthStore } from '@/stores/authStore.js'

const sidebarOpen = ref(false)
const notificationOpen = ref(false)
const authStore = useAuthStore()

// Fetch user data on component mount
onMounted(async () => {
  if (authStore.token && !authStore.user) {
    await authStore.getAccount()
  }
})

// Computed properties for user information
const userName = computed(() => {
  if (authStore.user) {
    return `${authStore.user.username || ''} ${authStore.user.Last_name || ''}`.trim()
  }
  return 'Demo User'
})

const userFirstName = computed(() => {
  if (authStore.user?.username) {
    return authStore.user.username
  }
  return 'User'
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

const notifications = ref([
  {
    id: 1,
    type: 'low-stock',
    title: 'Low Stock Alert',
    message: '5 products in TechCorp Solutions are running low on stock',
    company: 'TechCorp Solutions',
    time: '5 minutes ago',
    read: false,
    icon: 'alert',
  },
  {
    id: 2,
    type: 'order-completed',
    title: 'Order Completed',
    message: 'Order #1234 has been successfully processed',
    company: 'Fashion Hub',
    time: '1 hour ago',
    read: false,
    icon: 'check',
  },
  {
    id: 3,
    type: 'user-added',
    title: 'New User Added',
    message: 'John Doe has been added to Food & Beverage Co',
    company: 'Food & Beverage Co',
    time: '2 hours ago',
    read: false,
    icon: 'user',
  },
  {
    id: 4,
    type: 'out-of-stock',
    title: 'Out of Stock',
    message: '2 products are completely out of stock in Fashion Hub',
    company: 'Fashion Hub',
    time: '3 hours ago',
    read: false,
    icon: 'alert-triangle',
  },
])

const unreadCount = computed(() => {
  return notifications.value.filter((n) => !n.read).length
})

const markAsRead = (id) => {
  const notification = notifications.value.find((n) => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach((n) => {
    n.read = true
  })
}

const getNotificationIcon = (type) => {
  const iconClass = 'w-5 h-5'
  const icons = {
    alert: `<svg class="${iconClass} text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`,
    check: `<svg class="${iconClass} text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`,
    user: `<svg class="${iconClass} text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a6.5 6.5 0 11-1.9-12.79 1 1 0 111.4 1.4c-.38.38-.75.88-.75 1.39a4.5 4.5 0 109 0c0-.51-.37-1-1-1.4a1 1 0 11-1.4-1.4 6.5 6.5 0 01-4.4 11.8z"></path></svg>`,
    'alert-triangle': `<svg class="${iconClass} text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`,
  }
  return icons[type] || ''
}

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}

// Close sidebar on window resize if opening desktop view
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    sidebarOpen.value = false
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', handleResize)
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
