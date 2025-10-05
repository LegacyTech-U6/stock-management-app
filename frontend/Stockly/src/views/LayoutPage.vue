<script setup lang="ts">
import LoginNav from '@/components/LoginNav.vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="flex">
    <div>
      <aside>
        <LoginNav />
      </aside>
    </div>
    <div>
      <RouterView />
    </div>
  </div>
</template>
