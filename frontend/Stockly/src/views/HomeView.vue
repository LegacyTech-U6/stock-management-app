<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import AnalyticsChart from '@/assets/icon svg/AnalyticsChart.vue'
import UsersClients from '@/assets/icon svg/UsersClients.vue'
import CubeThree from '@/assets/icon svg/CubeThree.vue'
import analyticsImg from '@/assets/image/WhatsApp Image 2025-07-19 at 19.47.35.jpeg'
import pastedImg from '@/assets/image/Pasted image.png'
import dImage from '@/assets/image/WhatsApp Image 2025-07-19 at 19.47.35.jpeg'
import IncreaseIcon from '@/assets/icon svg/IncreaseIcon.vue'
import TimeIcon from '@/assets/icon svg/TimeIcon.vue'
import SecureIcon from '@/assets/icon svg/SecureIcon.vue'
import { ref } from 'vue'

const capacityStockly = [
  {
    title: 'Analytics Dashboard',
    description:
      'Real-time insights into your inventory performance, sales trends, and business metrics.',
    icon: AnalyticsChart,
    image: analyticsImg,
  },
  {
    title: '3D Product Display',
    description:
      'Visualize your inventory in stunning 3D to enhance product management and customer experience.',
    icon: CubeThree,
    image: dImage,
  },
  // {
  //   title: 'Real-Time Analytics',
  //   description: 'Gain actionable insights into your stock levels and trends with live data visualization.',
  //   icon: '<RealTimeAnalytics />',
  //   image: ''
  // },
  // {
  //   title:'Sales Management',
  //   description:'Streamlined order creation, client management, and automated invoice generation.',
  //   icon: '<SalesManagement />',
  //   image: ''
  // },
  {
    title: 'Client Database',
    description: 'Comprehensive customer management with order history and contact information.',
    icon: UsersClients,
    image: pastedImg,
  },
]
const selectedFeature = ref<null | (typeof capacityStockly)[0]>(null)
const advantages = ['14-day free trial', 'No credit card required', 'Cancel anytime']
const BusinessResult = [
  {
    rate: '25%',
    title: 'Reduce Stock Costs',
    description: 'Optimize inventory levels and reduce carrying costs by up to 25%',
    icon: IncreaseIcon,
  },
  {
    rate: '3x',
    title: 'Faster Processing',
    description: 'Process orders 3x faster with automated workflows and smart insights',
    icon: '',
  },
  {
    rate: '24/7',
    title: 'Real-time Updates',
    description: 'Stay informed with instant notifications and live inventory tracking',
    icon: TimeIcon,
  },
  {
    rate: '99.9%',
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee',
    icon: SecureIcon,
  },
]

const testimonials = [
  {
    id: 1,
    text: "This system transformed our inventory management. We reduced stock-outs by 40% and improved our order processing time significantly.",
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "TechCorp Industries",
    image: "/assets/image/sarah.jpg",
    rating: 5,
  },
  {
    id: 2,
    text: "The 3D product display feature is amazing. Our sales team can showcase products like never before, leading to 30% more conversions.",
    name: "Michael Chen",
    role: "CEO",
    company: "Retail Solutions Inc",
    image: "/assets/image/michael.jpg",
    rating: 5,
  },
  {
    id: 3,
    text: "The real-time analytics help us make better purchasing decisions. We have reduced excess inventory by 35% in just 6 months.",
    name: "Emily Rodriguez",
    role: "Inventory Director",
    company: "Global Distributors",
    image: "/assets/image/emily.jpg",
    rating: 5,
  },
]

// Later you will replace this with an API call (axios/fetch)
const plans = ref([
  {
    id: 1,
    name: "Professional Plan",
    price: 49,
    frequency: "month",
    description: "Everything you need to get started",
    popular: true,
    features: [
      "Unlimited Products",
      "3D Product Displays",
      "Real-time Analytics",
      "Sales Management",
      "Client Database",
      "Invoice Generation",
      "Multi-user Access",
      "Mobile App",
      "24/7 Support",
      "API Integration",
    ],
  },
])
</script>

