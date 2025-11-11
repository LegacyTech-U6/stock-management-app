<template>
  <section class="relative flex justify-center items-center max-h-150 px-6 py-12 overflow-hidden">
    <!-- Background avec formes géométriques colorées -->
    <div class="absolute inset-0 -z-10">
      <!-- Fond de base -->
      <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
      
      <!-- Formes géométriques colorées -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
    </div>

    <div class="grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center relative z-10">
      <!-- 🖼️ Section image -->
      <div class="hidden lg:flex justify-center">
        <TechIcon />
      </div>

      <!-- 📝 Section texte -->
      <div class="space-y-6 animate-fadeInUp">
        <h1 class="text-5xl font-extrabold text-gray-800 leading-tight">
          INCLUDED <span class="text-green-600">CAPABILITIES</span>
        </h1>

        <p class="text-gray-600 text-lg leading-relaxed">
          <strong>Features designed for you</strong>
          <br />
          When <strong>Stockly</strong> detects a missing item in your inventory, 
          a new order is automatically generated and sent to your supplier.
          This ensures smooth store operations and prevents interruptions caused by shortages.
        </p>

        <!-- Features list -->
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-700">Capture everything</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-700">Organize your to-do list by workflow</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-700">Always include a deadline</span>
          </div>
        </div>

        <div class="pt-4">
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            Discover Features
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TechIcon from '@/assets/TechIcon.vue'
</script>

<style scoped>
/* Animation fade in */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
}

/* Animation pulsation lente pour les formes */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.4; }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
</style>