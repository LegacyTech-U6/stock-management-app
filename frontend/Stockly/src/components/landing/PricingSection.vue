<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const features = [
  'Produits illimités',
  'Multi-entreprises',
  'Gestion complète des stocks',
  'Point de vente intégré',
  'Base clients et fournisseurs',
  'Génération de factures',
  'Rapports et analyses',
  'Notifications automatiques',
  'Accès multi-utilisateurs',
  'Support prioritaire 24/7',
  'API et intégrations',
  'Sauvegardes automatiques'
]
</script>

<template>
  <section class="py-32 px-6 bg-white">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
          Tarification simple et transparente
        </h2>
        <p class="text-lg text-gray-600 font-light">
          Commencez gratuitement, évoluez selon vos besoins.
        </p>
      </div>

      <div class="border border-gray-900 p-12">
        <div class="flex items-baseline justify-between mb-12">
          <div>
            <h3 class="text-2xl font-medium text-gray-900 mb-2">
              Plan Professionnel
            </h3>
            <p class="text-gray-600 font-light">
              Tout ce dont vous avez besoin pour démarrer
            </p>
          </div>
          <div class="text-right">
            <div class="text-5xl font-light text-gray-900">
              49€
            </div>
            <div class="text-sm text-gray-600 font-light mt-1">
              par mois
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 mb-12">
          <div
            v-for="feature in features"
            :key="feature"
            class="flex items-start gap-3"
          >
            <Check :size="18" :stroke-width="2" class="text-gray-900 flex-shrink-0 mt-0.5" />
            <span class="text-sm text-gray-600 font-light">{{ feature }}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <button class="flex-1 px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
            Commencer l'essai gratuit
          </button>
          <button class="flex-1 px-8 py-4 border border-gray-300 hover:border-gray-900 transition-colors">
            Demander une démo
          </button>
        </div>

        <p class="text-xs text-gray-500 font-light text-center mt-6">
          Essai gratuit 14 jours · Sans carte bancaire · Annulez quand vous voulez
        </p>
      </div>
    </div>
  </section>
</template>
