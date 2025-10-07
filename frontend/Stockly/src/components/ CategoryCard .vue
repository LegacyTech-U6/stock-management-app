<template>
  <div class="category-card">
    <div class="category-header">
      <h3 class="category-name">{{ category.name }}</h3>
      <div class="category-stats">
        <span class="product-count">{{ category.productCount }} products</span>
        <span class="created-date">Created {{ formatDate(category.createdDate) }}</span>
      </div>
    </div>

    <p class="category-description">{{ category.description }}</p>

    <div class="category-actions">
      <button class="btn-secondary" @click="$emit('edit', category)">
        Edit
      </button>
      <button class="btn-danger" @click="$emit('delete', category.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.category-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.2s ease;
}

.category-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.category-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.category-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.product-count {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.created-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.category-description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-danger {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-danger:hover {
  background: #fee2e2;
}
</style>
