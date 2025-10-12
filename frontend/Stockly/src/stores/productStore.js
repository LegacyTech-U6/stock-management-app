import { defineStore } from 'pinia'
import {
  getProduct,
  getOneProduct,
  updateProduct,
  createProduct,
  OutOfStock,
  LowStock,
  addProductStock,
} from '@/service/api'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    selectedProduct: null,
    productForm: {
      Prod_name: '',
      quantity: '',
      cost_price: '',
      selling_price: '',
      category_id: '',
      Prod_Description: '',
      code_bar: '',
      date_of_arrival: '',
      supplier: '',
      Prod_image: null,
      min_stock_level: '',
      max_stock_level: '',
    },
    finishedProducts: null,
    lowProducts: null,
    loading: false,
    error: null,
    isFormOpen: false,
    isDetailsOpen: false,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        this.products = await getProduct()
        this.error = null
        console.log(this.products)
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async fetchProductById(id) {
      this.loading = true
      try {
        this.selectedProduct = await getOneProduct(id)
        this.error = null
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async addProduct(productData) {
      this.loading = true
      this.error = null
      console.log('Data received in the store:', productData)
      try {
        console.log('Data received in the store:', productData)
        await createProduct(productData)
      } catch (error) {
        this.error = error.message
        console.error("Erreur lors de l'ajout du produit:", error)
      } finally {
        this.loading = false
      }
    },
    async updateProduct(productId, productData) {
      this.loading = true
      this.error = null
      try {
        await updateProduct(productId, productData)
      } catch (error) {
        this.error = error.message
        console.error('Erreur lors de la mise à jour du produit:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchFinishedProducts() {
      this.loading = true
      try {
        this.finishedProducts = (await OutOfStock()) || 0
        this.error = null
        console.log(this.finishedProducts)
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async fetchLowStockProducts() {
      this.loading = true
      try {
        const data = await LowStock()
        this.lowProducts = Array.isArray(data) ? data : [] // ✅ ensure always an array
        this.error = null
        console.log('✅ Low products loaded:', this.lowProducts)
      } catch (err) {
        this.error = err
        this.lowProducts = [] // ✅ keep it consistent
      } finally {
        this.loading = false
      }
    },
    async addStockLevel(productId, quantityAdd) {
      this.loading = true
      try {
        console.log('====================================');
        console.log(productId, ",",quantityAdd);
        console.log('====================================');
        await addProductStock(productId, quantityAdd)
        this.error = null
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
  },
})
