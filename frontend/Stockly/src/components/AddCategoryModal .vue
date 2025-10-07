<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ editingCategory ? 'Edit Category' : 'Add New Category' }}</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-group">
          <label for="category-name" class="form-label">Category Name</label>
          <input
            id="category-name"
            v-model="formData.name"
            type="text"
            class="form-input"
            required
            placeholder="Enter category name"
          />
        </div>

        <div class="form-group">
          <label for="category-description" class="form-label">Description</label>
          <textarea
            id="category-description"
            v-model="formData.description"
            class="form-textarea"
            rows="3"
            placeholder="Enter category description"
          ></textarea>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            {{ editingCategory ? 'Update' : 'Create' }} Category
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  category: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['save', 'close']);

const formData = ref({
  name: '',
  description: ''
});

const editingCategory = ref(props.category);

watch(() => props.category, (newCategory) => {
  editingCategory.value = newCategory;
  if (newCategory) {
    formData.value = {
      name: newCategory.name,
      description: newCategory.description
    };
  } else {
    formData.value = {
      name: '',
      description: ''
    };
  }
}, { immediate: true });

const handleSubmit = () => {
  const categoryData = {
    ...formData.value,
    id: editingCategory.value?.id
  };
  emit('save', categoryData);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #374151;
}

.modal-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
}
</style>
