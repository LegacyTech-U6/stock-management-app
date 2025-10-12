<script setup lang="ts">
import LoginNav from '@/components/LoginNav.vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="grid grid-cols-7">
    <div class="col-span-1">
      <aside>
        <LoginNav />
      </aside>
    </div>
    <div class="col-span-6">
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
}</style>
