<template>
  <div class="bill-to">
    <h3 class="section-title">BILL TO</h3>

    <div class="client-details">
      <div class="client-name">{{ client.client_name || 'Client Name' }}</div>
      <div class="client-company">{{ client.company || 'Company Name' }}</div>

      <div class="client-contact">
        <div class="contact-line" v-if="client.location">{{ client.location }}</div>
        <div class="contact-line" v-if="client.email">Email: {{ client.email }}</div>
        <div class="contact-line" v-if="client.client_PhoneNumber">Phone: {{ client.client_PhoneNumber }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  client: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.bill-to {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.25rem;
}

.client-details {
  font-size: 0.875rem;
  line-height: 1.4;
}

.client-name {
  font-weight: 700;
  color: #000;
  margin-bottom: 0.25rem;
}

.client-company {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.client-contact {
  color: #555;
}

.contact-line {
  margin-bottom: 0.125rem;
}
</style>
