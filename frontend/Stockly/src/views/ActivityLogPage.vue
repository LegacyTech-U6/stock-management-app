<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Journal d'activités</h1>

    <div v-if="loading" class="text-gray-500">Chargement...</div>
    <div v-else>
      <table class="w-full table-auto border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2 text-left">ID</th>
            <th class="border px-4 py-2 text-left">Utilisateur</th>
            <th class="border px-4 py-2 text-left">Action</th>
            <th class="border px-4 py-2 text-left">Entité</th>
            <th class="border px-4 py-2 text-left">Quantité</th>
            <th class="border px-4 py-2 text-left">Montant</th>
            <th class="border px-4 py-2 text-left">Description</th>
            <th class="border px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="activity in activities"
            :key="activity.id"
            class="hover:bg-gray-50"
          >
            <td class="border px-4 py-2">{{ activity.id }}</td>
            <td class="border px-4 py-2">{{ activity.user?.username || 'N/A' }}</td>
            <td class="border px-4 py-2">{{ activity.action }}</td>
            <td class="border px-4 py-2">{{ activity.entity_name || 'N/A' }}</td>
            <td class="border px-4 py-2">{{ activity.quantity || 0 }}</td>
            <td class="border px-4 py-2">{{ activity.amount || 0 }}</td>
            <td class="border px-4 py-2">{{ activity.description }}</td>
            <td class="border px-4 py-2">
              {{ new Date(activity.createdAt).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="activities.length === 0" class="text-gray-500 mt-4">
        Aucune activité trouvée.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useActivityStore } from '@/stores/activityStore'

const activityStore = useActivityStore()
const loading = ref(true)

onMounted(async () => {
  await activityStore.fetchActivities()
  loading.value = false
})

const activities = activityStore.activities
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  text-align: left;
}
</style>
