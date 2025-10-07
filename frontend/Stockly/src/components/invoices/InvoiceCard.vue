<template>
  <div
    class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition flex flex-col justify-between"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Facture #{{ invoice.id }}</h3>
        <p class="text-sm text-gray-500">
          Créée le :
          <span>{{ invoice.date_of_creation || '—' }}</span>
        </p>
      </div>

      <span
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium capitalize',
          invoice.status === 'payée'
            ? 'bg-green-100 text-green-700'
            : invoice.status === 'en_attente'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-red-100 text-red-700',
        ]"
      >
        {{ invoice.status.replace('_', ' ') }}
      </span>
    </div>

    <!-- Payment and Client Info -->
    <div class="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
      <div>
        <p class="font-medium text-gray-800">Mode de paiement</p>
        <p>{{ invoice.mode_paiement || '—' }}</p>
      </div>
      <div>
        <p class="font-medium text-gray-800">Réduction</p>
        <p>{{ invoice.reduction_type }}%</p>
      </div>
      <div>
        <p class="font-medium text-gray-800">TVA</p>
        <p>{{ invoice.tva }}%</p>
      </div>
      <div>
        <p class="font-medium text-gray-800">Montant total</p>
        <p class="text-gray-900 font-semibold">
          {{ formatPrice(invoice.total) }}
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between pt-3 border-t border-gray-100">
      <button
        class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        @click="$emit('view', invoice.id)"
      >
        Voir détails
      </button>
      <button
        class="text-red-500 hover:text-red-700 text-sm font-medium"
        @click="$emit('delete', invoice.id)"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  invoice: {
    type: Object,
    required: true,
  },
});

const formatPrice = (amount) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
  }).format(amount || 0);
</script>
