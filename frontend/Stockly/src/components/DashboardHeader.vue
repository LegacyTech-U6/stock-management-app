<template>
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Stock Management Dashboard</h1>
      <p class="text-gray-600 text-sm">Monitor your inventory and business performance</p>
    </div>
    <div class="flex gap-3">
      <button
        class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium"
      >
        Overview
      </button>
      <button
        class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium"
      >
        Enterprise Analytics
      </button>
      <button
        class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium flex items-center gap-2"
      >
        <Download class="w-4 h-4" /> Export
      </button>
      <button
        class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 text-sm font-medium flex items-center gap-2"
      >
        <ShoppingCart class="w-4 h-4" /> Sales
      </button>
      <button
        class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm font-medium flex items-center gap-2"
      >
        <Eye class="w-4 h-4" /> View Inventory
      </button>
    </div>
  </div>
</template>

<script setup>
import { Download, ShoppingCart, Eye } from 'lucide-vue-next'
</script>

---
