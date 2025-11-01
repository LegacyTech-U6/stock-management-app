<template>
  <div
    class="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-5">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Facture #{{ invoice.id }}</h3>
        <p class="text-sm text-gray-500 mt-1">
          {{ invoice.date_of_creation || '—' }}
        </p>
      </div>

      <span
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap',
          invoice.status === 'payée'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : invoice.status === 'en_attente'
              ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
              : 'bg-red-50 text-red-700 border border-red-200',
        ]"
      >
        {{ invoice.status.replace('_', ' ') }}
      </span>
    </div>

    <!-- Info Grid -->
    <div class="space-y-3 mb-5">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-500">Mode de paiement</span>
        <span class="font-medium text-gray-900">{{ invoice.mode_paiement || '—' }}</span>
      </div>

      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-500">Réduction</span>
        <span class="font-medium text-gray-900">{{ invoice.reduction_type }}%</span>
      </div>

      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-500">TVA</span>
        <span class="font-medium text-gray-900">{{ invoice.tva }}%</span>
      </div>

      <div class="pt-3 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">Montant total</span>
          <span class="text-lg font-bold text-gray-900">
            {{ formatPrice(invoice.total) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2">
      <button
        class="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 text-sm font-medium transition-colors duration-200"
        @click="$emit('view', invoice.id)"
      >
        Voir détails
      </button>
      <button
        class="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors duration-200"
        @click="$emit('delete', invoice.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
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
})

const formatPrice = (amount) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
  }).format(amount || 0)
</script>
