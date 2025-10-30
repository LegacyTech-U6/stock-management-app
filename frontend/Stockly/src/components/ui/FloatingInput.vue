<!-- src/components/FloatingInput.vue -->
<template>
  <div class="relative">
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :autocomplete="autocomplete"
      class="peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-6 pb-2 text-gray-900 transition-all
             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
    />
    <label
      :for="id"
      class="absolute left-3 top-3 text-gray-500 text-sm transition-all
             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
             peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 bg-white px-1"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ' '
  },
  autocomplete: {
    type: String,
    default: ''
  },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>
