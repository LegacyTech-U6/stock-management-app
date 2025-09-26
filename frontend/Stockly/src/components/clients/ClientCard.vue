<template>
  <div class="client-card border">
    <div class="grid grid-cols-2">
      <div>
        <div class="client-logo-container">
          {{ client.id }}
        </div>
        <div class="client-info">
          <h3 class="client-name">{{ client.client_name }}</h3>
          <p class="client-description">{{ client.client_PhoneNumber }}</p>
        </div>
      </div>
      <div class="button flex">
        <DustbinIcon class="icon" />
        <WriteIcon class="icon" />

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import PhoneIcon from '@/assets/icon svg/PhoneIcon.vue'
import WriteIcon from '@/assets/icon svg/WriteIcon.vue'
import DustbinIcon from '@/assets/icon svg/DustbinIcon.vue';
import MailIcon from '@/assets/icon svg/MailIcon.vue';

const props = defineProps<{
  client: {
    id:number
    client_signature: string
    client_name: string
    client_PhoneNumber: string
  }
}>()
</script>
