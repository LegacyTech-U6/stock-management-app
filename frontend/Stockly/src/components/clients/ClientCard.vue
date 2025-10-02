<template>
  <div class="client-card border rounded-xl p-5 text-gray-400 items-center flex flex-col">
    <div class="grid grid-cols-3 gap-5">
      <div class="grid grid-cols-2  space-x-5 col-span-2 justify-start text-start w-full ">
        <div class="client-logo-container text-black bg-gray-200 justify-start p-5 rounded-3xl">
          {{ client.id }}
        </div>
        <div class="client-info">
          <h3 class="client-name font-bold text-black">{{ client.client_name }}</h3>
          <p class="client-description">{{ client.client_PhoneNumber }}</p>
        </div>
      </div>
      <div class="button flex space-x-2 justify-end">
        <div class="bg-white border p-1 h-10 rounded hover:bg-gray-200">
            <WriteIcon class="icon w-6 h-6" />
        </div>
        <div class="bg-white border p-1 rounded h-10 hover:bg-gray-200">

            <DustbinIcon class="icon w-6 h-6" />
        </div>



      </div>
    </div>
    <div class="p-2 space-x-5 space-y-2 text-start text-black w-full">
      <div class="flex space-x-2">
        <mail-icon class="icon w-6 h-6" />
        <span>
          {{ client.email }}
        </span>
      </div>
      <div class="flex space-x-2">
        <phone-icon class="icon w-6 h-6" />
        <span>
            {{ client.client_PhoneNumber }}
        </span>

      </div>
      <div class="flex space-x-2">
        <LocationIcon class="icon w-6 h-6" />
        <span>
            {{ client.location }}
        </span>

      </div>
    </div>
    <hr>
    <div class="p-3 grid grid-cols-2 w-full">
      <div class="text-start">
        <span>Total Orders</span>
        {{  }}
      </div>
      <div class="text-start">
        <span>Total Spent</span>
        {{  }}
      </div>

    </div>
    <div class="flex w-full text-start">
      last order {{  }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import PhoneIcon from '@/assets/icon svg/PhoneIcon.vue'
import WriteIcon from '@/assets/icon svg/WriteIcon.vue'
import DustbinIcon from '@/assets/icon svg/DustbinIcon.vue'
import MailIcon from '@/assets/icon svg/MailIcon.vue'
import LocationIcon from '@/assets/icon svg/LocationIcon.vue'

const props = defineProps<{
  client: {
    id: number
    client_signature: string
    client_name: string
    client_PhoneNumber: string
    location: string
    email: string
  }
}>()
</script>
