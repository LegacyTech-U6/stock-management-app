import { defineStore } from 'pinia'

interface Product {
  id: number | string
  Prod_name: string
  quantity: number | string
  cost_price: number | string
  selling_price: number | string
  category_id: string
  Prod_Description: string
  code_bar: string
  date_of_arrival: string
  supplier: string
  image?: string
}

export const useProductStore = defineStore('product', {
  state: () => ({
    selectedProduct: null as Product | null,
  }),
  actions: {
    setSelectedProduct(product: Product) {
      this.selectedProduct = product
    },
  },
})
