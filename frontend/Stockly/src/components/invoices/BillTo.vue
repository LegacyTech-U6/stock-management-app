<template>
  <div class="bill-to">
    <div class="section-header">
      <svg class="header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h3 class="section-title">Bill To</h3>
    </div>

    <div class="client-details">
      <div class="client-name">{{ client.name || 'Client Name' }}</div>
      <div class="client-company">{{ client.company || 'Company Name' }}</div>

      <div class="client-contact">
        <div class="contact-line" v-if="client.address">{{ client.address }}</div>
        <div class="contact-line" v-if="client.email">
          <svg class="contact-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
          </svg>
          {{ client.email }}
        </div>
        <div class="contact-line" v-if="client.phone">
          <svg class="contact-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ client.phone }}
        </div>
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
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.header-icon {
  color: #667eea;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.client-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.client-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.client-company {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.client-contact {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.contact-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.contact-icon {
  flex-shrink: 0;
  color: #9ca3af;
}

@media print {
  .bill-to {
    background: none;
    border: 1px solid #d1d5db;
  }
}
</style>
