<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Package, ShoppingCart, Users, TrendingUp, FileText, Bell } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Package,
    title: 'Complete Inventory Management',
    description:
      'Real-time tracking, automatic low stock alerts, smart categorization, and complete movement history.',
  },
  {
    icon: ShoppingCart,
    title: 'Integrated Point of Sale',
    description:
      'Quick invoice creation, automatic VAT and discount calculation, multiple payment methods, instant generation.',
  },
  {
    icon: Users,
    title: 'Customer & Supplier Database',
    description:
      'Purchase history, centralized contacts, automatic supplier orders, simplified communication.',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Analytics',
    description:
      'Daily sales reports, top products, category statistics, performance indicators (KPIs).',
  },
  {
    icon: FileText,
    title: 'Multi-Company Management',
    description:
      'Manage multiple companies from one account, data isolation, per-company customization.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Stock outage alerts, order notifications, customizable reminders, complete activity log.',
  },
]

const activeFeature = ref(0)
const sectionRef = ref(null)
const headerRef = ref(null)
const subtitleRef = ref(null)

onMounted(() => {
  // Header animation on scroll
  gsap.from(headerRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
  })

  gsap.from(subtitleRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out',
  })

  // Staggered card animation
  gsap.from('.feature-card', {
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top 75%',
      end: 'top 25%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 0.8,
    stagger: {
      amount: 0.6,
      from: 'start',
      ease: 'power2.out',
    },
    ease: 'power3.out',
  })

  // Icon rotation on scroll
  gsap.utils.toArray('.feature-icon').forEach((icon: any) => {
    gsap.from(icon, {
      scrollTrigger: {
        trigger: icon,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      rotation: -180,
      scale: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    })
  })
})

const handleHover = (index: number, element: HTMLElement) => {
  activeFeature.value = index

  const icon = element.querySelector('.feature-icon')
  const title = element.querySelector('.feature-title')
  const description = element.querySelector('.feature-description')

  // Animate icon on hover
  gsap.to(icon, {
    scale: 1.1,
    rotation: 5,
    duration: 0.4,
    ease: 'power2.out',
  })

  // Subtle title animation
  gsap.to(title, {
    x: 5,
    duration: 0.3,
    ease: 'power2.out',
  })

  // Description fade
  gsap.to(description, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out',
  })
}

const handleLeave = (element: HTMLElement) => {
  const icon = element.querySelector('.feature-icon')
  const title = element.querySelector('.feature-title')

  gsap.to(icon, {
    scale: 1,
    rotation: 0,
    duration: 0.4,
    ease: 'power2.out',
  })

  gsap.to(title, {
    x: 0,
    duration: 0.3,
    ease: 'power2.out',
  })
}
</script>

<template>
  <section
    ref="sectionRef"
    class="pt-32 grid grid-cols-1 lg:grid-cols-4 bg-gradient-to-br from-green-50 to-white overflow-hidden"
  >
    <div class="lg:grid lg:gap-6 items-center p-4">
      <!-- Image: visible on large screens only -->
      <div class="hidden w-full lg:block">
        <img src="@/assets/image/handStockly.png" alt="Hand Stockly" class="w-full h-auto" />
      </div>

      <!-- Content: always visible -->
    </div>
    <div class="max-w-6xl mx-auto col-span-1 lg:col-span-3 px-6">
      <div class="max-w-2xl mb-20">
        <h2 ref="headerRef" class="text-4xl md:text-5xl font-light text-gray-900 mb-6">
          Everything You Need
        </h2>
        <p ref="subtitleRef" class="text-lg text-gray-600 font-light leading-relaxed">
          A complete solution to digitize and automate all your business processes.
        </p>
      </div>

      <div class="features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          @mouseenter="(e) => handleHover(index, e.currentTarget as HTMLElement)"
          @mouseleave="(e) => handleLeave(e.currentTarget as HTMLElement)"
          class="feature-card bg-white p-10 transition-colors hover:bg-gray-900 hover:text-white group cursor-pointer relative overflow-hidden"
        >
          <!-- Background pulse effect on hover -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-500"
          ></div>

          <div class="relative z-10">
            <component
              :is="feature.icon"
              :size="32"
              :stroke-width="1.5"
              class="feature-icon mb-6 text-gray-900 group-hover:text-white transition-colors"
            />
            <h3 class="feature-title text-xl font-medium mb-3">
              {{ feature.title }}
            </h3>
            <p
              class="feature-description text-sm text-gray-600 group-hover:text-gray-300 font-light leading-relaxed"
            >
              {{ feature.description }}
            </p>
          </div>

          <!-- Active indicator -->
          <div
            v-if="activeFeature === index"
            class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-card {
  will-change: transform;
}

.feature-icon {
  will-change: transform, rotate;
}
</style>