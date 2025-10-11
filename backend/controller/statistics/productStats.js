const {
  getProductSalesStats,
  getSalesReportByPeriod,
  getBestCategory,
  bestProductByCategory,
  getBestSellingProduct,
  getRevenueByPeriod,
  getProfitByPeriod,
  compareSales,
  getQuarterlySales,
  getSalesTrend,
} = require("../../models/statistics/stats");

/**
 * ============================================================
 * 📊 STATISTICS CONTROLLER
 * ------------------------------------------------------------
 * Provides API endpoints to fetch analytics and KPI data
 * for products, categories, revenue, profit, and trends.
 * ============================================================
 */
module.exports = {
  /**
   * 🔹 productSales
   * ------------------------------------------------------------
   * Returns the total quantity sold for each product overall.
   * GET /api/stats/product-sales
   */
  productSales: async (req, res) => {
    try {
      const stats = await getProductSalesStats();

      if (stats.length === 0) {
        return res.json({ message: "No sales data available" });
      }

      res.json({ stats });
    } catch (error) {
      console.error("Erreur getProductSalesStats:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getSalesReport
   * ------------------------------------------------------------
   * Returns sales report aggregated by product for a given period:
   * - day → today
   * - week → this week
   * - month → this month (default)
   * GET /api/stats/sales-report?period=day|week|month
   */
  getSalesReport: async (req, res) => {
    try {
      const period = req.query.period || "month"; // default: month
      const report = await getSalesReportByPeriod(period);

      if (report.length === 0) {
        return res.json({ message: "No sales data for this period" });
      }

      res.json({ period, report });
    } catch (error) {
      console.error("Erreur getSalesReport:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getBestCategory
   * ------------------------------------------------------------
   * Returns the best-selling category based on total quantity sold.
   * GET /api/stats/best-category
   */
  getBestCategory: async (req, res) => {
    try {
      const bestCategory = await getBestCategory();

      if (bestCategory.length === 0) {
        return res.json({ message: "No sales data available" });
      }

      res.json({ bestCategory });
    } catch (error) {
      console.error("Erreur getBestCategory:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getBestByCategory
   * ------------------------------------------------------------
   * Returns the top-selling products for a specific category.
   * GET /api/stats/best-by-category/:id
   */
  getBestByCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const bestProducts = await bestProductByCategory(categoryId);

      if (bestProducts.length === 0) {
        return res.json({ message: "No products found for this category" });
      }

      res.json({ bestProducts });
    } catch (error) {
      console.error("Erreur getBestByCategory:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getBestSellingProduct
   * ------------------------------------------------------------
   * Returns the single top-selling product for a given period.
   * GET /api/stats/best-selling?period=day|week|month
   */
  getBestSellingProduct: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const product = await getBestSellingProduct(period);

      if (!product) {
        return res.json({ message: "No sales data available for this period" });
      }

      res.json({ period, product });
    } catch (error) {
      console.error("Erreur getBestSellingProduct:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getRevenue
   * ------------------------------------------------------------
   * Returns the total revenue for a given period (day, month, year).
   * GET /api/stats/revenue?period=day|month|year
   */
  getRevenue: async (req, res) => {
    try {
      const period = req.query.period || "day";
      const revenue = await getRevenueByPeriod(period);

      res.json({ period, revenue });
    } catch (error) {
      console.error("Erreur getRevenue:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getProfit
   * ------------------------------------------------------------
   * Returns the total profit for a given period (day, month).
   * Profit = sum((unit_price - cost_price) * quantity_sold)
   * GET /api/stats/profit?period=month
   */
  getProfit: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const profit = await getProfitByPeriod(period);

      res.json({ period, profit });
    } catch (error) {
      console.error("Erreur getProfit:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 compareSales
   * ------------------------------------------------------------
   * Compares revenue for current period vs previous period.
   * Returns current total, previous total, and growth %.
   * GET /api/stats/compare-sales?period=day|month
   */
  compareSales: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const comparison = await compareSales(period);

      res.json({ period, ...comparison });
    } catch (error) {
      console.error("Erreur compareSales:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getQuarterlySales
   * ------------------------------------------------------------
   * Returns total sales grouped by quarter and year.
   * Useful for seasonal and yearly trend analysis.
   * GET /api/stats/quarterly-sales
   */
  getQuarterlySales: async (req, res) => {
    try {
      const quarters = await getQuarterlySales();

      res.json({ quarters });
    } catch (error) {
      console.error("Erreur getQuarterlySales:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getSalesTrend
   * ------------------------------------------------------------
   * Returns sales aggregated by day or month for charting.
   * GET /api/stats/sales-trend?period=month|year
   */
  getSalesTrend: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const trend = await getSalesTrend(period);

      res.json({ period, trend });
    } catch (error) {
      console.error("Erreur getSalesTrend:", error);
      res.status(500).json({ error: error.message });
    }
  },
};
