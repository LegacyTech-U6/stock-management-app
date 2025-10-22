import { defineStore } from 'pinia'
import {
  getCategory,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory
} from '../service/api'
export const useCategoryStore = defineStore('Category', {
  state: () => ({
    categories: [],
    totalCategory: null,
     category: null,
    loading: false,
    error: null,
    submitLoading: false,
    submitError: null,
    products:[]
  }),
  actions: {
    async Create(categoryData) {
      this.submitLoading = true
      this.error = null
      try {
        await createCategory(categoryData)
      } catch (error) {
        this.error = error.message
        console.error("erreur lors de l'ajout de la category")
      }
    },
  async fetchCategory() {
  this.loading = true
  this.error = null
  try {
    const category = await getCategory()
    console.log("category loged from store", category)
    this.categories = category.data
    this.totalCategory = category.count

    this.loading = false
    return this.categories // ✅ return the data
  } catch (error) {
    this.error = error
    this.loading = false
    console.error('Erreur lors de la récupération des catégories', error)
    return [] // return empty array in case of error
  }
},
    async fetchOneCategory(id) {
      this.loading = true
      this.error = null
      try {
        const response = await getOneCategory(id)
        console.log(response)
        this.category = response
        console.log("category loged from store", this.category)
        this.error = null
      } catch (error) {
        this.error = error
        console.error('erreur lors de la recuperation de la category')
      } finally {
        this.loading = false
      }
    },
    async Update(CategoryId, categoryData) {
      this.submitLoading = true
      this.error = null
      try {
        await updateCategory(CategoryId, categoryData)
      } catch (error) {
        this.error = error.message
        console.error('erreur lors de la modification de la category')
      } finally {
        this.submitLoading = false
      }
    },
    async Delete(CategoryId) {
      this.submitLoading = true
      this.error = null
      try {
        await deleteCategory(CategoryId)
      } catch (error) {
        this.error = error.message
        console.error('erreur lors de la suppression de la category')
      } finally {
        this.submitLoading = false
      }
    },
    async Product(CategoryId){
      this.loading = true
      this.error = null
      try {
        const response = await getProductsByCategory(CategoryId)
        console.log(response)
        this.products = response
        console.log("products loged from store", this.products)
        this.error = null
      } catch (error) {
        this.error = error
        console.error('erreur lors de la recuperation de la category')
      } finally {
        this.loading = false
      }
    }

  },
})
