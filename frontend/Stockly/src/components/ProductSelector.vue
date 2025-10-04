<template>
  <div class="product-selector border p-5 rounded-lg space-y-4">
    <input v-model="search" placeholder="Search products..." class="border p-2 w-full rounded" />

    <div class="grid grid-cols-3 gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add="() => emit('add-to-sale', product)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'
const props = defineProps({ products: Array })
const emit = defineEmits(['add-to-sale'])
const search = ref('')
const filteredProducts = computed(() =>
  props.products.filter(p => p.Prod_name.toLowerCase().includes(search.value.toLowerCase()))
)
</script>
