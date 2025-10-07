<template>
  <div class="category-view">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Category Management</h1>
        <p class="page-subtitle">Organize your products with categories</p>
      </div>
      <div class="header-actions">
        <button class="btn-primary" @click="showAddCategory = true">
          + Add Category
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ totalCategories }}</div>
        <div class="stat-label">Total Categories</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ totalProducts }}</div>
        <div class="stat-label">Total Products</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ categoriesWithProducts }}</div>
        <div class="stat-label">Categories with Products</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ emptyCategories }}</div>
        <div class="stat-label">Empty Categories</div>
      </div>
    </div>

    <!-- Search and Controls -->
    <div class="controls-section">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search categories..."
          class="search-input"
        />
      </div>
    </div>

    <!-- Categories Grid -->
    <div class="categories-grid">
      <CategoryCard
        v-for="category in filteredCategories"
        :key="category.id"
        :category="category"
        @edit="handleEditCategory"
        @delete="handleDeleteCategory"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredCategories.length === 0" class="empty-state">
      <p>No categories found matching your search.</p>
    </div>

    <!-- Add/Edit Category Modal -->
    <AddCategoryModal
      v-if="showAddCategory"
      :category="editingCategory"
      @save="handleSaveCategory"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CategoryCard from '../components/ CategoryCard .vue'
import AddCategoryModal from '../components/AddCategoryModal .vue';

// Mock data - replace with actual API calls
const categories = ref([
  {
    id: 1,
    name: 'Audio Equipment',
    description: 'Headphones, speakers, microphones and audio accessories',
    productCount: 2,
    createdDate: '2024-01-01'
  },
  {
    id: 2,
    name: 'Mobile Devices',
    description: 'Smartphones, tablets and mobile accessories',
    productCount: 3,
    createdDate: '2024-01-01'
  },
  {
    id: 3,
    name: 'Computers',
    description: 'Laptops, desktops and computer components',
    productCount: 1,
    createdDate: '2024-01-01'
  },
  {
    id: 4,
    name: 'Peripherals',
    description: 'Keyboards, mice, monitors and other computer peripherals',
    productCount: 2,
    createdDate: '2024-01-01'
  }
]);

const searchQuery = ref('');
const showAddCategory = ref(false);
const editingCategory = ref(null);

// Computed properties
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;

  const query = searchQuery.value.toLowerCase();
  return categories.value.filter(category =>
    category.name.toLowerCase().includes(query) ||
    category.description.toLowerCase().includes(query)
  );
});

const totalCategories = computed(() => categories.value.length);
const totalProducts = computed(() =>
  categories.value.reduce((sum, category) => sum + category.productCount, 0)
);
const categoriesWithProducts = computed(() =>
  categories.value.filter(category => category.productCount > 0).length
);
const emptyCategories = computed(() =>
  categories.value.filter(category => category.productCount === 0).length
);

// Methods
const handleEditCategory = (category) => {
  editingCategory.value = { ...category };
  showAddCategory.value = true;
};

const handleDeleteCategory = (categoryId) => {
  if (confirm('Are you sure you want to delete this category?')) {
    categories.value = categories.value.filter(cat => cat.id !== categoryId);
  }
};

const handleSaveCategory = (categoryData) => {
  if (categoryData.id) {
    // Update existing category
    const index = categories.value.findIndex(cat => cat.id === categoryData.id);
    if (index !== -1) {
      categories.value[index] = categoryData;
    }
  } else {
    // Add new category
    const newCategory = {
      ...categoryData,
      id: Math.max(...categories.value.map(cat => cat.id)) + 1,
      createdDate: new Date().toISOString().split('T')[0]
    };
    categories.value.push(newCategory);
  }
  closeModal();
};

const closeModal = () => {
  showAddCategory.value = false;
  editingCategory.value = null;
};

onMounted(() => {
  // Fetch categories from API in real implementation
});
</script>

<style scoped>
.category-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.header-actions {
  flex-shrink: 0;
}

.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.controls-section {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-style: italic;
}
</style>
