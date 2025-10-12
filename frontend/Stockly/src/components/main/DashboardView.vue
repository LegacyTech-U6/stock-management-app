<template>
  <div class="p-8 space-y-8">
      <!-- Stat Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          :value="Number(productStore.products.length)"
          valueColor="text-gray-800"
          subtitle="+8.1%"
          description="Active items"
        >
          <template #icon>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
              ></path>
            </svg>
          </template>
        </StatCard>

        <StatCard
          title="Inventory Value"
          :value="Number(totalProductsValue)"
          valueColor="text-gray-800"
          subtitle="+12.5%"
          description="Total worth"
        >
          <template #icon>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </template>
        </StatCard>

        <StatCard
          title="Orders Today"
          :value="24"
          valueColor="text-gray-800"
          subtitle="-3.2%"
          description="Active orders"
        >
          <template #icon>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </template>
        </StatCard>

        <StatCard
          title="Active Customers"
          :value="1847"
          valueColor="text-gray-800"
          subtitle="+15.3%"
          description="This month"
        >
          <template #icon>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM15 20H9m6 0h.01"
              ></path>
            </svg>
          </template>
        </StatCard>
      </div>

      <!-- Main Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Charts (2/3 width) -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Sales & Orders Overview -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-6">
              <svg
                class="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              <h2 class="text-lg font-semibold text-gray-800">Sales & Orders Overview</h2>
            </div>
            <SalesPerformanceChart />
          </div>

          <!-- Stock Levels by Category -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-6">
              <svg
                class="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
                ></path>
              </svg>
              <h2 class="text-lg font-semibold text-gray-800">Stock Levels by Category</h2>
            </div>
            <div class="space-y-6">
              <div v-for="item in stockLevels" :key="item.name" class="space-y-2">
                <div class="flex justify-between items-center">
                  <p class="font-medium text-gray-900 text-sm">{{ item.name }}</p>
                  <p class="text-sm text-gray-600">{{ item.current }}/{{ item.total }}</p>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-gray-800 h-2 rounded-full"
                    :style="{ width: (item.current / item.total) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Distribution -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-6">
              <svg
                class="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h2 class="text-lg font-semibold text-gray-800">Product Distribution</h2>
            </div>
          
          </div>
        </div>

        <!-- Right Column: Side Panels (1/3 width) -->
        <div class="space-y-8">
          <!-- Notifications -->
          <NotificationsPanel :notifications="notifications" />

          <!-- Low Stock Alerts -->
          <LowStockAlertsPanel :lowStockItems="lowStockItems" />

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-6">
              <svg
                class="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h2 class="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div class="text-center py-8">
              <p class="text-sm text-gray-500">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import StatCard from '@/components/statistics/StatsCard.vue'
import ProductDistribution from '@/components/statistics/ProductDistribution.vue'
import { useProductStore } from '@/stores/productStore'
import NotificationsPanel from '@/components/main/NotificationsPanel.vue'
import LowStockAlertsPanel from '@/components/main/LowStockAlertsPanel.vue'
import SalesPerformanceChart from '@/components/statistics/SalesPerformanceChart.vue'

const productStore = useProductStore()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await productStore.fetchProducts()
  loading.value = false
})

const totalProductsValue = computed(() =>
  productStore.products.reduce((sum, product) => {
    const productTotal = product.selling_price * (product.quantity ?? 1)
    return sum + productTotal
  }, 0),
)

const notifications = ref([
  {
    id: 1,
    type: 'low-stock',
    title: 'Low Stock Alert',
    description: '4 products are running low on stock',
    timestamp: '5 minutes ago',
  },
  {
    id: 2,
    type: 'restock',
    title: 'Restock Complete',
    description: 'Gaming Laptop Pro successfully restocked',
    timestamp: '1 hour ago',
  },
  {
    id: 3,
    type: 'supplier',
    title: 'New Supplier Added',
    description: 'Mobile Solutions Ltd has been added to suppliers',
    timestamp: '3 hours ago',
  },
])

const lowStockItems = ref([
  { id: 1, name: 'Premium Smartphone', stock: 8, minStock: 10, critical: true },
  { id: 2, name: 'Wireless Earbuds', stock: 5, minStock: 15, critical: false },
  { id: 3, name: 'Smart Watch', stock: 3, minStock: 8, critical: true },
  { id: 4, name: 'Tablet Stand', stock: 7, minStock: 12, critical: false },
])

const stockLevels = ref([
  { name: 'Audio Equipment', current: 145, total: 200 },
  { name: 'Mobile Devices', current: 89, total: 150 },
  { name: 'Computers', current: 67, total: 100 },
  { name: 'Peripherals', current: 234, total: 300 },
  { name: 'Accessories', current: 156, total: 200 },
])

const removeNotification = (id) => {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}
</script>

<style scoped>
/* Smooth transitions */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}
</style>

