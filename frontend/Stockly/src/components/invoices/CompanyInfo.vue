<template>
  <div class="company-info">
    <div class="company-header">
      <h1 class="company-name">{{ entreprise.name }}</h1>
      <div class="company-tagline" v-if="entreprise.description">
        {{ entreprise.description }}
      </div>
    </div>

    <div class="company-details">
      <div class="contact-line" v-if="entreprise.adresse || entreprise.ville || entreprise.code_postal">
        {{ entreprise.adresse }}
        <span v-if="entreprise.ville">, {{ entreprise.ville }}</span>
        <span v-if="entreprise.code_postal"> {{ entreprise.code_postal }}</span>
      </div>

      <div class="contact-line" v-if="entreprise.telephone_contact || entreprise.email_contact">
        <span v-if="entreprise.telephone_contact">📞 {{ entreprise.telephone_contact }}</span>
        <span v-if="entreprise.telephone_contact && entreprise.email_contact"> • </span>
        <span v-if="entreprise.email_contact">✉️ {{ entreprise.email_contact }}</span>
      </div>

      <div class="contact-line" v-if="entreprise.site_web">
        🌐 {{ entreprise.site_web }}
      </div>

      <div class="contact-line" v-if="entreprise.numero_fiscal || entreprise.nui">
        <span v-if="entreprise.numero_fiscal">Numéro fiscal : {{ entreprise.numero_fiscal }}</span>
        <span v-if="entreprise.numero_fiscal && entreprise.nui"> • </span>
        <span v-if="entreprise.nui">NUI : {{ entreprise.nui }}</span>
      </div>

      <div class="contact-line" v-if="entreprise.informations_bancaires">
        💳 {{ entreprise.informations_bancaires }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  entreprise: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Nom Entreprise',
      description: '',
      adresse: '',
      ville: '',
      code_postal: '',
      telephone_contact: '',
      email_contact: '',
      site_web: '',
      numero_fiscal: '',
      nui: '',
      informations_bancaires: '',
    }),
  },
})
</script>

<style scoped>
.company-info {
  border-bottom: 2px solid #000;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.company-header {
  text-align: center;
  margin-bottom: 1rem;
}

.company-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 0.25rem 0;
  letter-spacing: 1px;
}

.company-tagline {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.company-details {
  text-align: center;
  font-size: 0.875rem;
  color: #333;
  line-height: 1.4;
}

.contact-line {
  margin-bottom: 0.25rem;
}

@media print {
  .company-info {
    border-bottom: 2px solid #000;
  }
}
</style>
