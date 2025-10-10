<!-- components/EnterpriseCard.vue -->
<template>
  <div v-if="enterprise" class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <!-- Header with icon, status, and health percentage -->
    <div class="flex items-start justify-between mb-6">
      <div :class="[enterprise.iconBg || 'bg-gray-300', 'w-16 h-16 rounded-lg flex items-center justify-center']">
        <component
          v-if="enterprise.icon"
          :is="enterprise.icon"
          class="w-8 h-8 text-white"
        />
        <span v-else class="text-xs text-gray-600">No Icon</span>
      </div>

      <div class="text-right">
        <span
          :class="[enterprise.statusColor || 'bg-gray-200 text-gray-700', 'inline-block px-3 py-1 rounded-full text-xs font-semibold']"
        >
          {{ enterprise.status || "No status" }}
        </span>
        <p class="text-sm text-gray-500 mt-2">
          {{ enterprise.health || "No health data" }}
        </p>
      </div>
    </div>

    <!-- Enterprise Name and Description -->
    <h3 class="font-semibold text-lg text-gray-900 mb-1">
      {{ enterprise.name || "Unnamed enterprise" }}
    </h3>
    <p class="text-sm text-gray-500 mb-1">
      {{ enterprise.description || "No description available" }}
    </p>
    <p class="text-xs text-gray-400 mb-6">
      Active {{ enterprise.activeTime || "No active time" }}
    </p>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <!-- Products -->
      <div class="bg-blue-50 rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-600">Products</span>
          <span
            :class="[
              (enterprise.productsChange ?? 0) > 0 ? 'text-green-600' : 'text-red-600',
              'text-xs font-semibold'
            ]"
          >
            {{ enterprise.productsChange > 0 ? '+' : '' }}{{ enterprise.productsChange ?? 0 }}%
          </span>
        </div>
        <p class="text-lg font-bold text-gray-900">
          {{ formatNumber(enterprise.products) || '0' }}
        </p>
      </div>

      <!-- Revenue -->
      <div class="bg-green-50 rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-600">Revenue</span>
          <span
            :class="[
              (enterprise.revenueChange ?? 0) > 0 ? 'text-green-600' : 'text-red-600',
              'text-xs font-semibold'
            ]"
          >
            {{ enterprise.revenueChange > 0 ? '+' : '' }}{{ enterprise.revenueChange ?? 0 }}%
          </span>
        </div>
        <p class="text-lg font-bold text-gray-900">
          ${{ formatNumber(enterprise.revenue) || '0' }}
        </p>
      </div>

      <!-- Orders -->
      <div class="bg-orange-50 rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-gray-600">Orders</span>
          <span
            :class="[
              (enterprise.ordersChange ?? 0) > 0 ? 'text-green-600' : 'text-red-600',
              'text-xs font-semibold'
            ]"
          >
            {{ enterprise.ordersChange > 0 ? '+' : '' }}{{ enterprise.ordersChange ?? 0 }}%
          </span>
        </div>
        <p class="text-lg font-bold text-gray-900">
          {{ formatNumber(enterprise.orders) || '0' }}
        </p>
      </div>

      <!-- Team -->
      <div class="bg-purple-50 rounded-lg p-4">
        <span class="text-xs text-gray-600">Team</span>
        <p class="text-lg font-bold text-gray-900 mt-2">
          {{ enterprise.teamUsers ?? 0 }} users
        </p>
      </div>
    </div>

    <!-- Alerts & Tasks -->
    <div class="border-t border-gray-200 pt-4 mb-6" v-if="enterprise.alerts && enterprise.alerts.length">
      <p class="text-xs font-semibold text-gray-600 mb-3">Alerts & Tasks</p>
      <div class="space-y-2">
        <div
          v-for="(alert, idx) in enterprise.alerts"
          :key="idx"
          class="flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div :class="[alert.color || 'bg-gray-300', 'w-2 h-2 rounded-full']"></div>
            <span class="text-xs text-gray-600">{{ alert.label || 'No label' }}</span>
          </div>
          <span
            :class="[alert.badgeBg || 'bg-gray-100 text-gray-700', 'text-xs font-semibold px-2 py-1 rounded']"
          >
            {{ alert.count ?? 0 }}
          </span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <button
      @click="handleView"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
    >
      <Eye class="w-4 h-4" />
      Open
    </button>
  </div>

  <!-- Si enterprise est null -->
  <div v-else class="text-gray-400 text-center py-6">
    No enterprise data available.
  </div>
</template>

<script setup>
import { Eye } from 'lucide-vue-next'

const props = defineProps({
  enterprise: {
    type: Object,
    required: true
  }
})

// ✅ Define emits
const emit = defineEmits(['view'])

const handleView = () => {
  emit('view', props.enterprise)
}


// fonction utilitaire pour formater sans erreur
function formatNumber(value) {
  return typeof value === 'number' ? value.toLocaleString() : '0'
}
</script>
