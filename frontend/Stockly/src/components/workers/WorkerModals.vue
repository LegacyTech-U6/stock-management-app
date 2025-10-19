<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center p-4 z-50"
    @click.self="handleClose"
  >
    <div class="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between rounded-t-2xl">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800">
            {{ isEditing ? 'Edit Employee' : 'Add Employee' }}
          </h2>
          <p class="text-gray-500 text-sm mt-1">
            {{ isEditing ? 'Update employee information' : 'Create new Employee' }}
          </p>
        </div>
        <button
          @click="handleClose"
          class="text-gray-400 hover:text-gray-700 transition p-2 hover:bg-gray-50 rounded-lg"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-8">
        <!-- Employee Information Section -->
        <div class="mb-8">
          <button
            type="button"
            @click="sections.employee = !sections.employee"
            class="w-full flex items-center justify-between mb-5 pb-3 border-b border-gray-100"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-50 rounded-lg">
                <User class="w-5 h-5 text-orange-500" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800">Employee Information</h3>
            </div>
            <ChevronDown
              :class="['w-5 h-5 text-gray-400 transition-transform', { 'rotate-180': sections.employee }]"
            />
          </button>

          <div v-show="sections.employee" class="space-y-5">
            <!-- Profile Photo -->
            <div class="flex items-center gap-4 mb-6">
              <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <UserCircle class="w-12 h-12 text-gray-400" />
              </div>
              <button
                type="button"
                class="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition font-medium"
              >
                Change Image
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <!-- Name -->
              <div>
                <label class="block text-gray-700 font-medium mb-2 text-sm">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formWorker.name"
                  type="text"
                  placeholder="Enter full name"
                  class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm"
                  required
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-gray-700 font-medium mb-2 text-sm">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formWorker.email"
                  type="email"
                  placeholder="Enter email"
                  class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm"
                  required
                />
              </div>

              <!-- Position -->
              <div>
                <label class="block text-gray-700 font-medium mb-2 text-sm">Position</label>
                <input
                  v-model="formWorker.position"
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm"
                />
              </div>

              <!-- Date Hired -->
              <div>
                <label class="block text-gray-700 font-medium mb-2 text-sm">Date Hired</label>
                <input
                  v-model="formWorker.date_hired"
                  type="date"
                  class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm text-gray-500"
                />
              </div>

              <!-- Department -->
              <div>
                <label class="block text-gray-700 font-medium mb-2 text-sm">Department</label>
                <select
                  v-model="formWorker.entreprise_id"
                  class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm text-gray-500"
                >
                  <option value="">Select</option>
                  <option
                    v-for="enterprise in entreprises"
                    :key="enterprise.id"
                    :value="enterprise.id"
                  >
                    {{ enterprise.name }}
                  </option>
                </select>
              </div>

              <!-- Role -->
              <div>
                <label class="block text-gray-700 font-medium mb-2 text-sm">
                  Role <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formWorker.role_id"
                  class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm text-gray-500"
                  required
                >
                  <option value="">Select</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-gray-700 font-medium mb-2 text-sm">Status</label>
                <select
                  v-model="formWorker.status"
                  class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm text-gray-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Password Section (only for new workers) -->
        <div v-if="!isEditing" class="mb-8">
          <button
            type="button"
            @click="sections.password = !sections.password"
            class="w-full flex items-center justify-between mb-5 pb-3 border-b border-gray-100"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-50 rounded-lg">
                <Lock class="w-5 h-5 text-orange-500" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800">Password</h3>
            </div>
            <ChevronDown
              :class="['w-5 h-5 text-gray-400 transition-transform', { 'rotate-180': sections.password }]"
            />
          </button>

          <div v-show="sections.password" class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-gray-700 font-medium mb-2 text-sm">
                Password <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formWorker.password"
                type="password"
                placeholder="Enter password"
                class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm"
                :required="!isEditing"
              />
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-2 text-sm">
                Confirm Password <span class="text-red-500">*</span>
              </label>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm password"
                class="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:outline-none text-sm"
                :required="!isEditing"
              />
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            @click="handleClose"
            class="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {{ isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Add Employee' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { X, User, Lock, ChevronDown, UserCircle } from 'lucide-vue-next'
import { useRoleStore } from '@/stores/roleStore'
import { useEntrepriseStore } from '@/stores/entrepriseStore'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  worker: {
    type: Object,
    default: null,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'submit'])

const roleStore = useRoleStore()
const enterpriseStore = useEntrepriseStore()

const roles = computed(() => roleStore.roles)
const entreprises = computed(() => enterpriseStore.entreprises)

const isSubmitting = ref(false)
const confirmPassword = ref('')

const sections = ref({
  employee: true,
  password: true,
})

const formWorker = ref({
  name: '',
  email: '',
  position: '',
  date_hired: '',
  status: 'active',
  entreprise_id: '',
  password: '',
  role_id: '',
})

// Define resetForm before using it in watch
const resetForm = () => {
  formWorker.value = {
    name: '',
    email: '',
    position: '',
    date_hired: '',
    status: 'active',
    entreprise_id: '',
    password: '',
    role_id: '',
  }
  confirmPassword.value = ''
  sections.value = {
    employee: true,
    password: true,
  }
}

// Watch for worker prop changes to populate form
watch(
  () => props.worker,
  (newWorker) => {
    if (newWorker && props.isEditing) {
      formWorker.value = { ...newWorker }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

const handleSubmit = async () => {
  if (!props.isEditing && formWorker.value.password !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  isSubmitting.value = true
  await emit('submit', { ...formWorker.value })
  isSubmitting.value = false
}

const handleClose = () => {
  resetForm()
  emit('close')
}
</script>
