<script setup lang="ts">
import CharacTeristics from '@/components/landing/CharacTeristics.vue'
import CtaSection from '@/components/landing/CtaSection.vue'
import FeatureSection from '@/components/landing/FeatureSection.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import StatsSection from '@/components/landing/StatsSection.vue'
import TestimonialMain from '@/components/landing/testimonail/TestimonialMain.vue'
import WorflowSection from '@/components/landing/WorflowSection.vue'
</script>
<template>
  <HeroSection />
  <FeatureSection />
  <CharacTeristics />
  <WorflowSection />
  <StatsSection />
  <TestimonialMain />
  <CtaSection />
</template>

<style scoped>
/* Optional: Add any custom styles here */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>
