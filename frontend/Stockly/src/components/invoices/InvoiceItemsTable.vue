<template>
  <div class="invoice-items">
    <div class="table-container">
      <table class="items-table">
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Item Description</th>
            <th class="text-right">Quantity</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.id" class="item-row">
            <td class="index-cell">{{ index + 1 }}</td>
            <td class="description-cell">
              <div class="item-description">
                <div class="item-name">{{ item.Prod_name }}</div>
                <div v-if="item.description" class="item-desc">{{ item.description }}</div>
              </div>
            </td>
            <td class="quantity-cell">{{ item.quantity }}</td>
            <td class="price-cell">${{ item.selling_price.toFixed(2) }}</td>
            <td class="total-cell">${{ (item.quantity * item.selling_price).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: Array
})
</script>

<style scoped>
.invoice-items {
  margin: 2rem 0;
}

.table-container {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.items-table th {
  background: #f8fafc;
  padding: 1rem 1.25rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}

.items-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
}

.items-table tr:last-child td {
  border-bottom: none;
}

.item-row:hover {
  background: #f9fafb;
}

.index-cell {
  font-weight: 500;
  color: #6b7280;
  width: 50px;
}

.description-cell {
  min-width: 200px;
}

.item-description {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-name {
  font-weight: 500;
  color: #1f2937;
}

.item-desc {
  font-size: 0.875rem;
  color: #6b7280;
}

.quantity-cell,
.price-cell,
.total-cell {
  font-weight: 500;
  color: #374151;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

@media (max-width: 768px) {
  .table-container {
    overflow-x: auto;
  }

  .items-table {
    min-width: 600px;
  }
}

@media print {
  .table-container {
    box-shadow: none;
    border: 1px solid #d1d5db;
  }

  .item-row:hover {
    background: transparent;
  }
}
</style>
