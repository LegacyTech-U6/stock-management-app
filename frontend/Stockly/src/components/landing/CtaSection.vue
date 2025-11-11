<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <section class="py-32 h-screen p-40 px-6 bg-gradient-to-br from-green-50 to-white">
    <div class="p-2">
      <img src="@/assets/image/image (9).png" alt="" />
    </div>
  </section>
  <section class="py-32 px-6 flex bg-gray-900 text-white">
    <div class="max-w-4xl mx-auto text-center space-y-12">
      <div class="space-y-6">
        <h2 class="text-4xl md:text-6xl font-light leading-tight">
          Prêt à transformer votre gestion d'inventaire ?
        </h2>
        <p class="text-xl text-gray-400 font-light max-w-2xl mx-auto">
          Rejoignez des centaines d'entreprises qui ont modernisé leur gestion avec Stockly.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          class="group px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
        >
          <span>Commencer gratuitement</span>
          <ArrowRight
            :size="18"
            :stroke-width="2"
            class="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <button class="px-8 py-4 border border-gray-700 hover:border-white transition-colors">
          Planifier une démo
        </button>
      </div>

      <p class="text-sm text-gray-500 font-light">
        Questions ? Contactez-nous à support@stockly.com
      </p>
    </div>
  </section>
</template>
