<template>
  <div class="border-gray-200 px-8 mx-auto py-5">
    <div class="flex justify-between items-center max-w-8xl mx-auto flex-col md:flex-row gap-4 md:gap-0">
      <div class="flex flex-col gap-1">
        <n-text class="text-2xl font-semibold text-gray-900">Customers</n-text>
        <n-text depth="3" class="text-sm text-gray-500">Manage your customers</n-text>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <n-button quaternary circle @click="$emit('export-pdf')" class="w-10 h-10">
          <template #icon><n-icon :component="FileText" size="20" color="#ef4444" /></template>
        </n-button>

        <n-button quaternary circle @click="$emit('export-excel')" class="w-10 h-10">
          <template #icon><n-icon :component="FileSpreadsheet" size="20" color="#10b981" /></template>
        </n-button>

        <n-button quaternary circle @click="$emit('refresh')" class="w-10 h-10">
          <template #icon><n-icon :component="RefreshCw" size="20" /></template>
        </n-button>

        <n-button type="success" @click="$emit('add-customer')" class="h-10 px-5 font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md">
          <template #icon><n-icon :component="Plus" /></template>
          Add Customer
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NButton, NIcon, NText } from 'naive-ui'
import { FileText, FileSpreadsheet, RefreshCw, Plus } from 'lucide-vue-next'
</script>
