<template>
  <div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
    <!-- Card Header with Avatar -->
    <div class="flex flex-col items-center mb-4">
      <div class="relative mb-3">
        <div
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xl',
            getColorForWorker(worker.worker_id),
          ]"
        >
          {{ worker?.name?.charAt(0)?.toUpperCase() }}
        </div>
        <div class="absolute top-0 right-0">
          <div class="relative group">
            <button
              @click="showMenu = !showMenu"
              class="p-1 text-gray-400 hover:text-gray-600 transition"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                />
              </svg>
            </button>
            <div
              v-if="showMenu"
              class="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            >
              <button
                @click="handleEdit"
                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
              >
                Edit
              </button>
              <button
                @click="handleDelete"
                class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Worker Info -->
      <div class="text-center mb-1">
        <span class="text-xs text-orange-500 font-medium">EMP ID : {{ worker.worker_id }}</span>
      </div>
      <h3 class="font-semibold text-gray-900 text-center mb-1">{{ worker?.name }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ worker?.position }}</p>
    </div>

    <!-- Card Body -->
    <div class="space-y-3 mb-4 border-t border-gray-100 pt-4">
      <div class="flex justify-between text-sm">
        <span class="text-gray-500 font-medium">Joined</span>
        <span class="text-gray-700">{{ formatDate(worker.date_hired) }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-500 font-medium">Department</span>
        <span class="text-gray-700">{{ worker.entreprise_name || 'N/A' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  worker: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])

const showMenu = ref(false)

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-teal-500',
  'bg-cyan-500',
]

const getColorForWorker = (workerId) => {
  let hash = 0
  const str = workerId?.toString() || ''

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash % colors.length)
  return colors[index]
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const handleEdit = () => {
  showMenu.value = false
  emit('edit', props.worker)
}

const handleDelete = () => {
  showMenu.value = false
  emit('delete', props.worker.worker_id)
}
</script>
