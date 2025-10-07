<template>
  <div class="invoice-header">
    <div class="header-background">
      <div class="header-content">
        <div class="header-info">
          <h1 class="invoice-title">INVOICE</h1>
          <div class="invoice-details">
            <div class="detail-item">
              <span class="detail-label">Invoice #:</span>
              <span class="detail-value">{{ invoiceNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Date:</span>
              <span class="detail-value">{{ creationDate || new Date().toLocaleDateString() }}</span>
            </div>
            <div class="detail-item" v-if="dueDate">
              <span class="detail-label">Due Date:</span>
              <span class="detail-value">{{ dueDate }}</span>
            </div>
          </div>
        </div>

        <div class="header-actions">
          <button class="btn btn-secondary" @click="$emit('back')">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back
          </button>
          <button class="btn btn-secondary" @click="$emit('email')">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Email
          </button>
          <button class="btn btn-primary" @click="$emit('download')">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            PDF
          </button>
          <button class="btn btn-accent" @click="$emit('print')">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 14h12v8H6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Print
          </button>
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

defineEmits(['back', 'email', 'download', 'print'])
</script>

<style scoped>
.invoice-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header-background {
  padding: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 900px;
  margin: 0 auto;
}

.invoice-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: 2px;
}

.invoice-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  gap: 0.5rem;
}

.detail-label {
  font-weight: 600;
  opacity: 0.9;
}

.detail-value {
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-icon {
  flex-shrink: 0;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.btn-primary {
  background: #10b981;
  color: white;
}

.btn-primary:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-accent {
  background: #f59e0b;
  color: white;
}

.btn-accent:hover {
  background: #d97706;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }
}

@media print {
  .header-actions {
    display: none;
  }

  .invoice-header {
    background: none !important;
    color: black !important;
  }
}
</style>
