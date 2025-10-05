<template>
  <aside class="flex flex-col w-64 h-screen border-r bg-white">
    <!-- Header -->
    <header class="flex items-center gap-2 px-4 py-3 border-b">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
        <Boxes class="h-4 w-4" />
      </div>
      <div class="flex flex-col">
        <span class="font-semibold">StockFlow</span>
        <span class="text-xs text-gray-500">Inventory System</span>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-3 space-y-4">
      <div v-for="section in navigationItems" :key="section.title">
        <h3 class="text-xs uppercase text-gray-500 font-semibold mb-2">{{ section.title }}</h3>
        <ul class="space-y-1">
          <li v-for="item in section.items" :key="item.title">
            <button
              class="flex w-full items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
              :class="{ 'bg-primary/10 text-primary font-semibold': item.isActive }"
              @click="handleNavigate(item.url)"
            >
              <div class="flex items-center gap-2">
                <component :is="item.icon" class="h-4 w-4" />
                <span>{{ item.title }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span
                  v-if="item.badge"
                  class="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5"
                >
                  {{ item.badge }}
                </span>
                <ChevronRight v-if="item.subItems" class="h-3 w-3" />
              </div>
            </button>

            <!-- Sub Items -->
            <ul v-if="item.subItems" class="ml-6 mt-1 space-y-1">
              <li v-for="sub in item.subItems" :key="sub.title">
                <button
                  class="flex w-full items-center justify-between px-3 py-1.5 text-sm rounded-md hover:bg-gray-100"
                  :class="{ 'bg-primary/10 text-primary font-semibold': sub.isActive }"
                  @click="handleNavigate(sub.url)"
                >
                  <div class="flex items-center gap-2">
                    <component v-if="sub.icon" :is="sub.icon" class="h-3 w-3" />
                    <span>{{ sub.title }}</span>
                  </div>
                  <span
                    v-if="sub.count !== undefined"
                    class="border border-gray-300 text-xs rounded-full px-2 py-0.5"
                  >
                    {{ sub.count }}
                  </span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- Inventory status -->
      <div v-if="totalProducts > 0" class="pt-4 border-t">
        <h3 class="text-xs uppercase text-gray-500 font-semibold mb-2">Inventory Status</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <CheckCircle class="h-3 w-3 text-green-500" />
              <span>In Stock</span>
            </div>
            <span class="text-xs px-2 border rounded">{{ inStockProducts }}</span>
          </div>

          <div v-if="lowStockProducts > 0" class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <AlertTriangle class="h-3 w-3 text-yellow-500" />
              <span>Low Stock</span>
            </div>
            <span class="bg-yellow-100 text-yellow-700 text-xs px-2 rounded">
              {{ lowStockProducts }}
            </span>
          </div>

          <div v-if="outOfStockProducts > 0" class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <AlertTriangle class="h-3 w-3 text-red-500" />
              <span>Out of Stock</span>
            </div>
            <span class="bg-red-100 text-red-700 text-xs px-2 rounded">
              {{ outOfStockProducts }}
            </span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <footer class="border-t p-3">
      <div class="flex items-center gap-3">
        <div class="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 font-bold">
          {{ userInitials }}
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold truncate">{{ user.name }}</p>
          <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
        </div>
        <button
          @click="onLogout"
          class="text-red-600 hover:text-red-700 transition"
          title="Logout"
        >
          <LogOut class="h-4 w-4" />
        </button>
      </div>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Boxes,
  ChevronRight,
  Home,
  Package,
  Plus,
  ShoppingCart,
  Users,
  AlertTriangle,
  CheckCircle,
  LogOut
} from 'lucide-vue-next'

type ViewType =
  | 'dashboard'
  | 'inventory'
  | 'add-product'
  | 'product-detail'
  | 'sales'
  | 'clients'
  | 'invoice'

interface UserData {
  id: string
  name: string
  email: string
  role: string
  company: string
  phone?: string
  avatar?: string
  loginTime: string
  token: string
  isNewUser?: boolean
}

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  currency: string
  stockLevel: number
  minStockLevel: number
  maxStockLevel: number
  supplier: string
  lastRestocked: string
  description: string
  specifications: Record<string, string>
  imageUrl: string
}

const props = defineProps<{
  currentView: ViewType
  user: UserData
  products: Product[]
  onNavigate: (view: ViewType) => void
  onLogout: () => void
}>()

// Inventory stats
const totalProducts = computed(() => props.products.length)
const lowStockProducts = computed(() =>
  props.products.filter(p => p.stockLevel <= p.minStockLevel && p.stockLevel > 0).length
)
const outOfStockProducts = computed(() =>
  props.products.filter(p => p.stockLevel === 0).length
)
const inStockProducts = computed(() =>
  props.products.filter(p => p.stockLevel > p.minStockLevel).length
)

const navigationItems = computed(() => [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        url: 'dashboard',
        icon: Home,
        isActive: props.currentView === 'dashboard',
        description: 'Main overview and analytics'
      }
    ]
  },
  {
    title: 'Inventory Management',
    items: [
      {
        title: 'Product Inventory',
        url: 'inventory',
        icon: Package,
        isActive: ['inventory', 'product-detail'].includes(props.currentView),
        description: 'View and manage all products',
        badge: totalProducts.value > 0 ? totalProducts.value.toString() : undefined,
        subItems: [
          {
            title: 'All Products',
            url: 'inventory',
            isActive: props.currentView === 'inventory',
            count: totalProducts.value
          },
          {
            title: 'Add New Product',
            url: 'add-product',
            isActive: props.currentView === 'add-product',
            icon: Plus
          }
        ]
      }
    ]
  },
  {
    title: 'Sales & Orders',
    items: [
      {
        title: 'Sales Interface',
        url: 'sales',
        icon: ShoppingCart,
        isActive: ['sales', 'invoice'].includes(props.currentView),
        description: 'Create orders and invoices'
      },
      {
        title: 'Client Management',
        url: 'clients',
        icon: Users,
        isActive: props.currentView === 'clients',
        description: 'Manage customer information'
      }
    ]
  }
])

const userInitials = computed(() =>
  props.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
)

function handleNavigate(view: ViewType) {
  props.onNavigate(view)
}
</script>
