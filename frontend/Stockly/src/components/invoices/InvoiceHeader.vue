<template>
  <div class="invoice-header">
    <div class="header-main">
      <h1 class="invoice-title">INVOICE</h1>
      <div class="invoice-meta">
        <div class="meta-row">
          <span class="meta-label">Invoice #:</span>
          <span class="meta-value">{{ invoiceNumber }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Date:</span>
          <span class="meta-value">{{ creationDate || new Date().toLocaleDateString() }}</span>
        </div>
        <div class="meta-row" v-if="dueDate">
          <span class="meta-label">Due Date:</span>
          <span class="meta-value">{{ dueDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  invoiceNumber: String,
  creationDate: String,
  dueDate: String
})
</script>

<style scoped>
.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #000;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
}

.invoice-title {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin: 0;
  letter-spacing: 2px;
}

.invoice-meta {
  text-align: right;
}

.meta-row {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.meta-label {
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;
}

.meta-value {
  font-weight: 500;
  color: #000;
}

@media (max-width: 768px) {
  .invoice-header {
    flex-direction: column;
    gap: 1rem;
  }

  .header-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .invoice-meta {
    text-align: left;
  }
}
</style>
