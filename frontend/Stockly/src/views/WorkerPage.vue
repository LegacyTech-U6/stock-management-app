<template>
  <div class="p-6 pt-10 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">👷 Worker Management</h1>

    <!-- Create Worker Form -->
    <form @submit.prevent="createWorker" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
      <h2 class="text-xl font-semibold mb-4">Add New Worker</h2>
      <div class="grid grid-cols-2 gap-4">
        <input v-model="newWorker.name" type="text" placeholder="Name" class="input" />
        <input v-model="newWorker.email" type="email" placeholder="Email" class="input" />
        <input v-model="newWorker.date_of_birth" type="date" class="input" />
        <input v-model="newWorker.position" type="text" placeholder="Position" class="input" />
        <input v-model="newWorker.date_hired" type="date" class="input" />
        <select v-model="newWorker.status" class="input">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
      <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Worker</button>
    </form>

    <!-- Worker List -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 class="text-xl font-semibold mb-4">All Workers</h2>
      <table class="table-auto w-full text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Position</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="worker in workers" :key="worker.id" class="border-t">
            <td class="px-4 py-2">{{ worker.name }}</td>
            <td class="px-4 py-2">{{ worker.email }}</td>
            <td class="px-4 py-2">{{ worker.position }}</td>
            <td class="px-4 py-2">{{ worker.status }}</td>
            <td class="px-4 py-2">
              <button @click="deleteWorker(worker.id)" class="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const workers = ref([]);
const newWorker = ref({
  name: '',
  email: '',
  date_of_birth: '',
  position: '',
  date_hired: '',
  status: 'active',
});

const fetchWorkers = async () => {
  const res = await fetch('/api/workers');
  workers.value = await res.json();
};

const createWorker = async () => {
  await fetch('/api/workers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newWorker.value),
  });
  newWorker.value = {
    name: '',
    email: '',
    date_of_birth: '',
    position: '',
    date_hired: '',
    status: 'active',
  };
  fetchWorkers();
};

const deleteWorker = async (id) => {
  await fetch(`/api/workers/${id}`, { method: 'DELETE' });
  fetchWorkers();
};

onMounted(() => {
  fetchWorkers();
});
</script>

<style scoped>

</style>
