<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="icon line-color"
  >
    <polyline
      points="21 5 12 14 8 10"
      style="
        fill: none;
        stroke: rgb(44, 169, 188);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      "
    />
    <path
      d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1"
      style="
        fill: none;
        stroke: rgb(0, 0, 0);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      "
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  width?: string | number
  height?: string | number
}>()
</script>
