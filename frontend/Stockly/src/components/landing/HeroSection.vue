<script setup lang="ts">
import { Rotate3D } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import branding from '@/assets/image/branding.png'
// Options de bénéfices
const benefits = ['14-day free trial', 'No credit card required', 'Cancel anytime']
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const router = useRouter()
const handleRegister = () => {
  router.push('/register')
}
</script>

<template>
  <section
    :style="{ backgroundImage: `url(${branding})` }"
    class="relative lg:mt-10 text-white pt-30 lg:grid grid-cols-3 bg-cover min-h-[90vh] items-center justify-center px-6 overflow-x-hidden bg-indigo-500"
  >
    <div class="relative z-10 col-span-2 max-w-5xl w-full space-y-12 text-center">
      <h1 class="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight">
        Modern & Smart
        <span class="block font-medium mt-2 text-orange-500">Inventory Management</span>
      </h1>

      <p class="text-xl text-white max-w-2xl mx-auto font-light leading-relaxed">
        Automate your inventory, sales, and customer management with an all-in-one platform.
        Real-time data, multi-company support.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="handleRegister()"
          class="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          Start Free Trial
        </button>
        <button
          class="px-8 py-4 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
        >
          Watch Demo
        </button>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-8 pt-4">
        <div
          v-for="benefit in benefits"
          :key="benefit"
          class="flex items-center gap-2 text-gray-600"
        >
          <i class="fas fa-check text-green-500"></i>
          <span>{{ benefit }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dot {
  position: absolute;
  border-radius: 50%;
  width: 4px;
  height: 4px;
  opacity: 0.6;
  transition: all 3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.dot.compact {
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.pattern-1 .dot {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
}

.pattern-2 .dot {
  background: linear-gradient(45deg, #10b981, #06b6d4);
}

.pattern-3 .dot {
  background: linear-gradient(45deg, #f59e0b, #ec4899);
}
</style>
