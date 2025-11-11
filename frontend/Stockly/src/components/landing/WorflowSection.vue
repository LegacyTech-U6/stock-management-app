<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Scan, Calculator, FileCheck, Database, CheckCircle } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Scan,
    title: 'Sélection des produits',
    description: 'Scannez ou recherchez vos produits dans le catalogue',
    detail: 'Interface intuitive avec recherche instantanée et scan de code-barres pour une sélection rapide.',
  },
  {
    icon: Calculator,
    title: 'Calcul automatique',
    description: 'TVA, remises et totaux calculés instantanément',
    detail: 'Moteur de calcul intelligent qui gère automatiquement toutes les opérations mathématiques.',
  },
  {
    icon: FileCheck,
    title: 'Génération de facture',
    description: 'Facture professionnelle générée en un clic',
    detail: 'Créez des factures conformes aux normes avec un design professionnel personnalisable.',
  },
  {
    icon: Database,
    title: 'Mise à jour du stock',
    description: 'Inventaire et statistiques actualisés en temps réel',
    detail: 'Synchronisation automatique de votre inventaire avec historique complet des mouvements.',
  },
]

const sectionRef = ref(null)
const horizontalContainerRef = ref(null)
const leftContentRef = ref(null)
const activeStepIndex = ref(0)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  if (!isMobile.value) {
    setupDesktopAnimations()
  } else {
    setupMobileAnimations()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

const setupDesktopAnimations = () => {
  const horizontalSection = horizontalContainerRef.value
  if (!horizontalSection) return

  // Ajouter plus d'espace pour que le dernier élément arrive au milieu
  const extraScroll = window.innerWidth * 0.4
  const scrollDistance = horizontalSection.scrollWidth - horizontalSection.parentElement.clientWidth + extraScroll

  // Animation de scroll horizontal
  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: `+=${scrollDistance}`,
      scrub: 0.5, // Réduit pour plus de fluidité
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Calculer l'étape active basée sur la progression avec interpolation fluide
        const progress = self.progress
        const exactStep = progress * (steps.length - 1)
        const stepIndex = Math.round(exactStep)
        
        if (activeStepIndex.value !== stepIndex) {
          activeStepIndex.value = stepIndex
        }
      },
    },
  })

  mainTimeline.to(horizontalSection, {
    x: () => -(horizontalSection.scrollWidth - horizontalSection.parentElement.clientWidth + extraScroll),
    ease: 'none',
  })

  // Animation du contenu gauche plus fluide avec stagger
  const leftElements = leftContentRef.value?.querySelectorAll('.left-animated')
  if (leftElements) {
    gsap.to(leftElements, {
      y: -30,
      opacity: 0.9,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 0.5,
      },
    })
  }

  // Animations des étapes
  const stepElements = gsap.utils.toArray('.workflow-step')
  stepElements.forEach((step: any, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: step,
        start: 'left 80%',
        end: 'left 40%',
        containerAnimation: mainTimeline.scrollTrigger?.animation,
        toggleActions: 'play none none reverse',
      },
    })

    // Ligne de connexion
    if (index < steps.length - 1) {
      const connector = step.querySelector('.step-connector')
      tl.from(connector, { scaleX: 0, duration: 0.8, ease: 'power2.out' }, 0)
    }

    // Icône
    tl.from(
      step.querySelector('.step-icon'),
      { scale: 0, rotation: -180, duration: 0.8, ease: 'back.out(1.7)' },
      0.2
    )

    // Contenu
    tl.from(
      step.querySelector('.step-content'),
      { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' },
      0.4
    )
  })
}

