<template>
  <section class="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white px-6 py-12">
    <div class="grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">
      
      <!-- 🖼️ Section image -->
      <div class="hidden lg:flex justify-center">
        
      </div>

      <!-- 📝 Section texte -->
      <div class="space-y-6">
        <h1 class="text-5xl font-extrabold text-gray-800 leading-tight">
          Serve your <span class="text-green-600">customers</span> as they deserve
        </h1>

        <p class="text-gray-600 text-lg leading-relaxed">
          When <strong>Stockly</strong> detects a missing item in your inventory, 
          a new order is automatically generated and sent to your supplier.
          <br />
          This ensures smooth store operations and prevents interruptions caused by shortages.
        </p>

        <div class="pt-4">
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
             Serve your Customers
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No logic for now, purely visual
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
}
</style>
