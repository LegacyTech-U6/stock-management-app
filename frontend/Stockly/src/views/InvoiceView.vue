<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestion des Factures</h1>
        <p class="text-gray-500">Consultez et gérez toutes vos factures</p>
      </div>
      <button
        class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        @click="createInvoice"
      >
        + Nouvelle Facture
      </button>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-4 gap-4 mb-10">
      <div class="bg-white p-4 rounded-xl border text-center shadow-sm">
        <p class="text-sm text-gray-500">Total Factures</p>
        <p class="text-2xl font-semibold text-gray-900">{{ stats.total }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border text-center shadow-sm">
        <p class="text-sm text-gray-500">Payées</p>
        <p class="text-2xl font-semibold text-green-600">{{ stats.paid }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border text-center shadow-sm">
        <p class="text-sm text-gray-500">En attente</p>
        <p class="text-2xl font-semibold text-yellow-600">{{ stats.pending }}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border text-center shadow-sm">
        <p class="text-sm text-gray-500">Revenu total</p>
        <p class="text-2xl font-semibold text-indigo-600">
          {{ formatPrice(stats.revenue) }}
        </p>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher par ID ou mode de paiement..."
        class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>

    <!-- Liste de factures -->
    <div v-if="filteredInvoices.length" class="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
      <InvoiceCard
        v-for="invoice in filteredInvoices"
        :key="invoice.id"
        :invoice="invoice"
        @view="viewInvoice"
        @delete="deleteInvoice"
      />
    </div>

    <div v-else class="text-center text-gray-500 mt-12">
      Aucune facture trouvée.
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
