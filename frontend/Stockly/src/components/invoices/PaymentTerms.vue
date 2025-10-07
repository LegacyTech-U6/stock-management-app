<template>
  <div class="payment-terms">
    <div class="terms-grid">
      <div class="terms-section">
        <div class="section-header">
          <svg class="section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h4 class="section-title">Payment Terms</h4>
        </div>
        <div class="terms-content">
          <div class="term-item">
            <div class="term-icon">💳</div>
            <div class="term-text">
              <strong>Due Date:</strong> Payment is due within 30 days of invoice date
            </div>
          </div>
          <div class="term-item">
            <div class="term-icon">⚠️</div>
            <div class="term-text">
              <strong>Late Payments:</strong> 1.5% monthly interest on overdue amounts
            </div>
          </div>
          <div class="term-item">
            <div class="term-icon">💰</div>
            <div class="term-text">
              <strong>Currency:</strong> All amounts are in US Dollars (USD)
            </div>
          </div>
        </div>
      </div>

      <div class="terms-section">
        <div class="section-header">
          <svg class="section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 15l-5.5-5.5 1.41-1.41L12 12.17l4.09-4.08L17.5 9.5 12 15z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
          </svg>
          <h4 class="section-title">Payment Methods</h4>
        </div>
        <div class="terms-content">
          <div class="payment-method">
            <div class="method-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="method-details">
              <div class="method-name">Bank Transfer</div>
              <div class="method-info">Account details provided upon request</div>
            </div>
          </div>
          <div class="payment-method">
            <div class="method-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M1 10h22" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="method-details">
              <div class="method-name">Credit Card</div>
              <div class="method-info">Visa, MasterCard, American Express</div>
            </div>
          </div>
          <div class="payment-method">
            <div class="method-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="currentColor" stroke-width="2"/>
                <path d="M1 10h22" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="method-details">
              <div class="method-name">Check</div>
              <div class="method-info">Payable to Your Company Name</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-notes">
      <div class="note-item">
        <strong>Thank you for your business!</strong> We appreciate your prompt payment.
      </div>
      <div class="note-item">
        Questions? Contact accounts@company.com or call (555) 123-4567
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-terms {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
}

.terms-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.terms-section {
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

.section-icon {
  color: #667eea;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.terms-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.term-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.term-icon {
  flex-shrink: 0;
  font-size: 1.125rem;
  margin-top: 0.125rem;
}

.term-text {
  color: #475569;
  font-size: 0.875rem;
  line-height: 1.5;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
}

.method-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #eff6ff;
  border-radius: 6px;
  color: #3b82f6;
  flex-shrink: 0;
}

.method-details {
  flex: 1;
}

.method-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  margin-bottom: 0.125rem;
}

.method-info {
  color: #6b7280;
  font-size: 0.75rem;
}

.footer-notes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  text-align: center;
}

.note-item {
  font-size: 0.875rem;
  line-height: 1.5;
}

.note-item:first-child {
  font-size: 0.9375rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .terms-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .terms-section {
    padding: 1rem;
  }

  .footer-notes {
    padding: 1rem;
    text-align: left;
  }
}

@media print {
  .payment-terms {
    border-top: 2px solid #d1d5db;
  }

  .terms-section {
    background: none;
    border: 1px solid #d1d5db;
  }

  .payment-method {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
  }

  .footer-notes {
    background: #374151 !important;
    color: white !important;
    -webkit-print-color-adjust: exact;
  }
}
</style>
