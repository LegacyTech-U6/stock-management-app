<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';

</script>

<template>
  <main class="pt-20">
    <section class="bg-gray-50 lg:h-110 items-center justify-center flex">
      <div class="max-w-2xl space-y-3 items-center text-center">
        <h1 class="text-5xl font-bold">Modern Stock Management Made Simple</h1>

        <p>
          Transform your inventory operations with our comprehensive platform featuring 3D product
          displays, real-time analytics, and automated workflows.
        </p>

        <BaseButton text="Start Free Trial" color="bg-black hover:bg-gray-900">
          <template #svg>
    <!-- SVG à gauche -->
    <!-- Par exemple, une flèche -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </template>

        </BaseButton>
      </div>
    </section>
  </main>
</template>
