<template>
  <div class="sales-interface min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="p-4 lg:p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">New Sale</h1>
            <p class="text-sm text-gray-500 mt-1">Create and manage sales transactions</p>
          </div>
          <div class="flex gap-2">
            <button
              @click="showCartModal = true"
              class="lg:hidden relative bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <span>Cart</span>
              <span v-if="saleItems.length > 0" class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium">
                {{ saleItems.length }}
              </span>
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span class="text-sm text-gray-600">Items in Cart</span>
            </div>
            <div class="text-2xl font-semibold text-gray-900">{{ saleItems.length }}</div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span class="text-purple-600 font-bold text-lg">$</span>
              </div>
              <span class="text-sm text-gray-600">Subtotal</span>
            </div>
            <div class="text-2xl font-semibold text-gray-900">${{ subtotal.toFixed(2) }}</div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-sm text-gray-600">Discount</span>
            </div>
            <div class="text-2xl font-semibold text-gray-900">{{ discount }}%</div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span class="text-sm text-gray-600">Total</span>
            </div>
            <div class="text-2xl font-semibold text-gray-900">${{ total.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 lg:p-6">
      <div class="lg:grid grid-cols-12 gap-6">
        <!-- Left Section: Client & Products -->
        <div class="lg:col-span-8 space-y-4">
          <!-- Client Selector -->
          <ClientSelector @select-client="handleClientSelect" />

          <!-- Products Section -->
          <div class="bg-white border border-gray-200 rounded-lg p-4 lg:p-5">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Products</h2>
              <button
                @click="showProductModal = true"
                class="lg:hidden bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Browse All
              </button>
            </div>

            <!-- Desktop: Products visible -->
            <div class="hidden lg:block">
              <ProductSelector :products="products" @add-to-sale="addToSale" />
            </div>

            <!-- Mobile: Product count info -->
            <div class="lg:hidden text-sm text-gray-600">
              {{ products.length }} products available
            </div>
          </div>
        </div>

        <!-- Right Section: Cart & Summary (Desktop only) -->
        <div class="hidden lg:block lg:col-span-4 space-y-4">
          <!-- Cart -->
          <div class="bg-white border border-gray-200 rounded-lg p-4 lg:p-5">
            <div class="flex justify-between items-center mb-4">
              <h2 class="font-semibold text-gray-900">Cart Items</h2>
              <span class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-sm font-medium">
                {{ saleItems.length }}
              </span>
            </div>

            <div v-if="saleItems.length <= 0" class="flex flex-col justify-center items-center py-12 text-gray-400">
              <svg class="w-16 h-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p class="text-sm">No items added yet</p>
            </div>

            <div v-else class="space-y-3 max-h-96 overflow-y-auto">
              <CartItem
                v-for="item in saleItems"
                :key="item.id"
                :item="item"
                @update-item="updateItem"
                @remove-item="removeItem"
              />
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-white border border-gray-200 rounded-lg p-4 lg:p-5">
            <h3 class="font-semibold text-gray-900 mb-4">Summary</h3>

            <div class="space-y-3">
              <div class="flex justify-between items-center text-gray-700">
                <span class="text-sm">Subtotal</span>
                <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between items-center text-gray-700">
                <span class="text-sm">Discount</span>
                <div class="flex items-center gap-2">
                  <input
                    type="number"
                    v-model.number="discount"
                    min="0"
                    max="100"
                    class="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <span class="text-sm">%</span>
                </div>
              </div>

              <div class="flex justify-between items-center text-gray-700">
                <span class="text-sm">Tax ({{ taxRate }}%)</span>
                <span class="font-semibold">${{ taxAmount.toFixed(2) }}</span>
              </div>

              <div class="border-t border-gray-200 pt-3 mt-3">
                <div class="flex justify-between items-center text-gray-900">
                  <span class="text-base font-semibold">Total</span>
                  <span class="text-2xl font-semibold">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <button
                @click="createInvoice"
                :disabled="saleItems.length === 0 || !selectedClient"
                class="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg mt-4 transition-colors"
              >
                Create Invoice
              </button>
            </div>
          </div>
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
          <h2 class="text-lg font-semibold text-gray-900">Select Products</h2>
          <button @click="showProductModal = false" class="text-gray-600 text-2xl hover:text-gray-900">&times;</button>
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
          <h2 class="text-lg font-semibold text-gray-900">Shopping Cart</h2>
          <button @click="showCartModal = false" class="text-gray-600 text-2xl hover:text-gray-900">&times;</button>
        </div>
        <div class="p-4 space-y-4">
          <!-- Cart Items -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-3">Cart Items ({{ saleItems.length }})</h3>
            
            <div v-if="saleItems.length <= 0" class="flex flex-col justify-center items-center py-12 text-gray-400">
              <svg class="w-16 h-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p class="text-sm">No items added yet</p>
            </div>

            <div v-else class="space-y-3">
              <CartItem
                v-for="item in saleItems"
                :key="item.id"
                :item="item"
                @update-item="updateItem"
                @remove-item="removeItem"
              />
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 mb-4">Summary</h3>

            <div class="space-y-3">
              <div class="flex justify-between items-center text-gray-700">
                <span class="text-sm">Subtotal</span>
                <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between items-center text-gray-700">
                <span class="text-sm">Discount</span>
                <div class="flex items-center gap-2">
                  <input
                    type="number"
                    v-model.number="discount"
                    min="0"
                    max="100"
                    class="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <span class="text-sm">%</span>
                </div>
              </div>

              <div class="flex justify-between items-center text-gray-700">
                <span class="text-sm">Tax ({{ taxRate }}%)</span>
                <span class="font-semibold">${{ taxAmount.toFixed(2) }}</span>
              </div>

              <div class="border-t border-gray-200 pt-3 mt-3">
                <div class="flex justify-between items-center text-gray-900">
                  <span class="text-base font-semibold">Total</span>
                  <span class="text-2xl font-semibold">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <button
                @click="createInvoice"
                :disabled="saleItems.length === 0 || !selectedClient"
                class="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg mt-4 transition-colors"
              >
                Create Invoice
              </button>
            </div>
          </div>
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
import { ref, onMounted, computed } from 'vue'
import ClientSelector from '@/components/ClientSelector.vue'
import ProductSelector from '@/components/ProductSelector.vue'
import CartItem from '@/components/CartItem.vue'
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

// Computed values
const subtotal = computed(() =>
  saleItems.value.reduce((sum, item) => sum + item.selling_price * item.quantity, 0),
)

const taxAmount = computed(() =>
  parseFloat(((subtotal.value * taxRate.value) / 100).toFixed(2))
)

const total = computed(() =>
  parseFloat(
    (subtotal.value - (subtotal.value * discount.value) / 100 + taxAmount.value).toFixed(2),
  ),
)

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

function updateItem(updatedItem) {
  const index = saleItems.value.findIndex(i => i.id === updatedItem.id)
  if (index !== -1) {
    saleItems.value[index] = updatedItem
  }
}

function removeItem(id) {
  saleItems.value = saleItems.value.filter(i => i.id !== id)
}

async function createInvoice() {
  console.log('🧾 Invoice created:', {
    client_id: selectedClient.value.id,
    items: saleItems.value,
    discount: discount.value,
    taxRate: taxRate.value,
  })

  const data = {
    client_id: selectedClient.value.id,
    items: saleItems.value,
    reduction: discount.value,
    tva: taxRate.value,
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