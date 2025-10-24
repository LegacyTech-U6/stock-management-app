<template>
  <div class="p-8 space-y-8">
    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <GridCard v-for="stat in topStats" :key="stat.id" :title="stat.label" :value="stat.value" :icon="stat.icon"
        :gradientFrom="stat.gradientFrom" :gradientTo="stat.gradientTo" :trend="stat.trend" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard v-for="stat in statsTable" :key="stat.id" :icon="stat.icon" :value="stat.value" :label="stat.label"
        :trend="stat.trend" :viewLink="stat.viewLink" :icon-bg="stat.iconBg" :icon-color="stat.iconColor" :period="stat.period" />
    </div>

    <!-- Rest of your dashboard content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <TopSellingProducts />
      <LowStockAlertsPanel />
      <RecentSales />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Charts (2/3 width) -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Sales & Orders Overview -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <!-- <SalesPerformanceChart /> -->
          <SalesChart />
        </div>

        <!-- Stock Levels by Category -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center gap-2 mb-6">
            <Package class="w-5 h-5 text-gray-700" />
            <h2 class="text-lg font-semibold text-gray-800">Stock Levels by Category</h2>
          </div>
          <div class="space-y-6">
            <div v-for="item in stockLevels" :key="item.name" class="space-y-2">
              <div class="flex justify-between items-center">
                <p class="font-medium text-gray-900 text-sm">{{ item.name }}</p>
                <p class="text-sm text-gray-600">{{ item.current }}/{{ item.total }}</p>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-gray-800 h-2 rounded-full" :style="{ width: (item.current / item.total) * 100 + '%' }">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Distribution -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center gap-2 mb-6">
            <PieChart class="w-5 h-5 text-gray-700" />
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
            <Clock class="w-5 h-5 text-gray-700" />
            <h2 class="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div class="text-center py-8">
            <p class="text-sm text-gray-500">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
    <FloatingActionButton :actions="quickActions" @select="handleQuickAction" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import NotificationsPanel from '@/components/main/NotificationsPanel.vue'
import LowStockAlertsPanel from '@/components/statistics/LowStockAlertsPanel.vue'
import SalesChart from '../ui/charts/SalesChart.vue'
import { useStatisticsStore } from '@/stores/statisticStore'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { LowStock, OutOfStock } from '@/service/api'

import FloatingActionButton from '../ui/FloatingActionButton.vue'
import GridCard from '../ui/cards/GridCard.vue'
import MetricCard from '../ui/cards/MetricCard.vue'
import TopSellingProducts from '../statistics/TopSellingProducts.vue'
import RecentSales from '../statistics/RecentSales.vue'
// Lucide Vue Next icons
import { useActionMessage } from '@/composable/useActionMessage'
import {
  Package,
  DollarSign,
  Users,
  PieChart,
  Clock,
  Tag,
  Layers,
  RotateCcw,
  Wallet,
} from 'lucide-vue-next'

const quickActions = [
  { label: 'Add Product', icon: Package, value: 'product' },
  { label: 'Add Category', icon: Tag, value: 'category' },
  { label: 'Add Client', icon: Users, value: 'client' },
]
const handleQuickAction = (action) => {
  console.log('Selected action:', action.value)
  // Example: navigate or open modal
}

const entrepriseStore = useEntrepriseStore()
const productStore = useProductStore()
const loading = ref(false)
const avgRevenue = ref(0)
const revenueTrendPercent = ref(0)
const statisticStore = useStatisticsStore()
const finishedProducts = ref([])
const message = ref('')
const { showSuccess, showError } = useActionMessage()
// Remove the old handleLowStock function since we're using handleAlertAction now
const statsTable =computed(() => [
  {
    id: 1,
    label: 'Total profit',
    value: statisticStore.profit.profit?.total,
    trend: statisticStore.profit.profit?.history.at(-1)?.growth_percent,
    icon: Layers,
    iconBg: '#E6F4F0',
    iconColor: '#16a34a',
    viewLink: '/sales',
    period: statisticStore.profit.period,
  },
  {
    id: 2,
    label: 'Total Returns',
    value: '$156,000',
    trend: -8,
    icon: RotateCcw,
    iconBg: '#FDEDEE',
    iconColor: '#dc2626',
    viewLink: '/returns',
    period: 'Month',
  },
  {
    id: 3,
    label: 'Total Expenses',
    value: '$2,780,000',
    trend: -3,
    icon: Wallet,
    iconBg: '#FFF7E6',
    iconColor: '#f59e0b',
    viewLink: '/expenses',
    period: 'Month',
  },
  {
    id: 4,
    label: 'Total Customers',
    value: '4,820',
    trend: 20,
    icon: Users,
    iconBg: '#E6F0FF',
    iconColor: '#2563eb',
    viewLink: '/customers',
    period: 'Month',
  },
])
onMounted(async () => {
  loading.value = true
  await productStore.fetchProducts()
  await statisticStore.fetchProductSales('day')
  await statisticStore.fetchProfit('day')
  productStore.fetchFinishedProducts()
  await fetchLowStockProducts()
  await fetchFinishedProducts()
  loading.value = false
})

const totalProductsValue = computed(() =>
  productStore.products.reduce((sum, product) => {
    const productTotal = product.selling_price * (product.quantity ?? 1)
    return sum + productTotal
  }, 0),
)
const lowStockProducts = ref([])

async function fetchLowStockProducts() {
  try {
    const data = await LowStock()
    lowStockProducts.value = Array.isArray(data.products) ? data.products : []
    console.log('✅ Low products loaded:', lowStockProducts.value.length)
  } catch (err) {
    console.error('❌ Error fetching low stock:', err)
    lowStockProducts.value = []
  }
}

async function fetchFinishedProducts() {
  try {
    const orders = null
    const data = await OutOfStock()
    console.log('✅ API Response:', data)

    // ✅ Store data properly
    message.value = data.message
    orders.value = data.orders
    finishedProducts.value = data.products || [] // Important
  } catch (err) {
    showError('Failed to fetch out-of-stock products')
    console.error('❌ Error fetching out-of-stock products:', err)
  }
}

const topStats = computed(() => [
  {
    id: 1,
    icon: Users,
    label: 'Total products',
    value: productStore.totalProducts,
    subtext: 'Under this enterprise',
    gradientFrom: '#0E9384',
    gradientTo: '#0E9384',
  },
  {
    id: 2,
    icon: Package,
    label: 'Total Products Value',
    value: totalProductsValue,
    gradientFrom: '#FE9F43',
    gradientTo: '#FE9F43',
  },
  {
    id: 3,
    icon: DollarSign,
    label: 'Total Sales',
    value: computed(()=> statisticStore.topProducts.sales?.total) ,
    gradientFrom: '#092C4C',
    gradientTo: '#092C4C',
    trend: statisticStore.topProducts.sales?.history.at(-1)?.growth_percent

  },
  {
    id: 4,
    icon: DollarSign,
    label: 'Total Purchase',
    value: avgRevenue.value,
    gradientFrom: '#155EEF',
    gradientTo: '#155EEF',
    trendPercentage: revenueTrendPercent.value,
  },
])

const alerts = computed(() => [
  {
    id: 1,
    title: 'Out of Stock',
    count: finishedProducts.value.length,
    color: 'border-red-300 bg-red-50',
    action: { label: 'Restock', color: 'border-red-400 text-red-600' },
  },
])

const notifications = computed(() => [
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
