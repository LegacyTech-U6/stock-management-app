<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '40%', label: 'Réduction des coûts de stockage' },
  { value: '3x', label: 'Traitement des commandes plus rapide' },
  { value: '99.9%', label: 'Disponibilité garantie' },
  { value: '24/7', label: 'Mises à jour en temps réel' }
]

const sectionRef = ref(null)
const statsGridRef = ref(null)

onMounted(() => {
  // Horizontal scroll animation for stats
  const gridWidth = statsGridRef.value.scrollWidth - statsGridRef.value.offsetWidth

  gsap.to(statsGridRef.value, {
    x: () => -gridWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: () => `+=${gridWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    }
  })

  // Animate stats counting
  const statValues = gsap.utils.toArray('.stat-value')

  statValues.forEach((stat: any) => {
    const value = stat.textContent

    gsap.from(stat, {
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      stagger: 1,
      scrollTrigger: {
        trigger: stat,
        start: 'left 80%',
        end: 'left 20%',
        toggleActions: 'play none none reverse',
        containerAnimation: ScrollTrigger.getById('horizontal-scroll')
      }
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="py-32 px-6 bg-indigo-900">
    <div class="max-w-6xl mx-auto">
      <div class="max-w-2xl mb-20 text-center mx-auto">
        <h2 class="text-4xl md:text-5xl font-light text-white mb-6">
          Des résultats mesurables
        </h2>
        <p class="text-lg text-indigo-200 font-light">
          Rejoignez les entreprises qui ont transformé leur gestion avec Stockly
        </p>
      </div>

      <div
        ref="statsGridRef"
        class="flex gap-px pb-8"
        style="width: max-content;"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white p-12 text-center min-w-80 flex-shrink-0"
        >
          <div class="stat-value text-5xl font-light text-gray-900 mb-3">
            {{ stat.value }}
          </div>
          <div class="text-sm text-gray-600 font-light">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stat-value {
  will-change: transform;
}
</style>
