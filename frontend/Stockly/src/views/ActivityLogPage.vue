<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-gray-800">Journal d'activités</h1>
        <p class="text-gray-500 text-sm">Suivez les actions récentes des utilisateurs.</p>
      </div>
      <div>
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher une action..."
          class="px-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>
    </div>

    <!-- Table Section -->
    <div
      v-if="loading"
      class="flex justify-center items-center h-40 text-gray-500 text-lg"
    >
      Chargement...
    </div>

    <div
      v-else
      class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-700">
          <thead class="bg-gray-50 border-b text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th class="px-6 py-3">ID</th>
              <th class="px-6 py-3">Utilisateur</th>
              <th class="px-6 py-3">Action</th>
              <th class="px-6 py-3">Entité</th>
              <th class="px-6 py-3">Quantité</th>
              <th class="px-6 py-3">Montant</th>
              <th class="px-6 py-3">Description</th>
              <th class="px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="activity in filteredActivities"
              :key="activity.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-3 font-medium text-gray-900">{{ activity.id }}</td>
              <td class="px-6 py-3">{{ activity.user?.username || 'N/A' }}</td>
              <td class="px-6 py-3">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    activity.action === 'CREATE'
                      ? 'bg-green-100 text-green-700'
                      : activity.action === 'DELETE'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  ]"
                >
                  {{ activity.action }}
                </span>
              </td>
              <td class="px-6 py-3">{{ activity.entity_name || 'N/A' }}</td>
              <td class="px-6 py-3">{{ activity.quantity || 0 }}</td>
              <td class="px-6 py-3 font-medium text-gray-800">
                {{ activity.amount ? activity.amount.toFixed(2) + ' €' : '-' }}
              </td>
              <td class="px-6 py-3 max-w-xs truncate" :title="activity.description">
                {{ activity.description }}
              </td>
              <td class="px-6 py-3 text-gray-500 text-sm">
                {{ new Date(activity.createdAt).toLocaleString() }}
              </td>
            </tr>

            <tr v-if="filteredActivities.length === 0">
              <td colspan="8" class="text-center py-6 text-gray-500">
                Aucune activité trouvée.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useActivityStore } from '@/stores/activityStore'

const activityStore = useActivityStore()
const loading = ref(true)
const search = ref('')

onMounted(async () => {
  await activityStore.fetchActivities()
  await activityStore.fetchDailySalesReport() // double fetch to ensure latest data
  loading.value = false
})

const activities = computed(() => activityStore.activities)

const filteredActivities = computed(() => {
  if (!search.value) return activities.value
  return activities.value.filter(a =>
    Object.values(a).some(v =>
      String(v).toLowerCase().includes(search.value.toLowerCase())
    )
  )
})
</script>

<style scoped>
/* Optional: soften scrollbars for a cleaner UX */
::-webkit-scrollbar {
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
