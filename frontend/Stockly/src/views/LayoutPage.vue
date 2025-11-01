<script setup lang="ts">
import LoginNav from '@/components/LoginNav.vue'
</script>

<template>
  <LoginNav>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </LoginNav>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
