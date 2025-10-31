<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Scan,
  Calculator,
  FileCheck,
  Database
} from 'lucide-vue-next'

const steps = [
  {
    icon: Scan,
    title: 'Sélection des produits',
    description: 'Scannez ou recherchez vos produits dans le catalogue'
  },
  {
    icon: Calculator,
    title: 'Calcul automatique',
    description: 'TVA, remises et totaux calculés instantanément'
  },
  {
    icon: FileCheck,
    title: 'Génération de facture',
    description: 'Facture professionnelle générée en un clic'
  },
  {
    icon: Database,
    title: 'Mise à jour du stock',
    description: 'Inventaire et statistiques actualisés en temps réel'
  }
]

const sectionRef = ref(null)
const horizontalContainerRef = ref(null)

onMounted(() => {
  const horizontalSection = horizontalContainerRef.value

  // Animation de défilement horizontal
  gsap.to(horizontalSection, {
    x: () => -(horizontalSection.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top top",
      end: () => `+=${horizontalSection.scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  })

  // Animation des étapes avec effet de progression
  const stepElements = gsap.utils.toArray('.workflow-step')

  stepElements.forEach((step: any, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: step,
        start: "left 70%",
        end: "left 30%",
        containerAnimation: ScrollTrigger.getById("horizontal-scroll"),
        toggleActions: "play none none reverse"
      }
    })

    // Ligne de connexion entre les étapes
    if (index < steps.length - 1) {
      const connector = step.querySelector('.step-connector')
      tl.from(connector, {
        scaleX: 0,
        duration: 1,
        ease: "power2.out"
      }, 0)
    }

    // Animation de l'icône
    tl.from(step.querySelector('.step-icon'), {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, 0.2)

    // Animation du contenu texte
    tl.from(step.querySelector('.step-content'), {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, 0.4)
  })
})
</script>

<template>
  <section ref="sectionRef" class="h-screen overflow-hidden bg-gray-500">
    <div class="h-full flex items-center">
      <div
        ref="horizontalContainerRef"
        class="horizontal-container flex items-center space-x-16 px-8"
        style="will-change: transform;"
      >
        <!-- En-tête -->
        <div class="min-w-96 max-w-2xl mr-16 text-white">
          <h2 class="text-5xl lg:text-6xl font-light mb-6 leading-tight">
            Processus de vente simplifié
          </h2>
          <p class="text-xl text-gray-300 font-light leading-relaxed">
            De la sélection du produit à la mise à jour du stock, tout est automatisé pour votre efficacité.
          </p>
        </div>

        <!-- Étapes du workflow -->
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="workflow-step relative flex-shrink-0"
        >
          <div class="flex items-start space-x-6 min-w-96">
            <!-- Numéro et icône -->
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 step-icon shadow-lg">
                <div class="text-sm font-medium text-gray-900 absolute -top-2 -right-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                  {{ index + 1 }}
                </div>
                <component
                  :is="step.icon"
                  :size="28"
                  :stroke-width="1.5"
                  class="text-gray-900"
                />
              </div>

              <!-- Ligne de connexion (sauf pour la dernière étape) -->
              <div
                v-if="index < steps.length - 1"
                class="step-connector w-1 bg-white/30 h-24 rounded-full"
              ></div>
            </div>

            <!-- Contenu -->
            <div class="step-content pt-2">
              <h3 class="text-2xl font-medium text-white mb-3">
                {{ step.title }}
              </h3>
              <p class="text-gray-300 font-light leading-relaxed text-lg">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Section finale -->
        <div class="min-w-96 flex-shrink-0 bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
          <div class="text-center text-white">
            <h3 class="text-2xl font-medium mb-4">Processus complet</h3>
            <p class="text-gray-300 font-light leading-relaxed mb-6">
              Un workflow optimisé de bout en bout pour maximiser votre productivité.
            </p>
            <div class="flex justify-center space-x-2">
              <div v-for="n in 4" :key="n" class="w-2 h-2 bg-white rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.horizontal-container {
  will-change: transform;
}

.workflow-step {
  will-change: transform;
}

.step-connector {
  transform-origin: top center;
}

.step-icon {
  will-change: transform;
}
</style>
