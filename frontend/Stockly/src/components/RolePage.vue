<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Role Management</h1>
        <p class="text-gray-500 text-sm">Manage roles and permissions</p>
      </div>

      <button
        @click="openAddModal"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        + Add Role
      </button>
    </div>

    <!-- Loading -->
    <div v-if="roleStore.loading" class="text-center text-gray-500 py-10">
      Loading roles...
    </div>

    <!-- Error -->
    <div v-else-if="roleStore.error" class="text-center text-red-500 py-10">
      {{ roleStore.error }}
    </div>

    <!-- Empty state -->
    <div v-else-if="roleStore.roles.length === 0" class="text-center py-10 text-gray-500">
      No roles found.
    </div>

    <!-- Roles table -->
    <div v-else class="overflow-x-auto bg-white shadow rounded-xl">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="role in roleStore.roles" :key="role.id">
            <td class="px-6 py-4 text-sm text-gray-700">{{ role.id }}</td>
            <td class="px-6 py-4 text-sm text-gray-700">{{ role.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-700 space-x-3">
              <button
                @click="editRole(role)"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </button>
              <button
                @click="deleteRole(role.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 class="text-lg font-semibold mb-4">
          {{ editingRole ? 'Edit Role' : 'Add Role' }}
        </h2>

        <form @submit.prevent="saveRole">
          <label class="block mb-3">
            <span class="text-gray-700 text-sm">Role Name</span>
            <input
              v-model="form.name"
              type="text"
              class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              placeholder="Enter role name"
              required
            />
          </label>

          <div class="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {{ editingRole ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoleStore } from "@/stores/roleStore"

const roleStore = useRoleStore()
const showModal = ref(false)
const editingRole = ref(null)
const form = ref({ name: "" })

onMounted(() => {
  roleStore.fetchRoles()
})

// Open modal for new role
function openAddModal() {
  editingRole.value = null
  form.value = { name: "" }
  showModal.value = true
}

// Open modal for edit
function editRole(role) {
  editingRole.value = role
  form.value = { name: role.name }
  showModal.value = true
}

// Save role (create or update)
async function saveRole() {
  if (editingRole.value) {
    await roleStore.editRole(editingRole.value.id, form.value)
  } else {
    await roleStore.addRole(form.value)
  }
  closeModal()
}

// Delete role
async function deleteRole(id) {
  if (confirm("Are you sure you want to delete this role?")) {
    await roleStore.removeRole(id)
  }
}

function closeModal() {
  showModal.value = false
}
</script>

<style scoped>
/* Optional: fade-in modal */
</style>
