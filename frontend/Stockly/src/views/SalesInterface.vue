<template>
  <div class="sales-interface container mx-auto p-6 space-y-6">
    <div class="lg:grid grid-cols-4 space-y-5 gap-5">
      <div class="col-span-3 space-y-5">
        <ClientSelector @select-client="handleClientSelect" />

        <!-- Products -->
        <ProductSelector :products="products" @add-to-sale="addToSale" />
      </div>
      <div class="center">
        <!-- Cart -->
        <SaleCart :items="saleItems" @update-cart="updateCart" />

        <!-- Summary -->
        <PricingSummary
          :items="saleItems"
          :discount="discount"
          :tax-rate="taxRate"
          @update-discount="(val) => (discount = val)"
          @update-tax="(val) => (taxRate = val)"
          @create-invoice="createInvoice"
        />
      </div>
      <!-- Client Section -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ClientSelector from '@/components/ClientSelector.vue'
import ProductSelector from '@/components/ProductSelector.vue'
import SaleCart from '@/components/SaleCart.vue'
import PricingSummary from '@/components/PricingSummary.vue'
import { useProductStore } from '@/stores/productStore'

// ✅ Instance du store
const productStore = useProductStore()

// 🧠 State local
const products = ref([])
const selectedClient = ref(null)
const saleItems = ref([])
const discount = ref(0)
const taxRate = ref(10)

// 🧠 Methods
function handleClientSelect(client) {
  selectedClient.value = client
}

function addToSale(product) {
  const existing = saleItems.value.find((item) => item.id === product.id)
  if (existing) existing.quantity++
  else saleItems.value.push({ ...product, quantity: 1 })
}

function updateCart(updatedItems) {
  saleItems.value = updatedItems
}

function createInvoice() {
  console.log('🧾 Invoice created:', {
    client: selectedClient.value,
    items: saleItems.value,
    discount: discount.value,
    taxRate: taxRate.value,
  })
}

// ✅ Chargement des produits au montage
onMounted(async () => {
  await productStore.fetchProducts()      // 👈 Appelle l’action du store
  products.value = productStore.products  // 👈 Met à jour ton state local
  console.log('Produits chargés :', products.value)
})
</script>




<style scoped>
.sales-interface {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
