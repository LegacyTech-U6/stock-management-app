<template>
  <v-btn
    :disabled="loading || disabled"
    :loading="loading"
    :color="color"
    :size="size"
    :variant="variant"
    :block="block"
    class="text-none"
    @click="handleClick"
  >
    <!-- Icône gauche si défini et pas en loading -->
    <template v-if="icon && !loading">
      <component :is="icon" class="h-5 w-5 mr-2" />
    </template>
    
    <!-- Texte du bouton -->
    <span>{{ text }}</span>
  </v-btn>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, default: 'Submit' },
  color: { type: String, default: 'indigo-darken-3' },
  size: { type: String, default: 'x-large' }, // small, medium, large, x-large
  variant: { type: String, default: 'flat' }, // flat, outlined, contained
  icon: { type: [String, Object], default: null }, // Vuetify icon (string) ou Lucide Vue component
  block: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  asyncClick: { type: Function, default: null }, // fonction async
})

const loading = ref(false)

const handleClick = async () => {
  if (!props.asyncClick) return

  try {
    loading.value = true
    await props.asyncClick()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
