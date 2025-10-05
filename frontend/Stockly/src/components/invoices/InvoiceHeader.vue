<template>
  <div class="invoice-header flex justify-between items-center mb-6">
    <div>
      <h1 class="text-2xl font-bold">Invoice</h1>
      <p class="text-gray-500">Invoice #{{ invoiceNumber }}</p>
    </div>
    <div class="flex space-x-2">
      <button class="btn-gray" @click="$emit('back')">Back to Sales</button>
      <button class="btn-gray" @click="$emit('email')">Email</button>
      <button class="btn-gray" @click="$emit('download')">Download PDF</button>
      <button class="btn-dark" @click="$emit('print')">Print</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  invoiceNumber: String,
  creationDate: String,
  dueDate: String
})
</script>
