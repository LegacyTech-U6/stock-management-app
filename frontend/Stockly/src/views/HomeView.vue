<!-- 
  HomeView.vue
  =============
  Page d'accueil / Page de landing
  - Affiche les sections marketing du produit
  - Présente les fonctionnalités, tarifs, témoignages
  - Point d'entrée pour les nouveaux utilisateurs
-->
<script setup lang="ts">
// Imports des sections composant la page de landing
import CharacTeristics from '@/components/landing/CharacTeristics.vue'
import CtaSection from '@/components/landing/CtaSection.vue'
import FeatureSection from '@/components/landing/FeatureSection.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import StatsSection from '@/components/landing/StatsSection.vue'
import TestimonialMain from '@/components/landing/testimonail/TestimonialMain.vue'
import WorflowSection from '@/components/landing/WorflowSection.vue'
</script>

<!-- 
  Template: Composition de toutes les sections de la landing page
  - HeroSection: Section hero avec CTA principal
  - FeatureSection: Présentation des fonctionnalités
  - CharacTeristics: Caractéristiques détaillées
  - WorflowSection: Processus de workflow
  - StatsSection: Statistiques et chiffres clés
  - PricingSection: Plans tarifaires
  - CtaSection: Call-to-action final
-->
<template>
  <HeroSection />
  <FeatureSection />
  <CharacTeristics />
  <WorflowSection />
  <StatsSection />
  <PricingSection />
  <CtaSection />
</template>

<style scoped>
/* Hover effect pour les éléments avec la classe group */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>
