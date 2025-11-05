<!-- components/EnterpriseTable.vue -->
<template>
  <div class="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
            >
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
            >
              Company Name
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
            >
              Email
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
            >
              Account URL
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
            >
              location
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
            >
              Created Date
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
            >
              Status
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
            ></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="enterprise in enterprises"
            :key="enterprise.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <!-- Checkbox -->
            <td class="px-4 py-3">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
            </td>

            <!-- Company Name -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2.5">
                <div
                  :class="[
                    'w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0',
                    getGradientColor(enterprise.id),
                  ]"
                >
                  <img
                    v-if="enterprise.logo_url"
                    :src="enterprise.logo_url"
                    :alt="enterprise.logo_url"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <svg
                    v-else
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="font-medium text-gray-900 text-sm truncate">
                    {{ enterprise.name || 'Unnamed' }}
                  </p>
                </div>
              </div>
            </td>

            <!-- Email -->
            <td class="px-4 py-3">
              <span class="text-sm text-gray-600 truncate block max-w-[180px]">
                {{ enterprise.email_contact || 'No email' }}
              </span>
            </td>

            <!-- Account URL -->
            <td class="px-4 py-3">
              <span class="text-sm text-gray-600 truncate block max-w-[150px]">
                {{ getAccountUrl(enterprise) }}
              </span>
            </td>

            <!-- Plan -->
            <td class="px-4 py-3">
              <span
                class="px-2.5 py-1 bg-purple-500 text-white rounded-md text-xs font-medium inline-block"
              >
                {{ enterprise.ville || 'N/A' }}
              </span>
            </td>

            <!-- Created Date -->
            <td class="px-4 py-3">
              <span class="text-sm text-gray-600">
                {{ formatDate(enterprise.created_at) }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2.5 py-1 rounded-md text-xs font-medium inline-flex items-center gap-1',
                  enterprise.id === 8 ? 'bg-red-500 text-white' : 'bg-green-500 text-white',
                ]"
              >
                <span class="w-1 h-1 rounded-full bg-white"></span>
                {{ enterprise.id === 8 ? 'Inactive' : 'Active' }}
              </span>
            </td>

            <!-- Actions -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-1">
                <button
                  @click="$emit('view', enterprise)"
                  class="p-1.5 hover:bg-gray-100 rounded-md transition-all"
                  title="View"
                >
                  <svg
                    class="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button
                  @click="$emit('edit', enterprise)"
                  class="p-1.5 hover:bg-gray-100 rounded-md transition-all"
                  title="Edit"
                >
                  <svg
                    class="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button class="p-1.5 hover:bg-gray-100 rounded-md transition-all" title="Delete">
                  <svg
                    class="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50"
    >
      <p class="text-xs text-gray-600">
        Row Per Page
        <select class="ml-1 border border-gray-300 rounded px-2 py-0.5 text-xs">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span class="ml-3">Entries</span>
      </p>
      <div class="flex items-center gap-2">
        <button class="p-1.5 border border-gray-300 rounded hover:bg-white transition-all">
          <svg
            class="w-3.5 h-3.5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button class="w-7 h-7 bg-orange-500 text-white rounded text-xs font-medium">1</button>
        <button class="p-1.5 border border-gray-300 rounded hover:bg-white transition-all">
          <svg
            class="w-3.5 h-3.5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
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
    required: true,
  },
})

defineEmits(['view', 'edit'])

function getAccountUrl(enterprise) {
  if (!enterprise.name) return 'No URL'
  const slug = enterprise.name.toLowerCase().replace(/\s+/g, '')
  return `${slug.substring(0, 3)}.example.com`
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
