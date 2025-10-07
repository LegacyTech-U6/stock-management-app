<template>
  <aside class="sidebar fixed">
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
      </div>
    </div>

    <!-- Navigation -->
    <nav class="nav">
      <!-- Overview -->
      <div class="nav-section">
        <span class="nav-section-label">Overview</span>
        <router-link to="/dashboard" class="nav-item" active-class="nav-item-active">
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
            <router-link to="/products" class="submenu-item" active-class="submenu-item-active">
              <span>All Products</span><span class="badge-sm">6</span>
            </router-link>
            <router-link to="/steper" class="submenu-item" active-class="submenu-item-active">
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
              <router-link to="/categories" class="submenu-item" active-class="submenu-item-active">
                <span>All Categories</span><span class="badge-sm">{{ totalCategories }}</span>
              </router-link>
              <button

                class="submenu-item"
                active-class="submenu-item-active"
                @click="showAddCategory = true"
              >
                <span class="flex-center"> <span class="add-symbol">+</span>Add New Category </span>
              </button>
            </div>
          </transition>
        </div>
      </div>

      <!-- Sales -->
      <div class="nav-section">
        <span class="nav-section-label">Sales & Orders</span>

        <router-link to="/sales" class="nav-item" active-class="nav-item-active">
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

        <router-link to="/clients" class="nav-item" active-class="nav-item-active">
          <UsersClients />
          <span>Client Management</span>
        </router-link>
      </div>
      <!-- invoice mangement -->
      <div class="nav-section">
        <span class="nav-section-label"> Invoice Management</span>
        <router-link to="/invoices" class="nav-item" active-class="nav-item-active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 2L3 6V20C3 20.53 3.21 21.04 3.59 21.41C3.96 21.79 4.47 22 5 22H19C19.53 22 20.04 21.79 20.41 21.41C20.79 21.04 21 20.53 21 20V6L18 2H6Z"
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

    <!-- User -->
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
</template>

<script setup>
import { ref , computed} from 'vue'
import UserGroupIcon from '@/assets/icon svg/userGroupIcon.vue'
import UsersClients from '@/assets/icon svg/UsersClients.vue'
const showAddCategory = ref(false);
// Reactive state
const inventoryExpanded = ref(false)

// Methods
const toggleInventory = () => {
  inventoryExpanded.value = !inventoryExpanded.value
}
// This would typically come from a store or API
const categoryExpanded = ref(false);

// Mock data - replace with actual data from your store/API
const categoriesData = ref([
  { id: 1, name: 'Audio Equipment', productCount: 2 },
  { id: 2, name: 'Mobile Devices', productCount: 3 },
  { id: 3, name: 'Computers', productCount: 1 },
  { id: 4, name: 'Peripherals', productCount: 2 },
  { id: 5, name: 'Gaming', productCount: 0 }
]);

const toggleCategory = () => {
  categoryExpanded.value = !categoryExpanded.value;
};

// Computed properties for dynamic counts
const totalCategories = computed(() => categoriesData.value.length);
const categoriesWithProducts = computed(() =>
  categoriesData.value.filter(category => category.productCount > 0).length
);
const emptyCategories = computed(() =>
  categoriesData.value.filter(category => category.productCount === 0).length
);
</script>

<style scoped>
/* Layout */
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 16rem;
  background: #fff;
  border-right: 1px solid #e5e7eb;
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}
.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #4f46e5;
  border-radius: 0.5rem;
}
.logo-title {
  font-weight: 600;
  color: #111827;
  font-size: 1rem;
}
.logo-subtitle {
  font-size: 0.75rem;
  color: #6b7280;
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
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 500;
}

/* Items */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s;
}
.nav-item:hover {
  background: #f9fafb;
  color: #111827;
}
.nav-item-active {
  background: #eef2ff;
  color: #4f46e5;
  position: relative;
}
.nav-item-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0.25rem;
  background: #4f46e5;
}

/* Submenu */
.submenu {
  margin-top: 0.25rem;
  margin-left: 1.5rem;
  padding-left: 1.5rem;
  border-left: 1px solid #e5e7eb;
}
.submenu-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #4b5563;
  border-radius: 0.375rem;
  text-decoration: none;
}
.submenu-item:hover {
  background: #f9fafb;
  color: #111827;
}
.submenu-item-active {
  background: #eef2ff;
  color: #4f46e5;
  font-weight: 500;
}

/* Badges */
.badge,
.badge-sm,
.badge-danger {
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
}
.badge {
  background: #f3f4f6;
  color: #4b5563;
}
.badge-sm {
  background: #f3f4f6;
  color: #4b5563;
  padding: 0.125rem 0.4rem;
}
.badge-danger {
  background: #fee2e2;
  color: #dc2626;
}

/* Status */
.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}
.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
}
.dot.green {
  background: #22c55e;
}
.dot.amber {
  background: #f59e0b;
}
.dot.red {
  background: #ef4444;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background 0.2s;
}
.user-profile:hover {
  background: #f9fafb;
}
.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
}
.user-info h4 {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin: 0;
}
.user-info p {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}
.arrow {
  transition: transform 0.2s;
}
.rotated {
  transform: rotate(90deg);
}
.arrow-right {
  color: #9ca3af;
}

/* Scrollbar */
.nav::-webkit-scrollbar {
  width: 6px;
}
.nav::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
}
.nav::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
