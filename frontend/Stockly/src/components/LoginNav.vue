<template>
  <div class="fixed">
    <!-- ... existing mobile menu and overlay code ... -->

    <!-- Sidebar -->
    <aside class="sidebar fixed" :class="{ 'sidebar-open': sidebarOpen }">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="logo-text">
          <h1 class="logo-title">StockFlow</h1>
          <p class="logo-subtitle">Inventory System</p>
        </div>
        <!-- Enterprise Name -->
        <div v-if="activeEntreprise" class="enterprise-name">
          {{ activeEntreprise.name }}
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
          <span class="nav-section-label">OVERVIEW</span>
          <router-link
            :to="dashboardRoute"
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
          <span class="nav-section-label">INVENTORY MANAGEMENT</span>

          <!-- Product Inventory -->
          <div class="nav-group">
            <div
              class="nav-item nav-toggle"
              :class="{ 'nav-item-active': inventoryExpanded }"
              @click="toggleInventory"
            >
              <div class="nav-item-content">
                <div class="nav-item-main">
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
                </div>
                <div class="nav-item-end">
                  <span class="badge">6</span>
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
            </div>

            <transition name="submenu">
              <div v-show="inventoryExpanded" class="submenu">
                <router-link
                  :to="productsRoute"
                  class="submenu-item"
                  active-class="submenu-item-active"
                  @click="closeMobileMenu"
                >
                  <span>All Products</span>
                  <span class="badge-sm">6</span>
                </router-link>
                <router-link
                  :to="steperRoute"
                  class="submenu-item"
                  active-class="submenu-item-active"
                  @click="closeMobileMenu"
                >
                  <div class="submenu-add">
                    <span class="add-symbol">+</span>
                    <span>Add New Product</span>
                  </div>
                </router-link>
              </div>
            </transition>
          </div>

          <!-- Categories -->
          <div class="nav-group">
            <div
              class="nav-item nav-toggle"
              :class="{ 'nav-item-active': categoryExpanded }"
              @click="toggleCategory"
            >
              <div class="nav-item-content">
                <div class="nav-item-main">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span>Categories</span>
                </div>
                <div class="nav-item-end">
                  <span class="badge">{{ totalCategories }}</span>
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
            </div>

            <transition name="submenu">
              <div v-show="categoryExpanded" class="submenu">
                <router-link
                  :to="categoriesRoute"
                  class="submenu-item"
                  active-class="submenu-item-active"
                  @click="closeMobileMenu"
                >
                  <span>All Categories</span>
                  <span class="badge-sm">{{ totalCategories }}</span>
                </router-link>
                <button class="submenu-item" @click="((showAddCategory = true), closeMobileMenu())">
                  <div class="submenu-add">
                    <span class="add-symbol">+</span>
                    <span>Add New Category</span>
                  </div>
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Sales & Orders -->
        <div class="nav-section">
          <span class="nav-section-label">SALES & ORDERS</span>
          <router-link
            :to="salesRoute"
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
            :to="clientsRoute"
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
          <span class="nav-section-label">INVOICE MANAGEMENT</span>
          <router-link
            :to="invoicesRoute"
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
            </svg>
            <span>Invoices</span>
          </router-link>
        </div>
      </nav>

      <!-- Footer Section -->
      <div class="sidebar-footer">
        <button
          @click="logoutEntreprise"
          class="logout-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Quitter l'entreprise
        </button>

        <div class="user-profile">
          <img src="https://i.pravatar.cc/40" alt="Demo User" class="avatar" />
          <div class="user-info">
            <h4>Demo User</h4>
            <p>user@demo.com</p>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const entrepriseStore = useEntrepriseStore()

// Get current UUID from route params
const currentUuid = computed(() => route.params.uuid)

// Computed properties for routes with UUID
const dashboardRoute = computed(() => `/${currentUuid.value}/dashboar`)
const salesRoute = computed(() => `/${currentUuid.value}/sales`)
const productsRoute = computed(() => `/${currentUuid.value}/products`)
const steperRoute = computed(() => `/${currentUuid.value}/steper`)
const clientsRoute = computed(() => `/${currentUuid.value}/clients`)
const invoicesRoute = computed(() => `/${currentUuid.value}/invoices`)
const categoriesRoute = computed(() => `/${currentUuid.value}/categories`)

const activeEntreprise = computed(() => entrepriseStore.activeEntreprise)

const logoutEntreprise = () => {
  entrepriseStore.clearActiveEntreprise()
  router.push('/ad/admin')
}

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
  console.log('Current UUID:', currentUuid.value)
  console.log('Dashboard route:', dashboardRoute.value)
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
  background: #1f2937;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mobile-menu-btn:hover {
  background: #374151;
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
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
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

/* Logo Section */
.logo-section {
  position: relative;
  padding: 1.5rem;

  background: #ffffff;
}

.mobile-close-btn {
  display: none;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: #f3f4f6;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.mobile-close-btn:hover {
  background: #e5e7eb;
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
  background: #1f2937;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.logo-text {
  margin-bottom: 0.5rem;
}

.logo-title {
  font-weight: 700;
  color: #111827;
  font-size: 1.25rem;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.025em;
}

.logo-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.enterprise-name {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 600;
  margin: 0;
  padding: 0.5rem 0;
  border-top: 1px solid #f3f4f6;
}

/* Navigation */
.nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 1.5rem;
}

.nav-section-label {
  display: block;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.nav-group {
  margin-bottom: 0.25rem;
}

/* Navigation Items */
.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  margin: 0.125rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  border: none;
  background: transparent;
  width: 100%;
  cursor: pointer;
  transition: all 0.15s ease;
}

.nav-item:hover {
  background: #f9fafb;
  color: #111827;
}

.nav-item-active {
  background: #f3f4f6;
  color: #111827;
  border-right: 3px solid #1f2937;
}

.nav-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-item-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.nav-item-end {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Submenu */
.submenu {
  margin-top: 0.125rem;
  padding-left: 2.75rem;
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
  text-decoration: none;
  transition: all 0.15s ease;
  border: none;
  background: transparent;
  width: 100%;
  cursor: pointer;
}

.submenu-item:hover {
  color: #374151;
}

.submenu-item-active {
  color: #111827;
  font-weight: 600;
}

.submenu-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: #1f2937;
  color: white;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Transitions */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Badges */
.badge,
.badge-sm {
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  line-height: 1;
  background: #f3f4f6;
  color: #374151;
}

.badge-sm {
  font-size: 0.6875rem;
  padding: 0.125rem 0.375rem;
}

/* Status Grid */
.status-grid {
  padding: 0 1.5rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 0.875rem;
  color: #374151;
}

.status-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
}

.status-indicator.in-stock {
  background: #10b981;
}

.status-indicator.low-stock {
  background: #f59e0b;
}

.status-indicator.out-of-stock {
  background: #ef4444;
}

.status-label {
  flex: 1;
  font-weight: 500;
}

.status-count {
  font-weight: 600;
  color: #111827;
}

/* Arrow */
.arrow {
  transition: transform 0.2s ease;
  color: #6b7280;
}

.rotated {
  transform: rotate(90deg);
}

/* Sidebar Footer */
.sidebar-footer {
  border-top: 1px solid #f3f4f6;
  padding: 1rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.logout-btn:hover {
  background: #fee2e2;
  border-color: #fca5a5;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.user-profile:hover {
  background: #f9fafb;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
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

/* Scrollbar */
.nav::-webkit-scrollbar {
  width: 4px;
}

.nav::-webkit-scrollbar-track {
  background: transparent;
}

.nav::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
}

.nav::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
