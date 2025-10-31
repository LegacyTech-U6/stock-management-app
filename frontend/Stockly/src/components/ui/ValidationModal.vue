<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :title="title"
    style="max-width: 400px"
    :closable="true"
    @close="hide"
  >
    <div>{{ message }}</div>
    <template #action>
      <n-button @click="hide" type="primary">OK</n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NButton } from 'naive-ui'
import { useGlobalModal } from '@/composable/useValidation'

const { visible, title, message, hide } = useGlobalModal()
</script>
