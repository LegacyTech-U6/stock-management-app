<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import bgImg from '@/assets/image/bg.jpeg'
</script>

<template>
  <section :style="{ backgroundImage: `url(${bgImg})` }" class="py-32 px-6 bg-gray-900 h-screen bg-cover text-white">
    <div class="max-w-4xl mx-auto text-center space-y-12">
      <div class="space-y-6">
        <h2 class="text-4xl md:text-6xl font-light leading-tight">
          Ready to transform your inventory management?
        </h2>
        <p class="text-xl text-gray-400 font-light max-w-2xl mx-auto">
          Join hundreds of companies who have modernized their management with Iventello.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          class="group px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
          <span>Start for Free</span>
          <ArrowRight :size="18" :stroke-width="2" class="group-hover:translate-x-1 transition-transform" />
        </button>
        <button class="px-8 py-4 border border-gray-700 hover:border-white transition-colors">
          Schedule a Demo
        </button>
      </div>

      <p class="text-sm text-gray-500 font-light">
        Questions? Contact us at support@Iventello.com
      </p>
    </div>

    <div class="max-w-7xl mx-auto h-60 flex items-center justify-center px-6 py-3">
      <div class="lg:grid grid-cols-1 w-full lg:space-y-1 space-y-5 gap-5">
        <div class="justify-start">
          <div class="font-bold text-lg">Iventello</div>
          <p class="text-sm text-white">
            Modern stock management platform designed for growing businesses.
          </p>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <div>
            <i class="fa fa-copyright"></i>
            2025 Iventello. All rights reserved
          </div>
        </div>
      </div>

      <hr class="my-6 border-gray-300" />
    </div>
  </section>
</template>
