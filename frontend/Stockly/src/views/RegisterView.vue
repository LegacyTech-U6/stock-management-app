<template>
  <div
    class="flex flex-col items-center justify-center h-screen
           bg-gradient-to-br from-purple-50 via-white to-blue-50 lg:px-4"
  >
    <!-- Titre -->
    <div class="text-center mb-6">
      <h1 class="font-extrabold text-3xl text-gray-900">Join Stockly</h1>
      <p class="text-gray-600">Create your account to get started</p>
    </div>

    <!-- Carte du formulaire -->
    <div
      class="w-full lg:max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
    >
      <h2 class="text-lg font-semibold text-gray-800">Create an account</h2>

      <!-- Form -->
      <form class="space-y-5" @submit.prevent="handleRegister">
        <!-- First + Last name -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="font-medium text-gray-700">First Name</label>
            <div
              class="bg-gray-100 rounded-lg px-3 py-2 flex items-center
                     focus-within:ring-2 focus-within:ring-blue-500"
            >
              <input
                type="text"
                v-model="user.username"
                class="bg-transparent flex-1 outline-none"
                placeholder="John"
              />
            </div>
          </div>
          <div>
            <label class="font-medium text-gray-700">Last Name</label>
            <div
              class="bg-gray-100 rounded-lg px-3 py-2 flex items-center
                     focus-within:ring-2 focus-within:ring-blue-500"
            >
              <input
                type="text"
                v-model="user.last_name"
                class="bg-transparent flex-1 outline-none"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="font-medium text-gray-700">Email</label>
          <div
            class="bg-gray-100 rounded-lg px-3 py-2 flex items-center
                   focus-within:ring-2 focus-within:ring-blue-500"
          >
            <input
              type="email"
              v-model="user.email"
              class="bg-transparent flex-1 outline-none"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <!-- Phone -->
        <div>
          <label class="font-medium text-gray-700">Phone (Optional)</label>
          <div
            class="bg-gray-100 rounded-lg px-3 py-2 flex items-center
                   focus-within:ring-2 focus-within:ring-blue-500"
          >
            <input
              type="text"
              v-model="user.telephone"
              class="bg-transparent flex-1 outline-none"
              placeholder="+237 675 453 456"
            />
          </div>
        </div>

        <!-- Company + Role -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="font-medium text-gray-700">Company</label>
            <div
              class="bg-gray-100 rounded-lg px-3 py-2 flex items-center
                     focus-within:ring-2 focus-within:ring-blue-500"
            >
              <input
                type="text"
                v-model="user.company"
                class="bg-transparent flex-1 outline-none"
                placeholder="Your Company"
              />
            </div>
          </div>
          <div>
            <label class="font-medium text-gray-700">Role</label>
            <div
              class="bg-gray-100 rounded-lg px-3 py-2 flex items-center
                     focus-within:ring-2 focus-within:ring-blue-500"
            >
              <select
                v-model="user.role"
                class="bg-transparent flex-1 outline-none"
              >
                <option value="">Select role</option>
                <option value="owner">Owner</option>
                <option value="manager">Manager</option>
                <option value="invoice_head">Invoice Head</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="font-medium text-gray-700">Password</label>
          <div
            class="bg-gray-100 rounded-lg px-3 py-2 grid grid-cols-3
                   items-center focus-within:ring-2 focus-within:ring-blue-500"
          >
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="user.password"
              class="bg-transparent outline-none col-span-2"
              placeholder="Create your password"
            />
            <button
              type="button"
              class="text-gray-500 hover:text-gray-800"
              @click="showPassword = !showPassword"
            >
              👁
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="font-medium text-gray-700">Confirm Password</label>
          <div
            class="bg-gray-100 rounded-lg px-3 py-2 grid grid-cols-3
                   items-center focus-within:ring-2 focus-within:ring-blue-500"
          >
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="bg-transparent outline-none col-span-2"
              placeholder="Confirm password"
            />
            <button
              type="button"
              class="text-gray-500 hover:text-gray-800"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              👁
            </button>
          </div>
        </div>

        <!-- Terms -->
        <div class="flex items-center space-x-2">
          <input type="checkbox" v-model="user.accept_terms" />
          <label class="text-gray-600 text-sm">
            I agree to the
            <span class="text-blue-600 hover:underline">Terms of Service</span>
            and
            <span class="text-blue-600 hover:underline">Privacy Policy</span>
          </label>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full py-2 rounded-xl bg-black text-white font-semibold
                 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600
                 transition"
        >
          Create Account →
        </button>

        <!-- Error message -->
        <p v-if="error" class="text-red-600 text-center">{{ error }}</p>
      </form>

      <!-- Sign in link -->
      <p class="text-sm text-gray-600 text-center">
        Already have an account?
        <router-link
          to="/login"
          class="font-semibold text-blue-600 hover:underline"
        >
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const user = ref({
  username: "",
  last_name: "",
  email: "",
  telephone: "",
  company: "",
  role: "",
  password: "",
  accept_terms: false,
});

const confirmPassword = ref("");
const error = ref(null);

const handleRegister = async () => {
  error.value = null;

  if (user.value.password !== confirmPassword.value) {
    error.value = "Passwords do not match ❌";
    return;
  }

  if (!user.value.accept_terms) {
    error.value = "You must accept the terms ✅";
    return;
  }

  try {
    await authStore.register(
      user.value.username,
      user.value.last_name,
      user.value.email,
      user.value.telephone,
      user.value.role,
      user.value.password
    );

    if (!authStore.error) {
      router.push("/dashboard");
    }
  } catch (err) {
    err.value = "Registration failed";
  }
};
</script>
