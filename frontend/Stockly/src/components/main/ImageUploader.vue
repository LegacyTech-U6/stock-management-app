<template>
  <div
    class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors"
    :class="isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
    @click="openFilePicker"
  >
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      :accept="accept"
      @change="handleFileChange"
    />

    <div v-if="!previewImage" class="text-gray-500">
      <p class="font-medium">Glissez-déposez une image ici</p>
      <p>ou cliquez pour sélectionner un fichier</p>
    </div>

    <div v-else class="flex flex-col items-center gap-3">
      <img
        :src="previewImage"
        alt="Preview"
        class="max-h-56 rounded-lg shadow"
      />
      <button
        class="text-red-500 text-sm hover:underline"
        @click.stop="removeImage"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue?: File | null
  maxSize?: number // en Mo
  accept?: string
  preview?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  maxSize: 5,
  accept: 'image/*',
  preview: true
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const previewImage = ref<string | null>(null)

// 📤 Ouvrir le sélecteur de fichiers
function openFilePicker() {
  fileInput.value?.click()
}

// 📂 Gestion du drop
function handleDrop(event: DragEvent) {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file) validateFile(file)
}

// 📂 Gestion du changement via input
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) validateFile(file)
}

// ✅ Validation du fichier
function validateFile(file: File) {
  if (file.size > props.maxSize * 1024 * 1024) {
    alert(`Fichier trop volumineux (max ${props.maxSize} Mo)`)
    return
  }
  emit('update:modelValue', file)
  if (props.preview) {
    const reader = new FileReader()
    reader.onload = e => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// ❌ Supprimer l’image
function removeImage() {
  previewImage.value = null
  emit('update:modelValue', null)
}

// 🔁 Synchroniser avec v-model externe
watch(
  () => props.modelValue,
  newVal => {
    if (!newVal) previewImage.value = null
  }
)
</script>

<style scoped>
.border-dashed {
  transition: all 0.2s ease;
}
</style>
