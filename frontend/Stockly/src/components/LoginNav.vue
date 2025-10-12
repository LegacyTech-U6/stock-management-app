<template>
  <div class="fixed">
    <!-- Mobile Menu Button -->
    <button class="mobile-menu-btn" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle menu">
      <svg v-if="!sidebarOpen" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12H21M3 6H21M3 18H21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="sidebarOpen" class="overlay" @click="sidebarOpen = false"></div>
    </transition>

    <!-- Sidebar -->
    <aside class="sidebar fixe" :class="{ 'sidebar-open': sidebarOpen }">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <h1 class="logo-title">StockFlow</h1>
          <p class="logo-subtitle">Inventory System</p>
          <h2 class="text-2xl font-bold mb-4">
            Managing: {{ activeEntreprise?.name || 'No enterprise selected' }}
          </h2>
        </div>

        <!-- Mobile Close Button -->
        <button class="mobile-close-btn" @click="sidebarOpen = false" aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="nav">
        <!-- Overview -->
        <div class="nav-section">
          <span class="nav-section-label">Overview</span>
          <router-link
            to="/dashboar"
            class="nav-item"
            active-class="nav-item-active"
            @click="closeMobileMenu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9L12 2L21 9V20C21 20.53 20.79 21.04 20.41 21.41C20.04 21.79 19.53 22 19 22H5C4.47 22 3.96 21.79 3.59 21.41C3.21 21.04 3 20.53 3 20V9Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Dashboard</span>
          </router-link>
        </div>

        <!-- Inventory -->
        <div class="nav-section">
          <span class="nav-section-label">Inventory Management</span>
          <div
            class="nav-item nav-toggle"
            :class="{ 'nav-item-active': inventoryExpanded }"
            @click="toggleInventory"
          >
            <div class="flex-between">
              <div class="flex-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 16V8C21 7.65 20.91 7.3 20.73 7.00C20.55 6.70 20.30 6.45 20 6.27L13 2.27C12.70 2.09 12.35 2 12 2C11.65 2 11.30 2.09 11 2.27L4 6.27C3.70 6.45 3.44 6.70 3.27 7.00C3.09 7.30 3 7.65 3 8V16C3 16.35 3.09 16.70 3.27 17.00C3.44 17.30 3.70 17.55 4 17.73L11 21.73C11.30 21.91 11.65 22 12 22C12.35 22 12.70 21.91 13 21.73L20 17.73C20.30 17.55 20.55 17.30 20.73 17.00C20.91 16.70 21 16.35 21 16Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Product Inventory</span>
                <span class="badge">6</span>
              </div>
              <svg
                class="arrow"
                :class="{ rotated: inventoryExpanded }"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <transition name="submenu">
            <div v-show="inventoryExpanded" class="submenu">
              <router-link
                to="/products"
                class="submenu-item"
                active-class="submenu-item-active"
                @click="closeMobileMenu"
              >
                <span>All Products</span><span class="badge-sm">6</span>
              </router-link>
              <router-link
                to="/steper"
                class="submenu-item"
                active-class="submenu-item-active"
                @click="closeMobileMenu"
              >
                <span class="flex-center"> <span class="add-symbol">+</span>Add New Product </span>
              </router-link>
            </div>
          </transition>

          <div>
            <div
              class="nav-item nav-toggle"
              :class="{ 'nav-item-active': categoryExpanded }"
              @click="toggleCategory"
            >
              <div class="flex-between">
                <div class="flex-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 6V20M16 6V20"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      opacity="0.5"
                    />
                  </svg>
                  <span>Categories</span>
                  <span class="badge">{{ totalCategories }}</span>
                </div>
                <svg
                  class="arrow"
                  :class="{ rotated: categoryExpanded }"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <transition name="submenu">
              <div v-show="categoryExpanded" class="submenu">
                <router-link
                  to="/categories"
                  class="submenu-item"
                  active-class="submenu-item-active"
                  @click="closeMobileMenu"
                >
                  <span>All Categories</span><span class="badge-sm">{{ totalCategories }}</span>
                </router-link>
                <button class="submenu-item" @click="((showAddCategory = true), closeMobileMenu())">
                  <span class="flex-center">
                    <span class="add-symbol">+</span>Add New Category
                  </span>
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Sales -->
        <div class="nav-section">
          <span class="nav-section-label">Sales & Orders</span>

          <router-link
            to="/sales"
            class="nav-item"
            active-class="nav-item-active"
            @click="closeMobileMenu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 2L3 6V20C3 20.53 3.21 21.04 3.59 21.41C3.96 21.79 4.47 22 5 22H19C19.53 22 20.04 21.79 20.41 21.41C20.79 21.04 21 20.53 21 20V6L18 2H6Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Sales Interface</span>
          </router-link>

          <router-link
            to="/clients"
            class="nav-item"
            active-class="nav-item-active"
            @click="closeMobileMenu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="9"
                cy="7"
                r="4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Client Management</span>
          </router-link>
        </div>

        <!-- Invoice Management -->
        <div class="nav-section">
          <span class="nav-section-label">Invoice Management</span>
          <router-link
            to="/invoices"
            class="nav-item"
            active-class="nav-item-active"
            @click="closeMobileMenu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 2V8H20"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 13H8M16 17H8M10 9H8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Invoices</span>
          </router-link>
        </div>

        <!-- Inventory Status -->
        <div class="nav-section">
          <span class="nav-section-label">Inventory Status</span>

          <div class="status-item">
            <div class="dot green"></div>
            <span>In Stock</span>
            <span class="badge">4</span>
          </div>

          <div class="status-item">
            <div class="dot amber"></div>
            <span>Low Stock</span>
            <span class="badge">1</span>
          </div>

          <div class="status-item">
            <div class="dot red"></div>
            <span>Out of Stock</span>
            <span class="badge-danger">1</span>
          </div>
        </div>
      </nav>
      <button
        @click="logoutEntreprise"
        class="text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-50"
      >
        Quitter l'entreprise
      </button>

      <!-- User Profile -->
      <div class="user-profile">
        <img src="https://i.pravatar.cc/40" alt="Demo User" class="avatar" />
        <div class="user-info">
          <h4>Demo User</h4>
          <p>user@demo.com</p>
        </div>
        <svg class="arrow-right" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const entrepriseStore = useEntrepriseStore()

