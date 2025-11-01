<template>
  <div class="payment-terms">
    <div class="terms-section">
      <h4 class="section-title">PAYMENT TERMS</h4>
      <div class="terms-content">
        <p><strong>Due Date:</strong> Payment is due within 30 days of invoice date.</p>
        <p><strong>Late Payment:</strong> 1.5% monthly interest on overdue amounts.</p>
        <p><strong>Payment Methods:</strong> Bank Transfer, Credit Card, Check</p>
      </div>
    </div>

    <div class="thank-you">Thank you for your business!</div>
  </div>
</template>

<style scoped>
.payment-terms {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.terms-section {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.terms-content {
  font-size: 0.75rem;
  color: #555;
  line-height: 1.4;
}

.terms-content p {
  margin: 0.25rem 0;
}

.thank-you {
  text-align: center;
  font-weight: 700;
  color: #000;
  font-size: 0.875rem;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
}
</style>
