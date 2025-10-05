<template>
  <div class="product-selector bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-5">
    <div class="mb-4">
      <input
        v-model="search"
        placeholder="Search products..."
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
      />
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
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
