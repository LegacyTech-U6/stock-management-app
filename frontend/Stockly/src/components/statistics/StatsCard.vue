<template>
  <div
    class="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between w-full max-w-xs border border-gray-100"
  >
    <!-- Card Title -->
    <h3 class="text-gray-500 text-sm font-medium mb-2">{{ title }}</h3>

    <!-- Card Value -->
    <p
      class="text-2xl font-bold"
      :class="valueColor"
    >
      {{ formattedValue }}
    </p>

    <!-- Optional Subtitle -->
    <p v-if="subtitle" class="text-gray-400 text-sm mt-1">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props: title, value, optional color class and subtitle
const props = defineProps({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  valueColor: { type: String, default: "text-gray-800" },
  subtitle: { type: String, default: "" },
});

// Format the value with commas for readability
const formattedValue = computed(() =>
  props.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
);
</script>

<style scoped>
/* Optional: add hover effect */
div:hover {
  transform: translateY(-2px);
  transition: 0.3s;
}
</style>
