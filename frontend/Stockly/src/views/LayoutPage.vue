<script setup lang="ts">
import LoginNav from '@/components/LoginNav.vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import SoftNavbar from '@/components/Navbar/SoftNavbar.vue'

const route = useRoute()
const sidebarExpanded = ref(false)

// Handle sidebar state from child component
const updateSidebarState = (expanded: boolean) => {
  sidebarExpanded.value = expanded
}

// Listen for sidebar state changes
onMounted(() => {
  window.addEventListener('sidebar-state-changed', ((event: CustomEvent) => {
    sidebarExpanded.value = event.detail.expanded
  }) as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('sidebar-state-changed', ((event: CustomEvent) => {
    sidebarExpanded.value = event.detail.expanded
  }) as EventListener)
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar Section -->
    <div
      class="flex-shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden"
      :class="sidebarExpanded ? 'w-80' : 'w-[72px]'"
    >
      <LoginNav @sidebar-state-changed="updateSidebarState" />
    </div>
    <div class="flex-1">
      <SoftNavbar  />
       <!-- Main Content Section -->
    <div class="flex-1 min-w-0 transition-all duration-300 ease-in-out">
      <router-view v-slot="{ Component }">
        <transition
          name="page"
          mode="out-in"
          appear
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    </div>

  </div>
</template>

<style>
/* Enter/Leave animations */
.page-enter-active, .page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Entry animation */
.page-enter-from {
  opacity: 0;
  transform: translateY(20px); /* slide up from below */
}
.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Exit animation */
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* slide up while leaving */
}
</style>
