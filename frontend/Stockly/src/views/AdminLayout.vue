<template>

  <NavbarAdmin>
     <router-view v-slot="{ Component }">
        <transition
          name="page"
          mode="out-in"
          appear
        >
          <component :is="Component" />
        </transition>
      </router-view>

  </NavbarAdmin>


</template>

<script setup>
import NavbarAdmin from '@/components/NavbarAdmin.vue'
</script>
<style>
/* Enter/Leave animations */
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
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



