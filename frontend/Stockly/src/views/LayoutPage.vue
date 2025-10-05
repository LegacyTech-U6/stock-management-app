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
      <RouterView />
    </div>
  </div>
</template>
