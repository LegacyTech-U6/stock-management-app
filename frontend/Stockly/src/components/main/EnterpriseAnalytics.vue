<!-- App.vue -->
<template>
  <div class="bg-gray-50 min-h-screen p-8">

    <SectionTitle title="TechCorp Solutions Analytics" />

    <!-- Top Stats Grid -->
    <div class="grid grid-cols-4 gap-6 mb-8">
      <StatsCards
        v-for="stat in topStats"
        :key="stat.id"
        :icon="stat.icon"
        :label="stat.label"
        :value="stat.value"
        :subtext="stat.subtext"
        :color="stat.color"
        :containerClass="stat.containerClass"
      />
    </div>

    <!-- Alert Cards -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <AlertCard
        v-for="alert in alerts"
        :key="alert.id"
        :title="alert.title"
        :count="alert.count"
        :color="alert.color"
        :action="alert.action"
      />
      <StatsCards
        :icon="ShoppingCart"
        label="Avg Order Value"
        value="$364.27"
        color="bg-blue-500"
      />
    </div>

    <!-- Charts and Workers -->
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2">

      </div>
      <WorkersPanel :topWorker="topWorker" :otherWorkers="otherWorkers" />
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted,computed,watch } from 'vue';
import {
  TrendingUp,
  AlertTriangle,
  Package,
  DollarSign,
  Users,
  ShoppingCart
} from 'lucide-vue-next';
import {useStatisticsStore} from '@/stores/statisticStore'
import SectionTitle from '@/components/SectionTitle.vue';
import StatsCards from '@/components/StartsCards.vue';
import AlertCard from '@/components/AlertCard.vue';
import SalesTrendChart from '@/components/SalesTrendChart.vue';
import WorkersPanel from '@/components/WorkersPanel.vue';
import { useEntrepriseStore } from '@/stores/entrepriseStore'
import { useProductStore } from '@/stores/productStore';
const entrepriseStore = useEntrepriseStore()

const statisticStore = useStatisticsStore()

const productStore = useProductStore()


onMounted(async()=>{
  productStore.fetchFinishedProducts()
  productStore.fetchLowStockProducts()
})
const activeEntreprise = computed(() => entrepriseStore.activeEntreprise)

watch(activeEntreprise, (newEntreprise) => {
  if (newEntreprise?.id) {
    statisticStore.fetchRevenue(newEntreprise.id)
  }
}, { immediate: true })

const salesTrendData = ref([
  { day: 'Mon', sales: 3000, orders: 45 },
  { day: 'Tue', sales: 4000, orders: 52 },
  { day: 'Wed', sales: 2000, orders: 38 },
  { day: 'Thu', sales: 5000, orders: 61 },
  { day: 'Fri', sales: 8000, orders: 78 },
  { day: 'Sat', sales: 6000, orders: 65 },
  { day: 'Sun', sales: 7000, orders: 72 }
])

const topStats = computed(() => [
  {
    id: 1,
    icon: Users,
    label: 'Total Workers',
    value: '12',
    subtext: 'Under this enterprise',
    color: 'bg-blue-500',
    containerClass:"p-6 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white"
  },
  {
    id: 2,
    icon: Package,
    label: 'Total Products',
    value: '156',
    subtext: 'In stock catalog',
    color: 'bg-purple-500',
    containerClass:"border-2 p-6 rounded-xl border-purple-200 bg-gradient-to-br from-purple-50 to-white"
  },
  {
    id: 3,
    icon: DollarSign,
    label: 'Total Sales',
    value: statisticStore.revenue,
    subtext: '+18.5% from last period',
    color: 'bg-green-500',
    containerClass:"border-2  p-6 rounded-xl border-green-200 bg-gradient-to-br from-green-50 to-white"
  },
  {
    id: 4,
    icon: TrendingUp,
    label: 'Invoices Issued',
    value: '342',
    subtext: '+12.3% from last period',
    color: 'bg-orange-500',
    containerClass:"p-6 rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white"
  }
]);

const alerts = ref([
  {
    id: 1,
    title: 'Low Stock Alerts',
    count: productStore?.lowProducts.length,
    color: 'border-yellow-300 bg-yellow-50',
    action: { label: 'View', color: 'border-yellow-400 text-yellow-600' }
  },
  {
    id: 2,
    title: 'Out of Stock',
    count: '3',
    color: 'border-red-300 bg-red-50',
    action: { label: 'Restock', color: 'border-red-400 text-red-600' }
  }
]);

const topWorker = ref({
  initials: 'SJ',
  name: 'Sarah Johnson',
  role: 'Manager',
  totalSales: '$45,680.00',
  invoices: '124',
  efficiency: '94%',
  rating: '4.8'
});

const otherWorkers = ref([
  {
    initials: 'JM',
    name: 'John Manager',
    role: 'Manager',
    totalSales: '$38,920.00',
    invoices: '106'
  },
  {
    initials: 'DM',
    name: 'David Martinez',
    role: 'Employee',
    totalSales: '$28,450.00',
    invoices: '78'
  }
]);


</script>
