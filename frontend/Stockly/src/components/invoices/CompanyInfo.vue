<template>
  <div class="company-info">
    <div class="company-logo">
      <div class="logo-placeholder">
        <span class="logo-text">Your Logo</span>
      </div>
    </div>

    <div class="company-details">
      <h2 class="company-name">Your Company Name</h2>
      <div class="contact-info">
        <div class="contact-item">
          <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1116 0z" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>123 Business Street, City, State 12345</span>
        </div>
        <div class="contact-item">
          <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>(555) 123-4567</span>
        </div>
        <div class="contact-item">
          <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>hello@company.com</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.company-info {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.company-logo {
  flex-shrink: 0;
}

.logo-placeholder {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  text-align: center;
}

.company-details {
  flex: 1;
}

.company-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.contact-icon {
  flex-shrink: 0;
  color: #9ca3af;
}

@media print {
  .company-info {
    break-inside: avoid;
  }
}
</style>
