<!-- components/EnterpriseGrid.vue -->
<template>
  <div class="grid grid-cols-1 gap-3">
    <div
      v-for="enterprise in enterprises"
      :key="enterprise.id"
      class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all"
    >
      <!-- Header -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2.5">
          <div :class="['w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0', getGradientColor(enterprise.id)]">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="min-w-0">
            <h3 class="font-semibold text-gray-900 text-sm truncate">{{ enterprise.name || 'Unnamed' }}</h3>
            <p class="text-xs text-gray-500">{{ enterprise.email_contact || 'No email' }}</p>
          </div>
        </div>
        <span :class="[
          'px-2 py-0.5 rounded-md text-xs font-medium',
          enterprise.id === 8 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        ]">
          {{ enterprise.id === 8 ? 'Inactive' : 'Active' }}
        </span>
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-gray-100">
        <div>
          <p class="text-xs text-gray-500 mb-0.5">Plan</p>
          <span class="px-2 py-0.5 bg-purple-500 text-white rounded text-xs font-medium inline-block">
            Upgrade
          </span>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-0.5">Created</p>
          <p class="text-xs font-medium text-gray-900">{{ formatDate(enterprise.created_at) }}</p>
        </div>
      </div>

      <!-- Location -->
      <div class="flex items-center gap-2 mb-3 text-xs text-gray-600">
        <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{{ enterprise.ville || 'No location' }}</span>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <button
          @click="$emit('view', enterprise)"
          class="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-xs font-medium flex items-center justify-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View
        </button>
        <button
          @click="$emit('edit', enterprise)"
          class="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all text-xs font-medium flex items-center justify-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          class="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
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

function formatDate(date) {
  if (!date) return 'Recently'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
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
