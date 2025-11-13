<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '40%', label: 'Réduction des coûts de stockage' },
  { value: '3x', label: 'Traitement des commandes plus rapide' },
  { value: '99.9%', label: 'Disponibilité garantie' },
  { value: '24/7', label: 'Mises à jour en temps réel' },
]

const sectionRef = ref<HTMLElement | null>(null)
const statsGridRef = ref<HTMLElement | null>(null)
const isMobile = ref(window.innerWidth < 640)

onMounted(() => {
  const handleResize = () => {
    isMobile.value = window.innerWidth < 640
  }
  window.addEventListener('resize', handleResize)

  if (statsGridRef.value && sectionRef.value) {
    const gridWidth = statsGridRef.value.scrollWidth - statsGridRef.value.offsetWidth

    gsap.to(statsGridRef.value, {
      x: () => (isMobile.value ? 0 : -gridWidth),
      y: () => (isMobile.value ? -gridWidth : 0),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: () => `+=${gridWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    const statValues = gsap.utils.toArray('.stat-value')
    statValues.forEach((stat: any) => {
      gsap.from(stat, {
        innerText: 0,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    class="relative py-32 px-6 overflow-hidden"
    style="background: radial-gradient(circle, #1e3a8a 0%, #0f172a 100%);"
  >
    <!-- Background étoilé -->
    <div class="absolute inset-0">
      <div class="star" v-for="n in 30" :key="n"></div>
    </div>

    <div class="relative max-w-6xl mx-auto">
      <div class="max-w-2xl mb-20 text-center mx-auto z-10 relative">
        <h2 class="text-4xl md:text-5xl font-light text-white mb-6">
          Des résultats mesurables
        </h2>
        <p class="text-lg text-indigo-200 font-light">
          Rejoignez les entreprises qui ont transformé leur gestion avec Iventello
        </p>
      </div>

      <div
        ref="statsGridRef"
        class="flex gap-6 pb-8 z-10 relative"
        :class="{'flex-col': isMobile, 'flex-row': !isMobile}"
        style="width: max-content"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white/20 backdrop-blur-md p-12 text-center min-w-80 flex-shrink-0 rounded-xl shadow-lg border border-white/30"
        >
          <div class="stat-value text-5xl font-extrabold text-white mb-3">
            {{ stat.value }}
          </div>
          <div class="text-sm text-white/80 font-light">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stat-value {
  will-change: transform;
}

/* Etoiles dans le background */
.star {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3b82f6, #f59e0b);
  animation: twinkle 3s infinite alternate;
  top: calc(var(--random-top) * 1%);
  left: calc(var(--random-left) * 1%);
  opacity: 0.8;
}

.star:nth-child(1) { --random-top: 10; --random-left: 5; }
.star:nth-child(2) { --random-top: 20; --random-left: 80; }
.star:nth-child(3) { --random-top: 50; --random-left: 40; }
/* ... répéter pour tous les 30 éléments ou générer dynamiquement */

@keyframes twinkle {
  0% { transform: scale(0.5); opacity: 0.4; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.7); opacity: 0.6; }
}
</style>
