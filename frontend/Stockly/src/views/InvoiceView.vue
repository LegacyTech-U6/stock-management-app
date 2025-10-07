<template>
  <div class="min-h-screen bg-gray-50 p-6 lg:p-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Gestion des Factures</h1>
        <p class="text-gray-600 mt-1">Consultez et gérez toutes vos factures</p>
      </div>
      <button
        class="bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center gap-2 shadow-sm"
        @click="createInvoice"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Nouvelle Facture
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- Total Factures -->
      <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-blue-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-600">Total Factures</span>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ stats.total }}</p>
      </div>

      <!-- Payées -->
      <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-green-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-600">Payées</span>
        </div>
        <p class="text-3xl font-bold text-green-600">{{ stats.paid }}</p>
      </div>

      <!-- En attente -->
      <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-yellow-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-600">En attente</span>
        </div>
        <p class="text-3xl font-bold text-yellow-600">{{ stats.pending }}</p>
      </div>

      <!-- Revenu total -->
      <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-purple-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-600">Revenu total</span>
        </div>
        <p class="text-3xl font-bold text-purple-600">
          {{ formatPrice(stats.revenue) }}
        </p>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par ID ou mode de paiement..."
          class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200"
        />
      </div>
    </div>

    <!-- Invoice Cards Grid -->
    <div v-if="filteredInvoices.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InvoiceCard
        v-for="invoice in filteredInvoices"
        :key="invoice.id"
        :invoice="invoice"
        @view="viewInvoice"
        @delete="deleteInvoice"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Aucune facture trouvée</h3>
      <p class="text-gray-500">Essayez de modifier votre recherche ou créez une nouvelle facture</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import InvoiceCard from "@/components/invoices/InvoiceCard.vue";
import { useInvoiceStore } from "@/stores/FactureStore";

const factureStore = useInvoiceStore();
const invoices = ref([]);
const searchQuery = ref("");
const stats = ref({
  total: 0,
  paid: 0,
  pending: 0,
  revenue: 0,
});

onMounted(async () => {
  invoices.value = await factureStore.fetchInvoice();

  // Compute stats
  stats.value.total = invoices.value.length;
  stats.value.paid = invoices.value.filter((i) => i.status === "payée").length;
  stats.value.pending = invoices.value.filter((i) => i.status === "en_attente").length;
  stats.value.revenue = invoices.value
    .filter((i) => i.status === "payée")
    .reduce((acc, cur) => acc + (cur.total || 0), 0);
});

const filteredInvoices = computed(() =>
  invoices.value.filter(
    (i) =>
      i.id.toString().includes(searchQuery.value) ||
      i.mode_paiement.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function createInvoice() {
  // Redirection vers la création de facture
}

function viewInvoice(id) {
  // Redirection vers la page de détails de la facture
}

function deleteInvoice(id) {
  if (confirm("Voulez-vous vraiment supprimer cette facture ?")) {
    factureStore.Delete(id);
    invoices.value = invoices.value.filter((i) => i.id !== id);
  }
}

const formatPrice = (amount) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
  }).format(amount || 0);
</script>