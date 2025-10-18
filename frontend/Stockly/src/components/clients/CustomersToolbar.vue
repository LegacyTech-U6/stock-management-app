<template>
  <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
    <!-- Search input -->
    <n-input
      :value="search"
      @update:value="$emit('update:search', $event)"
      placeholder="Search customers..."
      class="flex-1 max-w-[300px] w-full"
      clearable
    />

    <div class="flex gap-3 items-center">
      <!-- Filter button -->
      <n-select
        v-model:value="selectedFilter"
        :options="filters"
        placeholder="Filter"
        class="w-[150px]"
      />

      <!-- Add customer button -->
      <n-button type="primary" strong @click="$emit('add-customer')">
        Add Customer
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props for parent binding
const props = defineProps({
  search: String
})

// Emits to parent
const emit = defineEmits(['update:search', 'add-customer'])

// Local state (non-prop)
const selectedFilter = ref(null)

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]
</script>
