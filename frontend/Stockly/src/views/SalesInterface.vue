<template>
  <div class="sales-interface min-h-screen bg-gray-50">
    <div class="container mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
      <!-- Mobile Header with Cart Button -->
      <div class="lg:hidden flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold text-gray-900">New Sale</h1>
        <button
          @click="showCartModal = true"
          class="relative bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span>Cart</span>
          <span v-if="saleItems.length > 0" class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {{ saleItems.length }}
          </span>
        </button>
      </div>

      <div class="lg:grid grid-cols-12 gap-6">
        <!-- Left Section: Client & Products (Desktop: col-span-8, Mobile: full) -->
        <div class="lg:col-span-8 space-y-4">
          <ClientSelector @select-client="handleClientSelect" />

          <!-- Mobile: Button to open products -->
          <button
            @click="showProductModal = true"
            class="lg:hidden w-full bg-slate-900 text-white py-3 rounded-lg font-medium"
          >
            Browse Products
          </button>

          <!-- Desktop: Products visible -->
          <div class="hidden lg:block">
            <ProductSelector :products="products" @add-to-sale="addToSale" />
          </div>
        </div>

        <!-- Right Section: Cart & Summary (Desktop only) -->
        <div class="hidden lg:block lg:col-span-4 space-y-4">
          <SaleCart :items="saleItems" @update-cart="updateCart" />
          <PricingSummary
            :items="saleItems"
            :discount="discount"
            :tax-rate="taxRate"
            @update-discount="(val) => (discount = val)"
            @update-tax="(val) => (taxRate = val)"
            @create-invoice="createInvoice"
          />
        </div>
      </div>
    </div>

    <!-- Mobile: Product Modal -->
    <Transition name="modal">
      <div
        v-if="showProductModal"
        class="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto"
      >
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-900">Select Products</h2>
          <button @click="showProductModal = false" class="text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="p-4">
          <ProductSelector :products="products" @add-to-sale="addToSale" />
        </div>
      </div>
    </Transition>

    <!-- Mobile: Cart Modal -->
    <Transition name="modal">
      <div
        v-if="showCartModal"
        class="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto"
      >
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-900">Shopping Cart</h2>
          <button @click="showCartModal = false" class="text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="p-4 space-y-4">
          <SaleCart :items="saleItems" @update-cart="updateCart" />
          <PricingSummary
            :items="saleItems"
            :discount="discount"
            :tax-rate="taxRate"
            @update-discount="(val) => (discount = val)"
            @update-tax="(val) => (taxRate = val)"
            @create-invoice="createInvoice"
          />
        </div>
      </div>
    </Transition>

    <CreateInvoiceForm
      v-if="showInvoiceForm"
      :invoice="invoiceData"
      :selectedClient="selectedClient"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClientSelector from '@/components/ClientSelector.vue'
import ProductSelector from '@/components/ProductSelector.vue'
import SaleCart from '@/components/SaleCart.vue'
import PricingSummary from '@/components/PricingSummary.vue'
import { useProductStore } from '@/stores/productStore'
import { useInvoiceStore } from '@/stores/FactureStore'
import CreateInvoiceForm from '@/components/invoices/CreateInvoiceForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()
const invoiceStore = useInvoiceStore()

const products = ref([])
const selectedClient = ref(null)
const saleItems = ref([])
const discount = ref(0)
const taxRate = ref(10)
const showInvoiceForm = ref(false)
const invoiceData = ref(null)

// Mobile modals
const showProductModal = ref(false)
const showCartModal = ref(false)

function handleClientSelect(client) {
  selectedClient.value = client
}

function addToSale(product) {
  const existing = saleItems.value.find((item) => item.id === product.id)
  if (existing) existing.quantity++
  else saleItems.value.push({ ...product, quantity: 1 })

  // Close product modal on mobile after adding
  showProductModal.value = false
}

function updateCart(updatedItems) {
  saleItems.value = updatedItems
}

async function createInvoice() {
  console.log('🧾 Invoice created:', {
    client_id: selectedClient.value.id,
    items: saleItems.value,
    discount: discount.value,
    taxRate: taxRate.value,
  })

  const data = {
    client: selectedClient.value,
    items: saleItems.value,
    discount: discount.value,
    taxRate: taxRate.value,
  }

  router.push({
    name: 'invoice',
    state: {
      invoice: invoiceData.value,
      client: selectedClient.value
    }
  })

  invoiceData.value = data
  localStorage.setItem('invoiceData', JSON.stringify(invoiceData.value))

  // Close cart modal on mobile
  showCartModal.value = false
}

onMounted(async () => {
  await productStore.fetchProducts()
  products.value = productStore.products
  console.log('Produits chargés :', products.value)
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: transform 0.3s ease;
}
.modal-enter-from {
  transform: translateY(100%);
}
.modal-leave-to {
  transform: translateY(100%);
}
</style>
