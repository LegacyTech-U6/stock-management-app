<!-- components/EnterpriseGrid.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="enterprise in enterprises"
      :key="enterprise.id"
      class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-lg transition-all group"
    >
      <!-- Header -->
      <div class="flex items-start justify-between mb-5">
        <div class="flex items-center gap-3">
          <div :class="['w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm', getGradientColor(enterprise.id)]">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 text-lg">{{ enterprise.name || 'Unnamed' }}</h3>
            <p class="text-xs text-gray-500">ID: {{ enterprise.id }}</p>
          </div>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 shadow-sm">
          Active
        </span>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 mb-5 line-clamp-2 min-h-[40px]">
        {{ enterprise.description || 'No description provided' }}
      </p>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-3 mb-5">
        <!-- Revenue -->
        <div class="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-100/50">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-green-700 uppercase tracking-wide">Revenue</span>
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-xl font-bold text-gray-900">${{ formatCurrency(enterprise.totalRevenue) }}</p>
        </div>

        <!-- Team -->
        <div class="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-100/50">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-purple-700 uppercase tracking-wide">Team</span>
            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p class="text-xl font-bold text-gray-900">{{ enterprise.totalMembers || 0 }}</p>
        </div>

        <!-- Inventory -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-100/50">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-blue-700 uppercase tracking-wide">Stock</span>
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p class="text-xl font-bold text-gray-900">${{ formatCurrency(enterprise.inventoryValue) }}</p>
        </div>

        <!-- Health -->
        <div class="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-4 border border-orange-100/50">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-orange-700 uppercase tracking-wide">Health</span>
            <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p class="text-xl font-bold text-gray-900">{{ calculateHealthScore(enterprise) }}%</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center gap-2 text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-xs">{{ enterprise.ville || 'No location' }}</span>
        </div>
        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            @click="$emit('view', enterprise)"
            class="p-2 hover:bg-gray-100 rounded-lg transition-all"
            title="View"
          >
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            @click="$emit('edit', enterprise)"
            class="p-2 hover:bg-gray-100 rounded-lg transition-all"
            title="Edit"
          >
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            class="p-2 hover:bg-red-50 rounded-lg transition-all"
            title="Delete"
          >
            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  enterprises: {
    type: Array,
    required: true
  }
})

defineEmits(['view', 'edit'])

function formatCurrency(value) {
  const numValue = Number(value) || 0
  return numValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

function calculateHealthScore(enterprise) {
  const revenue = Number(enterprise.totalRevenue) || 0
  const inventory = Number(enterprise.inventoryValue) || 0
  const members = Number(enterprise.totalMembers) || 0

  let score = 50
  if (revenue > 0) score += 25
  if (inventory > 0) score += 15
  if (members > 0) score += 10

  return Math.min(score, 100)
}

function getGradientColor(id) {
  const colors = [
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-blue-500 to-blue-600',
    'from-teal-500 to-teal-600',
    'from-indigo-500 to-indigo-600',
    'from-cyan-500 to-cyan-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
  ]
  return colors[id % colors.length]
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style
