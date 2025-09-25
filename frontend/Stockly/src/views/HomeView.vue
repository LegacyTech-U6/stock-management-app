<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import AnalyticsChart from '@/assets/icon svg/AnalyticsChart.vue'
import UsersClients from '@/assets/icon svg/UsersClients.vue'
import CubeThree from '@/assets/icon svg/CubeThree.vue'

const capacityStockly = [
  {
    title: 'Analytics Dashboard',
    description: 'Real-time insights into your inventory performance, sales trends, and business metrics.',
    icon: AnalyticsChart ,
    image: ''
  },
  {
    title: '3D Product Display',
    description: 'Visualize your inventory in stunning 3D to enhance product management and customer experience.',
    icon: CubeThree ,
    image:''
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
    icon: UsersClients ,
    image:''
  },
]

const advantages = ['14-day free trial', 'No credit card required', 'Cancel anytime']
</script>

<template>
  <main class="pt-20">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-[500px] lg:min-h-[600px] flex items-center justify-center px-4">
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="space-y-6">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Modern Stock Management
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
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
            <span v-if="index < advantages.length - 1" class="hidden sm:block text-gray-300 mx-2">•</span>
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
        <div class="grid grid-cols 2">



        <!-- Features Grid -->
        <div class="grid grid-cols-1 gap-8">
          <div
            v-for="feature in capacityStockly"
            :key="feature.title"
            class="group p-8 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12  rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <component :is="feature.icon" width="24" height="24" class="text-blue-600" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {{ feature.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">

        </div>
        </div>
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
