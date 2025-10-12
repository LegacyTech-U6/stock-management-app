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
  getRevenueByCategory,
  getProductDistributionByCategory
} from "@/service/api"

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
    revenueByCategory: [],
    profitTrend: [
      { month: "Jan", revenue: 1000, costs: 700, profit: 300 },
      { month: "Feb", revenue: 2000, costs: 1300, profit: 700 },
      { month: "Mar", revenue: 2500, costs: 1700, profit: 800 },
      { month: "Apr", revenue: 3000, costs: 2100, profit: 900 },
      { month: "May", revenue: 3500, costs: 2600, profit: 900 },
      { month: "Jun", revenue: 4000, costs: 3000, profit: 1000 },
    ],
    topProducts: []
  }),

  actions: {
    // 🔹 Fetch total product sales
async fetchProductSales(period = "month") {
  this.loading = true;
  try {
    // Pass the selected period to your backend API
    const data = await getProductSales({ period });

    // Store the returned stats
    this.topProducts = data.stats || [];

    console.log(this.topProducts);
  } catch (err) {
    this.error = err.message;
  } finally {
    this.loading = false;
  }
}

,

    // 🔹 Fetch sales report for a given period
    async fetchSalesReport(period = "month") {
      this.loading = true;
      try {
        const data = await getSalesReport(period);
        console.log('====================================');
        console.log(data);
        console.log('====================================');
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
        console.log('====================================');
        console.log(data);
        console.log('====================================');
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
     async fetchRevenueByCategory() {
      const data = await getRevenueByCategory();
      console.log(data);

      this.revenueByCategory = data.data;
    },
        async fetchTopProducts() {
      // Mock API call, replace with your backend API
      this.topProducts = [
        { id: 1, name: "Product A", quantity_sold: 120, revenue: 2400, profit: 900 },
        { id: 2, name: "Product B", quantity_sold: 90, revenue: 1800, profit: 700 },
        { id: 3, name: "Product C", quantity_sold: 75, revenue: 1500, profit: 600 },
        { id: 4, name: "Product D", quantity_sold: 60, revenue: 1200, profit: 400 },
        { id: 5, name: "Product E", quantity_sold: 50, revenue: 1000, profit: 350 },
      ];
    },
    async fetchProductDistributionByCategory() {
      try {
        const data = await getProductDistributionByCategory()
        this.productDistributionByCategory = data
      } catch (err) {
        console.error("Erreur distribution produits:", err)
      }
    },

  },
});
