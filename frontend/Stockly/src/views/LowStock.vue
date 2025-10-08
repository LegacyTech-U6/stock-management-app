
<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Low Stock Alert</h1>
            <p class="text-gray-500 mt-1">
              {{ lowStockProducts.length }} products below minimum stock levels
            </p>
          </div>
          <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium">
            Back to Inventory
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span class="text-gray-600 text-sm">Total Units Needed</span>
          </div>
          <p class="text-3xl font-bold text-gray-900">{{ totalUnitsNeeded }}</p>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-gray-600 text-sm">Est. Reorder Cost</span>
          </div>
          <p class="text-3xl font-bold text-gray-900">${{ formatCurrency(totalReorderCost) }}</p>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-red-100 rounded-lg">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span class="text-gray-600 text-sm">Urgent Restocks</span>
          </div>
          <p class="text-3xl font-bold text-gray-900">{{ urgentRestockCount }}</p>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div class="relative mb-4">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products by name, SKU, or supplier..."
            v-model="searchQuery"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Stock Level
            </label>
            <select
              v-model="stockLevelFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Low Stock</option>
              <option value="critical">Critical Only</option>
              <option value="warning">Warning Only</option>
            </select>
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Sort by
            </label>
            <select
              v-model="sortBy"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="urgency">Most Urgent</option>
              <option value="unitsNeeded">Most Units Needed</option>
              <option value="reorderCost">Highest Reorder Cost</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LowStockCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @restock="handleRestock"
          :reorderCost="totalReorderCost"
        />
      </div>
      <div v-else class="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Low Stock Products</h3>
        <p class="text-gray-500">All products are adequately stocked. Excellent inventory management!</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import LowStockCard from "../components/LowStockCard.vue";
import { LowStock } from "@/service/api";

const searchQuery = ref("");
const stockLevelFilter = ref("all");
const sortBy = ref("urgency");
const lowStockProducts = ref([]); // ✅ reactive list
const error = ref(null);
const message = ref('')
onMounted(async () => {
  await fetchLowStockProducts();
});

async function fetchLowStockProducts() {
  try {
    const data = await LowStock();
    message.value = data.message

    lowStockProducts.value =  data.products;
    error.value = null;
    console.log("✅ Low products loaded:", lowStockProducts.value);
  } catch (err) {
    console.error("❌ Error fetching low stock:", err);
    error.value = err;
    lowStockProducts.value = [];
  }
}

const totalUnitsNeeded = computed(() =>
  (lowStockProducts.value || []).reduce(
    (sum, p) => sum + (p.min_stock_level - p.quantity),
    0
  )
);

const totalReorderCost = computed(() =>
  (lowStockProducts.value || []).reduce((sum, p) => sum + (p.cost_price * (p.min_stock_level - p.quantity)), 0)
);

const urgentRestockCount = computed(() =>
  (lowStockProducts.value || []).filter((p) => p.stockLevel === "critical").length
);

const filteredProducts = computed(() => {
  let result = lowStockProducts.value || [];

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q)
    );
  }

  if (stockLevelFilter.value !== "all") {
    result = result.filter((p) => p.stockLevel === stockLevelFilter.value);
  }

  if (sortBy.value === "unitsNeeded") {
    result = result.sort(
      (a, b) => b.minStock - b.currentStock - (a.minStock - a.currentStock)
    );
  } else if (sortBy.value === "reorderCost") {
    result = result.sort((a, b) => b.reorderCost - a.reorderCost);
  } else {
    result = result.sort(
      (a, b) =>
        (b.stockLevel === "critical" ? 1 : 0) -
        (a.stockLevel === "critical" ? 1 : 0)
    );
  }

  return result;
});

function handleRestock(product) {
  console.log("Restock:", product);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
</script>