<template>
  <main class="pt-20">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-[500px] lg:min-h-[600px] flex items-center justify-center px-4"
    >
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="space-y-6">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Modern Stock Management
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Made Simple
            </span>
          </h1>

          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your inventory operations with our comprehensive platform featuring 3D product
            displays, real-time analytics, and automated workflows.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <BaseButton
            text="Start Free Trial"
            color="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <template #svg-right>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </template>
          </BaseButton>

          <BaseButton
            text="Watch Demo"
            color="bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg"
            :darkText="true"
          >
            <template #svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none" />
              </svg>
            </template>
          </BaseButton>
        </div>

        <!-- Advantages -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <div
            v-for="(advantage, index) in advantages"
            :key="advantage"
            class="flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-green-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span class="text-gray-600 text-sm font-medium">{{ advantage }}</span>
            <span v-if="index < advantages.length - 1" class="hidden sm:block text-gray-300 mx-2"
              >•</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
            Powerful Features for Modern Businesses
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Everything you need to manage inventory, process sales, and grow your business
            efficiently with cutting-edge technology.
          </p>
        </div>
        <div class="">
          <!-- Features Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Features List -->
            <div class="space-y-4">
              <div
                v-for="feature in capacityStockly"
                :key="feature.title"
                @click="selectedFeature = feature"
                :class="[
                  'group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 bg-white',
                  selectedFeature?.title === feature.title
                    ? 'border-black bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-200 hover:shadow-md hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50',
                ]"
              >
                <div class="flex items-start space-x-4">
                  <div
                    :class="[
                      'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300',
                      selectedFeature?.title === feature.title
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-black',
                    ]"
                  >
                    <component
                      :is="feature.icon"
                      class="w-6 h-6"
                      :class="selectedFeature?.title === feature.title ? '#fff' : '#2563eb'"
                    />
                  </div>
                  <div class="flex-1">
                    <h3
                      class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300"
                    >
                      {{ feature.title }}
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                      {{ feature.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Feature Image Display -->
            <div class="flex items-center justify-center">
              <div
                v-if="selectedFeature"
                class="w-full max-w-md rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform hover:scale-105"
              >
                <img
                  :src="selectedFeature.image"
                  :alt="selectedFeature.title"
                  class="w-full h-100 object-cover"
                />
              </div>
              <div
                v-else
                class="w-full max-w-md h-64 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
              >
                <p class="text-gray-500 text-lg">Select a feature to view details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-gray-200 py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Measurable Business Results</h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Join thousands of businesses that have transformed their operations with our platform.
          </p>
        </div>
        <div class="lg:grid lg:grid-cols-4 text-center gap-5 space-y-10 items-center">
          <div
            class="bg-white rounded-xl p-5 flex flex-col justify-center items-center text-center"
            v-for="Results in BusinessResult"
            :key="Results.rate"
          >
            <div
              class="bg-gray-100 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            >
              <component :is="Results.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-1">{{ Results.rate }}</h3>
            <span class="font-semibold mb-1">{{ Results.title }}</span>
            <span class="text-gray-600">{{ Results.description }}</span>
          </div>
        </div>
      </div>
    </section>
    <!-- Add after your last section in HomeView.vue -->
<section class="bg-white py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-12 space-y-2">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
        <p class="text-gray-600 text-lg">
          See what our customers have to say about their experience with StockFlow.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="t in testimonials"
          :key="t.id"
          class="border rounded-xl p-8 bg-white flex flex-col items-start"
        >
          <!-- Quote Icon -->
          <svg class="w-8 h-8 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-width="2" d="M7 17a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v6a4 4 0 01-4 4H7zm10 0a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v6a4 4 0 01-4 4h-2z"/>
          </svg>

          <!-- Testimonial Text -->
          <p class="text-gray-700 mb-6">{{ t.text }}</p>

          <!-- User Info -->
          <div class="flex items-center gap-3 mb-2">
            <img :src="t.image" :alt="t.name" class="w-8 h-8 rounded-full object-cover" />
            <div>
              <span class="font-bold text-gray-900">{{ t.name }}</span>
              <div class="text-xs text-gray-500">
                {{ t.role }}<br />{{ t.company }}
              </div>
            </div>
          </div>

          <!-- Rating -->
          <div class="flex gap-1">
            <span
              v-for="i in t.rating"
              :key="i"
              class="text-yellow-400"
            >
              &#9733;
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
   <section class="bg-gray-50 py-20 px-4">
    <div class="max-w-4xl mx-auto text-center mb-12">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
        Simple, Transparent Pricing
      </h2>
      <p class="text-gray-600 text-lg">
        Start free and scale as you grow. No hidden fees, no surprises.
      </p>
    </div>

    <div
      v-for="plan in plans"
      :key="plan.id"
      class="max-w-md mx-auto border rounded-xl bg-white shadow-sm p-8 relative"
    >
      <!-- Popular Badge -->
      <div
        v-if="plan.popular"
        class="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full"
      >
        Most Popular
      </div>

      <!-- Plan Header -->
      <h3 class="text-xl font-bold text-gray-900">{{ plan.name }}</h3>
      <div class="mt-2 text-3xl font-bold text-gray-900">
        ${{ plan.price }}
        <span class="text-base font-normal text-gray-500">/{{ plan.frequency }}</span>
      </div>
      <p class="mt-1 text-gray-600">{{ plan.description }}</p>

      <!-- Features -->
      <ul class="mt-6 space-y-3 text-left">
        <li
          v-for="(feature, index) in plan.features"
          :key="index"
          class="flex items-center gap-2 text-gray-700"
        >
          <!-- Checkmark Icon -->
          <svg
            class="w-5 h-5 text-green-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ feature }}</span>
        </li>
      </ul>

      <!-- Actions -->
      <div class="mt-8 flex flex-col gap-3">
        <button
          class="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
        >
          Start Free Trial
        </button>
        <button
          class="border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
        >
          Try Demo First
        </button>
      </div>

      <!-- Trial Note -->
      <p class="mt-4 text-xs text-gray-500">
        14-day free trial · No credit card required
      </p>
    </div>
  </section>
  </main>
</template>

<style scoped>
/* Optional: Add any custom styles here */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>
