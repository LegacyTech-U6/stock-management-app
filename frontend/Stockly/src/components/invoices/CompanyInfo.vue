<template>
  <div class="company-info">
    <div class="company-header">
      <h1 class="company-name">YOUR COMPANY NAME</h1>
      <div class="company-tagline">Professional Services</div>
    </div>

    <div class="company-details">
      <div class="contact-line">123 Business Street, City, State 12345</div>
      <div class="contact-line">Phone: (555) 123-4567 • Email: hello@company.com</div>
      <div class="contact-line">www.companywebsite.com</div>
    </div>
  </div>
</template>

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
