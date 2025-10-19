<template>
  <div class="p-8 space-y-8">
    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <GridCard v-for="stat in topStats" :key="stat.id" :title="stat.label" :value="stat.value" :icon="stat.icon"
        :gradientFrom="stat.gradientFrom" :gradientTo="stat.gradientTo" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard v-for="stat in statsTable" :key="stat.id" :icon="stat.icon" :value="stat.value" :label="stat.label"
        :trend="stat.trend" :viewLink="stat.viewLink" :icon-bg="stat.iconBg" :icon-color="stat.iconColor" />
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
        <div class="bg-white rounded-lg shadow-sm  border border-gray-200">

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
import StatCard from '@/components/statistics/StatsCard.vue'
import ProductDistribution from '@/components/statistics/ProductDistribution.vue'
import { useProductStore } from '@/stores/productStore'
import NotificationsPanel from '@/components/main/NotificationsPanel.vue'
import LowStockAlertsPanel from '@/components/statistics/LowStockAlertsPanel.vue'
import SalesPerformanceChart from '@/components/statistics/SalesPerformanceChart.vue'
import StatsCards from '@/components/StartsCards.vue'
import SalesChart from '../ui/charts/SalesChart.vue'
// Lucide Vue Next icons
import { useActionMessage } from '@/composable/useActionMessage'
import {
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
  PieChart,
  Clock,
  PlusCircle,
  Tag,
  Grid,
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
import AlertCard from '@/components/AlertCard.vue'
import { useStatisticsStore } from '@/stores/statisticStore'
import { useEntrepriseStore } from '@/stores/entrepriseStore'
const entrepriseStore = useEntrepriseStore()
import { LowStock, OutOfStock } from '@/service/api'
import router from '@/router'
import FloatingActionButton from '../ui/FloatingActionButton.vue'
import GridCard from '../ui/cards/GridCard.vue'
import MetricCard from '../ui/cards/MetricCard.vue'
import TopSellingProducts from '../statistics/TopSellingProducts.vue'
import RecentSales from '../statistics/RecentSales.vue'

const productStore = useProductStore()
const loading = ref(false)
const totalSales = ref(0)
const salesTrendPercent = ref(0)
const avgRevenue = ref(0)
const profit = ref(0)
const margin = ref(0)
const revenueTrendPercent = ref(0)
const statisticStore = useStatisticsStore()
const finishedProducts = ref([])
const message = ref('')
const error = ref(null)
const { showSuccess, showError } = useActionMessage()
// Handle alert card actions
const handleAlertAction = (alertId) => {
  switch (alertId) {
    case 1: // Low Stock Alert
      router.push({ name: 'lowStock' })
      break
    case 2: // Out of Stock
      router.push({ name: 'outOfStock' }) // Make sure you have this route defined
      break
    default:
      console.warn('Unknown alert ID:', alertId)
  }
}

// Remove the old handleLowStock function since we're using handleAlertAction now
const statsTable = [
  {
    id: 1,
    label: 'Total profit',
    value: '$8,458,798',
    trend: 12,
    icon: Layers,
    iconBg: '#E6F4F0',
    iconColor: '#16a34a',
    viewLink: '/sales',
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
  },
]
onMounted(async () => {
  loading.value = true
  await productStore.fetchProducts()
  await statisticStore.fetchRevenue('day')
  productStore.fetchFinishedProducts()
  await fetchLowStockProducts()
  await fetchFinishedProducts()
  loading.value = false
  console.log('====================================')
  console.log(lowStockProducts.value?.length)
  console.log('====================================')
  // Revenue
  avgRevenue.value = statisticStore.revenue?.total || 0
  revenueTrendPercent.value =
    statisticStore.revenue?.history[statisticStore.revenue.history.length - 1].growth_percent || 0

  // Margin %
  margin.value =
    statisticStore.profit?.total && statisticStore.revenue?.total
      ? Number(((statisticStore.profit.total / statisticStore.revenue.total) * 100).toFixed(2))
      : 0

  // Calculate sales trend percentage (you might need to add this to your backend)
  // For now, using a placeholder calculation
  if (statisticStore.salesReport && statisticStore.salesReport.length > 1) {
    const currentPeriod =
      statisticStore.salesReport[statisticStore.salesReport.length - 1]?.total_sold || 0
    const previousPeriod =
      statisticStore.salesReport[statisticStore.salesReport.length - 2]?.total_sold || 0
    salesTrendPercent.value =
      previousPeriod > 0
        ? ((currentPeriod - previousPeriod) / previousPeriod) * 100
        : currentPeriod > 0
          ? 100
          : 0
  }
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

console.log('====================================')
console.log(lowStockProducts.value)
console.log('====================================')

const topStats = computed(() => [
  {
    id: 1,
    icon: Users,
    label: 'Total products',
    value: lowStockProducts.value.length,
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
    value: avgRevenue.value,
    gradientFrom: '#092C4C',
    gradientTo: '#092C4C',
    trendPercent: revenueTrendPercent.value,
  },
  {
    id: 4,
    icon: DollarSign,
    label: 'Total Purchase',
    value: avgRevenue.value,
    gradientFrom: '#155EEF',
    gradientTo: '#155EEF',
    trendPercent: revenueTrendPercent.value,
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
