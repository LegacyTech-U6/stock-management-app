<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left Column - Product Info & Stock Status -->
        <div class="space-y-6">
          <!-- Product Information -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <h2 class="font-semibold text-gray-900">Product Information</h2>
            </div>

            <div class="flex gap-4">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-20 h-20 rounded-lg object-cover bg-gray-100"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-1">{{ product.name }}</h3>
                <p class="text-sm text-gray-500 mb-1">SKU: {{ product.sku }}</p>
                <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
                <div class="inline-block bg-gray-100 px-3 py-1 rounded text-sm font-medium text-gray-700">
                  USD {{ product.price }}
                </div>
              </div>
            </div>
          </div>

          <!-- Current Stock Status -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
              </svg>
              <h2 class="font-semibold text-gray-900">Current Stock Status</h2>
            </div>

            <div class="bg-gray-50 rounded-lg p-6 text-center mb-6">
              <div class="flex items-center justify-center gap-2 mb-3">
                <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              </div>
              <div class="text-5xl font-bold text-gray-900 mb-1">{{ product.currentStock }}</div>
              <div class="text-sm text-gray-500">Units in Stock</div>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">{{ product.minStock }}</div>
                <div class="text-xs text-gray-500">Minimum</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ product.optimalStock }}</div>
                <div class="text-xs text-gray-500">Optimal</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">{{ product.maxStock }}</div>
                <div class="text-xs text-gray-500">Maximum</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-500">Last Restocked:</span>
              <span class="font-medium text-gray-900">{{ product.lastRestocked }}</span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              <h2 class="font-semibold text-gray-900">Quick Actions</h2>
            </div>

            <div class="space-y-3">
              <button @click="quantity = product.minStock" class="w-full flex justify-between items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <div class="text-left">
                  <div class="font-medium text-gray-900">To Minimum Level</div>
                  <div class="text-sm text-gray-500">Reach {{ product.minStock }} units</div>
                </div>
                <span class="text-lg font-bold text-gray-900">+{{ product.minStock }}</span>
              </button>

              <button @click="quantity = product.optimalStock" class="w-full flex justify-between items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <div class="text-left">
                  <div class="font-medium text-gray-900">To Optimal Level</div>
                  <div class="text-sm text-gray-500">Reach {{ product.optimalStock }} units</div>
                </div>
                <span class="text-lg font-bold text-gray-900">+{{ product.optimalStock }}</span>
              </button>

              <button @click="quantity = product.maxStock" class="w-full flex justify-between items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <div class="text-left">
                  <div class="font-medium text-gray-900">To Maximum Capacity</div>
                  <div class="text-sm text-gray-500">Reach {{ product.maxStock }} units</div>
                </div>
                <span class="text-lg font-bold text-gray-900">+{{ product.maxStock }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Middle Column - Restock Details -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 class="font-semibold text-gray-900 mb-6">Restock Details</h2>

          <div class="space-y-6">
            <!-- Quantity to Add -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Quantity to Add <span class="text-red-500">*</span>
              </label>
              <div class="flex items-center gap-3">
                <button
                  @click="handleDecrement"
                  class="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <input
                  type="number"
                  v-model.number="quantity"
                  @input="validateQuantity"
                  class="flex-1 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg py-2 focus:border-blue-500 focus:outline-none"
                />
                <button
                  @click="handleIncrement"
                  class="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
              <p class="text-sm text-gray-500 mt-2">
                New stock level will be <span class="font-semibold">{{ newStockLevel }} units</span>
              </p>
            </div>

            <!-- Unit Cost and Supplier -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Unit Cost (USD)
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    v-model.number="unitCost"
                    class="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Supplier <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select
                    v-model="supplier"
                    class="w-full appearance-none px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Peripheral Plus">Peripheral Plus</option>
                    <option value="Tech Suppliers Inc">Tech Suppliers Inc</option>
                    <option value="Global Electronics">Global Electronics</option>
                  </select>
                  <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Restock Reason -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Restock Reason
              </label>
              <div class="relative">
                <select class="w-full appearance-none px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-red-50 text-red-700">
                  <option>Out of Stock</option>
                  <option>Low Stock</option>
                  <option>Scheduled Restock</option>
                  <option>High Demand</option>
                </select>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                v-model="notes"
                placeholder="Additional notes about this restock..."
                class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                rows="3"
              />
            </div>
          </div>
        </div>

        <!-- Right Column - Summary -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div class="flex items-center gap-2 mb-6">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <h2 class="font-semibold text-gray-900">Restock Summary</h2>
            </div>

            <!-- Units to Add -->
            <div class="bg-blue-50 rounded-lg p-6 text-center mb-4">
              <div class="text-5xl font-bold text-blue-600 mb-2">+{{ quantity }}</div>
              <div class="text-sm text-blue-700 font-medium">Units to Add</div>
            </div>

            <!-- New Stock Level -->
            <div class="bg-green-50 rounded-lg p-6 text-center mb-6">
              <div class="text-5xl font-bold text-green-600 mb-2">{{ newStockLevel }}</div>
              <div class="text-sm text-green-700 font-medium">New Stock Level</div>
            </div>

            <!-- Status Changes -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Current Status:</span>
                <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  {{ currentStatus }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">New Status:</span>
                <span class="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  {{ newStatus }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Reason:</span>
                <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button class="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                Confirm Restock
              </button>
              <button class="w-full bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const quantity = ref(8);
const unitCost = ref(0);
const supplier = ref('Peripheral Plus');
const notes = ref('');

const product = {
  name: 'Wireless Gaming Mouse',
  sku: 'WGM-2024-RGB',
  category: 'Peripherals',
  price: 79.99,
  currentStock: 0,
  minStock: 15,
  optimalStock: 45,
  maxStock: 75,
  lastRestocked: '12/28/2023',
  image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop'
};

const newStockLevel = computed(() => product.currentStock + quantity.value);

const currentStatus = computed(() => {
  if (product.currentStock === 0) return 'Out of Stock';
  if (product.currentStock < product.minStock) return 'Low Stock';
  return 'In Stock';
});

const newStatus = computed(() => {
  if (newStockLevel.value === 0) return 'Out of Stock';
  if (newStockLevel.value < product.minStock) return 'Low Stock';
  return 'In Stock';
});

const handleIncrement = () => {
  quantity.value++;
};

const handleDecrement = () => {
  quantity.value = Math.max(1, quantity.value - 1);
};

const validateQuantity = (e) => {
  const value = parseInt(e.target.value);
  if (isNaN(value) || value < 1) {
    quantity.value = 1;
  }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
