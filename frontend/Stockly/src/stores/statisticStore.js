// stores/statistics.store.js
import { defineStore } from "pinia";
import {
  getProductSales,
  getSalesReport,
  getBestSellingProduct,
  getBestCategory,
  getBestByCategory,
  getRevenue,
  getProfit,
  compareSales,
  getQuarterlySales,
  getSalesTrend,
  getRevenueByCategory
} from "@/service/api";

export const useStatisticsStore = defineStore("statistics", {
  state: () => ({
    productSales: [],
    salesReport: [],
    bestSellingProduct: null,
    bestCategory: null,
    bestByCategory: {},
    revenue: 0,
    profit: 0,
    salesComparison: null,
    quarterlySales: [],
    salesTrend: [],
    loading: false,
    error: null,
  }),

  actions: {
    // 🔹 Fetch total product sales
    async fetchProductSales() {
      this.loading = true;
      try {
        this.productSales = await getProductSales();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Fetch sales report for a given period
    async fetchSalesReport(period = "month") {
      this.loading = true;
      try {
        const data = await getSalesReport(period);
        this.salesReport = data.report || [];
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Fetch the best-selling product for a given period
    async fetchBestSellingProduct(period = "month") {
      this.loading = true;
      try {
        this.bestSellingProduct = await getBestSellingProduct(period);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Fetch the best-selling category
    async fetchBestCategory() {
      this.loading = true;
      try {
        this.bestCategory = await getBestCategory();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Fetch best products by category
    async fetchBestByCategory(categoryId) {
      this.loading = true;
      try {
        const data = await getBestByCategory(categoryId);
        this.bestByCategory[categoryId] = data.bestProducts || [];
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Fetch revenue for a period
    async fetchRevenue(period = "day") {
      this.loading = true;
      try {
        const data = await getRevenue(period);
        this.revenue = data.revenue || 0;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Fetch profit for a period
    async fetchProfit(period = "month") {
      this.loading = true;
      try {
        const data = await getProfit(period);
        this.profit = data.profit || 0;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Compare sales with previous period
    async fetchCompareSales(period = "month") {
      this.loading = true;
      try {
        const data = await compareSales(period);
        this.salesComparison = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Fetch quarterly sales
    async fetchQuarterlySales() {
      this.loading = true;
      try {
        this.quarterlySales = await getQuarterlySales();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🔹 Fetch sales trend (for charting)
    async fetchSalesTrend(period = "month") {
      this.loading = true;
      try {
        const data = await getSalesTrend(period);
        this.salesTrend = data.trend || [];
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    //fetch revenue by category
     async fetchRevenueByCategory() {
      const data = await getRevenueByCategory();
      this.revenueByCategory = data;
    },
  },
});
