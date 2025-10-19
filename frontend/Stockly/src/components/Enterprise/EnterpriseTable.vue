<!-- components/EnterpriseTable.vue -->
<template>
  <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gradient-to-r from-gray-50 to-gray-100/50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Company Name
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Location
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Plan
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Created Date
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100/50">
          <tr
            v-for="enterprise in enterprises"
            :key="enterprise.id"
            class="hover:bg-blue-50/30 transition-colors"
          >
            <!-- Company Name -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div :class="['w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm', getGradientColor(enterprise.id)]">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ enterprise.name || 'Unnamed' }}</p>
                  <p class="text-xs text-gray-500">{{ truncateText(enterprise.description, 40) }}</p>
                </div>
              </div>
            </td>

            <!-- Email -->
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ enterprise.email_contact || 'No email' }}
            </td>

            <!-- Location -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ enterprise.ville || 'No location' }}
              </div>
            </td>

            <!-- Plan -->
            <td class="px-6 py-4">
              <span class="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full text-xs font-medium shadow-sm">
                Upgrade
              </span>
            </td>

            <!-- Created Date -->
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ formatDate(enterprise.created_at) }}
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <span class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 shadow-sm inline-flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Active
              </span>
            </td>

            <!-- Actions -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-2">
                <button
                  @click="$emit('view', enterprise)"
                  class="p-2 hover:bg-blue-50 rounded-lg transition-all"
                  title="View"
                >
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  @click="$emit('edit', enterprise)"
                  class="p-2 hover:bg-blue-50 rounded-lg transition-all"
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-100/50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-transparent">
      <p class="text-sm text-gray-600">
        Showing <span class="font-semibold text-gray-900">1</span> to
        <span class="font-semibold text-gray-900">{{ enterprises.length }}</span> of
        <span class="font-semibold text-gray-900">{{ enterprises.length }}</span> entries
      </p>
      <div class="flex items-center gap-2">
        <button class="p-2 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all">
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button class="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-sm font-medium">
          1
        </button>
        <button class="p-2 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all">
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
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

function truncateText(text, maxLength) {
  if (!text) return 'No description'
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

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