const setupMobileAnimations = () => {
  const stepElements = gsap.utils.toArray('.workflow-step')
  
  stepElements.forEach((step: any, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: step,
        start: 'top 80%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    })

    // Ligne de connexion
    if (index < steps.length - 1) {
      const connector = step.querySelector('.step-connector')
      tl.from(connector, { scaleY: 0, duration: 0.8, ease: 'power2.out' }, 0)
    }

    // Icône
    tl.from(
      step.querySelector('.step-icon'),
      { scale: 0, rotation: -180, duration: 0.8, ease: 'back.out(1.7)' },
      0.2
    )

    // Contenu
    tl.from(
      step.querySelector('.step-content'),
      { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' },
      0.4
    )
  })
}
</script>

<template>
  <section 
    ref="sectionRef" 
    class="workflow-section lg:pl-50 item-center flex justify-center relative min-h-screen bg-gradient-to-br from-green-50 to-white"
  >
    <!-- Desktop Layout -->
    <div v-if="!isMobile" class="grid grid-cols-12 h-screen max-w-7.5xl">
      <!-- Colonne gauche sticky -->
      <div class="col-span-3 h-screen flex items-center px-8 lg:px-12">
        <div ref="leftContentRef" class="space-y-6 w-full">
          <div class="left-animated inline-block px-4 py-2 bg-green-500/10 rounded-full border border-green-400/30 mb-4 transition-all duration-700 ease-out">
            <span class="text-green-700 text-sm font-medium">Étape {{ activeStepIndex + 1 }}/{{ steps.length }}</span>
          </div>
          
          <div class="relative overflow-hidden">
            <Transition 
              mode="out-in"
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-8"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-300 ease-in absolute inset-0"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-8"
            >
              <h2 
                :key="activeStepIndex" 
                class="left-animated text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                {{ steps[activeStepIndex].title }}
              </h2>
            </Transition>
          </div>
          
          <div class="relative overflow-hidden min-h-[100px]">
            <Transition 
              mode="out-in"
              enter-active-class="transition-all duration-600 ease-out delay-100"
              enter-from-class="opacity-0 translate-y-6"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-250 ease-in absolute inset-0"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-6"
            >
              <p 
                :key="activeStepIndex" 
                class="left-animated text-gray-600 text-lg leading-relaxed"
              >
                {{ steps[activeStepIndex].detail }}
              </p>
            </Transition>
          </div>
          
          <!-- Indicateurs de progression -->
          <div class="left-animated flex gap-2 pt-4">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="h-1 rounded-full transition-all duration-700 ease-out"
              :class="[
                index === activeStepIndex ? 'w-12 bg-green-500' : 'w-8 bg-gray-300',
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Colonne droite avec scroll horizontal -->
      <div class="col-span-9 h-screen overflow-hidden">
        <div
          ref="horizontalContainerRef"
          class="horizontal-container flex items-center h-full px-12 gap-24"
          style="will-change: transform"
        >
          <!-- Étapes du workflow -->
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="workflow-step flex-shrink-0 w-[400px]"
          >
            <div class="flex items-start gap-6">
              <!-- Icône et connecteur -->
              <div class="flex flex-col items-center pt-2">
                <div class="step-icon relative w-20 h-20 bg-gradient-to-br from-green-300 to-green-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm shadow-lg">
                    {{ index + 1 }}
                  </div>
                  <component :is="step.icon" :size="32" :stroke-width="2" class="text-white" />
                </div>
                
                <div
                  v-if="index < steps.length - 1"
                  class="step-connector w-1 h-32 bg-gradient-to-b from-blue-500/50 to-transparent rounded-full mt-4"
                  style="transform-origin: top center"
                ></div>
              </div>

              <!-- Contenu -->
              <div class="step-content flex-1 pt-2">
                <h3 class="text-2xl font-bold text-black mb-3">
                  {{ step.title }}
                </h3>
                <p class="text-gray-400 leading-relaxed text-base">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Section finale -->
          <div class="flex-shrink-0 w-[400px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/50">
                <CheckCircle :size="32" :stroke-width="2" class="text-white" />
              </div>
              <h3 class="text-2xl font-bold text-black mb-4">Processus complet</h3>
              <p class="text-gray-400 leading-relaxed">
                Un workflow optimisé de bout en bout pour maximiser votre productivité.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Mobile Layout -->
    <div v-else class="py-16 w-full px-6">
      <div class="w-full mx-auto space-y-12">
        <!-- Header mobile -->
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">Processus Stockly</h2>
          <p class="text-gray-400 text-lg">
            De la sélection du produit à la mise à jour du stock, tout est automatisé.
          </p>
        </div>

        <!-- Étapes verticales -->
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="workflow-step"
        >
          <div class="flex items-start gap-6">
            <!-- Icône et ligne -->
            <div class="flex flex-col items-center">
              <div class="step-icon relative w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-400 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/50">
                <div class="absolute -top-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs shadow-lg">
                  {{ index + 1 }}
                </div>
                <component :is="step.icon" :size="28" :stroke-width="2" class="text-white" />
              </div>
              
              <div
                v-if="index < steps.length - 1"
                class="step-connector w-0.5 h-24 bg-gradient-to-b from-blue-500/50 to-transparent rounded-full mt-4"
                style="transform-origin: top center"
              ></div>
            </div>

            <!-- Contenu -->
            <div class="step-content flex-1 pt-1">
              <h3 class="text-xl font-bold text-green-500 mb-2">
                {{ step.title }}
              </h3>
              <p class="text-gray-400 leading-relaxed text-sm mb-3">
                {{ step.description }}
              </p>
              <p class="text-gray-500 text-sm leading-relaxed">
                {{ step.detail }}
              </p>
            </div>
          </div>
        </div>

        <!-- Section finale mobile -->
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center mt-12">
          <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-500/50">
            <CheckCircle :size="28" :stroke-width="2" class="text-white" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Processus complet</h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            Un workflow optimisé de bout en bout pour maximiser votre productivité.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.workflow-section {
  position: relative;
  overflow: hidden;
}

.horizontal-container {
  will-change: transform;
}

.workflow-step {
  will-change: transform, opacity;
}

.step-connector {
  will-change: transform;
}

.step-icon {
  will-change: transform;
}

/* Smooth scrolling */
@media (prefers-reduced-motion: no-preference) {
  * {
    scroll-behavior: smooth;
  }
}
</style>