<template>
  <table class="w-full text-sm border mb-6">
    <thead class="bg-gray-100">
      <tr>
        <th>#</th>
        <th>Item</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.Prod_name }}</td>
        <td>{{ item.quantity }}</td>
        <td>${{ item.selling_price.toFixed(2) }}</td>
        <td>${{ (item.quantity * item.selling_price).toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  items: Array
})
</script>
