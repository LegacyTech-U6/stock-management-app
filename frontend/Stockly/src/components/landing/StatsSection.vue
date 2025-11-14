<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import il3Image from '@/assets/image/il-3.png'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '40%', label: 'Reduction of storage costs' },
  { value: '3x', label: 'Faster order processing' },
  { value: '99.9%', label: 'Guaranteed availability' },
  { value: '24/7', label: 'Real-time updates' },
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
  <section ref="sectionRef" class="relative py-20 px-6 bg-[#0C333B] h-2/3 overflow-hidden">
    <div class="relative max-w-7xl mx-auto z-10 flex flex-col md:flex-row items-center gap-16">
      <div class="flex-none relative md:w-1/2 lg:w-1/5">
        <img :src="il3Image" alt="decorative"
          class="w-full h-auto object-contain scale-[1.1] relative -translate-x-8 md:-translate-x-16" />
      </div>
      <!-- Texte principal + stats -->
      <div class="flex-1 text-white relative z-10">
        <h2 class="text-3xl sm:text-4xl text-white md:text-5xl font-light mb-4 sm:mb-6">
          Measurable <span class="text-green-500 font-semibold">Results</span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl font-light mb-8 sm:mb-12">
          Join the companies that have <span class="text-green-500 font-medium">transformed</span> their management with
          <span class="text-green-500 font-semibold">Iventello</span>
        </p>

        <!-- Stats sur une seule ligne -->
        <div ref="statsGridRef" class="flex flex-row gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4">
          <div v-for="stat in stats" :key="stat.label"
            class="bg-gray-50 p-4 sm:p-6 text-center flex-shrink-0 rounded-xl shadow border border-gray-200 min-w-[110px] sm:min-w-[140px]">
            <div class="stat-value text-2xl sm:text-3xl md:text-4xl font-light mb-1 text-green-500">
              {{ stat.value }}
            </div>
            <div class="text-xs sm:text-sm font-light text-gray-700">{{ stat.label }}</div>
          </div>
        </div>
      </div>


      <!-- Image décorative agrandie -->


    </div>
  </section>
</template>

<style scoped>
.stat-value {
  will-change: transform;
}
</style>
