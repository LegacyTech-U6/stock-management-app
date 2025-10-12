<template>
  <div
    class="client-card border border-gray-200 rounded-lg p-4 bg-white text-black flex flex-col max-w-sm hover:shadow-md transition-shadow"
  >
    <!-- Top Section: Avatar, Name, Company, Status, Actions -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-start gap-3 flex-1">
        <!-- Avatar with Initials -->
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
          :style="{ backgroundColor: getAvatarColor(client.client_name) }"
        >
          {{ getInitials(client.client_name) }}
        </div>

        <div class="flex-1 min-w-0">
          <div class="font-semibold text-sm leading-tight mb-0.5">{{ client.client_name }}</div>
          <div class="text-xs text-gray-500 mb-1.5">{{ client.company || 'No Company' }}</div>
          <span
            class="inline-block px-2 py-0.5 text-xs rounded-full font-medium"
            :class="getStatusClass(client.status)"
          >
            {{ client.status || 'active' }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-1.5 ml-2">
        <button
          @click="$emit('edit', client)"
          class="bg-white border border-gray-200 p-1.5 rounded hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center"
          title="Edit client"
        >
          <WriteIcon class="w-4 h-4 text-gray-600" />
        </button>
        <button
          @click="$emit('delete', client)"
          class="bg-white border border-gray-200 p-1.5 rounded hover:bg-red-50 hover:border-red-200 transition-colors flex items-center justify-center"
          title="Delete client"
        >
          <DustbinIcon class="w-4 h-4 text-gray-600 hover:text-red-600" />
        </button>
      </div>
    </div>

    <!-- Contact Info -->
    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-xs text-gray-600">
        <MailIcon class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span class="truncate">{{ client.email }}</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-600">
        <PhoneIcon class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span>{{ client.client_PhoneNumber }}</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-600">
        <LocationIcon class="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <span class="truncate">{{ client.location }}</span>
      </div>
    </div>

    <hr class="border-gray-100 mb-4" />

    <!-- Stats Section -->
    <div class="grid grid-cols-2 gap-4 mb-2">
      <div>
        <div class="text-xs text-gray-500 mb-1">Total Orders</div>
        <div class="font-bold text-lg">{{ client.totalOrders || 0 }}</div>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">Total Spent</div>
        <div class="font-bold text-lg">{{ formatCurrency(client.totalSpent || 0) }}</div>
      </div>
    </div>

    <div class="text-xs text-gray-400">
      Last order: {{ formatDate(client.lastOrder) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref,defineEmits } from 'vue'
import PhoneIcon from '@/assets/icon svg/PhoneIcon.vue'
import WriteIcon from '@/assets/icon svg/WriteIcon.vue'
import DustbinIcon from '@/assets/icon svg/DustbinIcon.vue'
import MailIcon from '@/assets/icon svg/MailIcon.vue'
import LocationIcon from '@/assets/icon svg/LocationIcon.vue'
import LazyLoader from '@/components/ui/LazyLoader.vue'

const props = defineProps<{
  client: {
    id: number
    client_signature: string
    client_name: string
    company?: string
    client_PhoneNumber: string
    location: string
    email: string
    status?: string
    totalOrders?: number
    totalSpent?: number
    lastOrder?: string
  }
}>()

const loadingClients = ref(true)

const emit = defineEmits<{
  edit: [client: typeof props.client]
  delete: [client: typeof props.client]
}>()

// Generate initials from name
const getInitials = (name: string): string => {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// Generate consistent color based on name
const getAvatarColor = (name: string): string => {
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F97316', // orange
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Status badge styling
const getStatusClass = (status?: string) => {
  const statusLower = (status || 'active').toLowerCase()
  switch (statusLower) {
    case 'active':
      return 'bg-black text-white'
    case 'inactive':
      return 'bg-gray-200 text-gray-700'
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    default:
      return 'bg-black text-white'
  }
}

// Format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

// Format date
const formatDate = (date?: string): string => {
  if (!date) return 'No orders yet'
  try {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return date
  }
}
</script>

<style scoped>
.client-card {
  transition: all 0.2s ease;
}
</style>