const logoutEntreprise = () => {
  entrepriseStore.clearActiveEntreprise()
  router.push('/ad/admin') // retour à la page de sélection
}


const activeEntreprise = computed(() => entrepriseStore.activeEntreprise)
const showAddCategory = ref(false)
const sidebarOpen = ref(false)
const inventoryExpanded = ref(false)
const categoryExpanded = ref(false)

const categoriesData = ref([
  { id: 1, name: 'Audio Equipment', productCount: 2 },
  { id: 2, name: 'Mobile Devices', productCount: 3 },
  { id: 3, name: 'Computers', productCount: 1 },
  { id: 4, name: 'Peripherals', productCount: 2 },
  { id: 5, name: 'Gaming', productCount: 0 },
])

const toggleInventory = () => {
  inventoryExpanded.value = !inventoryExpanded.value
}

const toggleCategory = () => {
  categoryExpanded.value = !categoryExpanded.value
}

const closeMobileMenu = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}

const totalCategories = computed(() => categoriesData.value.length)

// Handle window resize
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
/* Mobile Menu Button */
.mobile-menu-btn {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.mobile-menu-btn:hover {
  background: #4338ca;
  transform: scale(1.05);
}

.mobile-menu-btn:active {
  transform: scale(0.95);
}

@media (min-width: 1024px) {
  .mobile-menu-btn {
    display: none;
  }
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

@media (min-width: 1024px) {
  .overlay {
    display: none;
  }
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 280px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.sidebar-open {
  transform: translateX(0);
}

@media (min-width: 1024px) {
  .sidebar {
    position: relative;
    transform: translateX(0);
    box-shadow: none;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
    max-width: 320px;
  }
}

/* Logo Section */
.logo-section {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.mobile-close-btn {
  display: none;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.mobile-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 1023px) {
  .mobile-close-btn {
    display: flex;
  }
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
}

.logo-title {
  font-weight: 700;
  color: white;
  font-size: 1.125rem;
  margin: 0;
  letter-spacing: -0.025em;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 500;
}

/* Navigation */
.nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 1.75rem;
}

.nav-section-label {
  display: block;
  padding: 0 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.6875rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Navigation Items */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  margin: 0.125rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  background: transparent;
  width: calc(100% - 1.5rem);
}

.nav-item:hover {
  background: #f9fafb;
  color: #111827;
  transform: translateX(4px);
}

.nav-item-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3);
}

.nav-item-active:hover {
  transform: translateX(0);
}

/* Flex Utilities */
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.flex-center {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.add-symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: #4f46e5;
  color: white;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Submenu */
.submenu {
  margin-top: 0.25rem;
  margin-left: 1.5rem;
  padding-left: 1.5rem;
  border-left: 2px solid #e5e7eb;
  overflow: hidden;
}

.submenu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1rem;
  margin: 0.125rem 0;
  font-size: 0.875rem;
  color: #6b7280;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  background: transparent;
  width: 100%;
  cursor: pointer;
}

.submenu-item:hover {
  background: #f3f4f6;
  color: #4b5563;
}

.submenu-item-active {
  background: #eef2ff;
  color: #4f46e5;
  font-weight: 600;
}

/* Transitions */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Badges */
.badge,
.badge-sm,
.badge-danger {
  font-size: 0.6875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  line-height: 1;
}

.badge {
  background: #f3f4f6;
  color: #6b7280;
}

.badge-sm {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
}

.badge-danger {
  background: #fee2e2;
  color: #dc2626;
}

/* Status Items */
.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  margin: 0.125rem 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
  border-radius: 0.75rem;
  transition: all 0.2s;
}

.status-item:hover {
  background: #f9fafb;
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.dot.green {
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
}

.dot.amber {
  background: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
}

.dot.red {
  background: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
  background: linear-gradient(to right, #f9fafb, #ffffff);
}

.user-profile:hover {
  background: #f3f4f6;
}

.avatar {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  border: 2px solid #e5e7eb;
  object-fit: cover;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-info h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info p {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #6b7280;
}

.rotated {
  transform: rotate(90deg);
}

.arrow-right {
  color: #9ca3af;
  flex-shrink: 0;
}

/* Scrollbar */
.nav::-webkit-scrollbar {
  width: 6px;
}

.nav::-webkit-scrollbar-track {
  background: transparent;
}

.nav::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
  transition: background 0.2s;
}

.nav::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Toggle Button Styling */
.nav-toggle {
  cursor: pointer;
}
</style>
