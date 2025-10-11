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
  getRevenueByCategory,
  getProductDistributionByCategory

} = require("../../models/statistics/stats");

/**
 * ============================================================
 * 📊 STATISTICS CONTROLLER (Multi-Enterprise / User-Wide)
 * ------------------------------------------------------------
 * Ce controller fournit toutes les statistiques et KPIs
 * pour les produits, catégories, revenus, profits et tendances.
 * Les stats peuvent être :
 *  - spécifiques à une entreprise (req?.enterpriseI)
 *  - globales pour un utilisateur (req.user.id)
 * ============================================================
 */
module.exports = {

  /**
   * 🔹 productSales
   * ------------------------------------------------------------
   * Total de ventes par produit
   * GET /api/stats/product-sales
   */
  productSales: async (req, res) => {
    try {
      const stats = await getProductSalesStats({
        enterpriseId: req?.enterpriseId,
        userId: req.user?.id
      });
      console.log('====================================');
      console.log(req?.enterpriseI);
      console.log(req.user.id);
      console.log('====================================');

      if (!stats.length) return res.json({ message: "No sales data available" });

      res.json({ stats });
    } catch (error) {
      console.error("Erreur productSales:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getSalesReport
   * ------------------------------------------------------------
   * Ventes agrégées par produit pour une période
   * GET /api/stats/sales-report?period=day|week|month
   */
  getSalesReport: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const report = await getSalesReportByPeriod(period, {
        enterpriseId: req?.enterpriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.enterpriseId);
      console.log(req.user?.id);
      console.log('====================================');

      if (!report.length) return res.json({ message: "No sales data for this period" });

      res.json({ period, report });
    } catch (error) {
      console.error("Erreur getSalesReport:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getBestCategory
   * ------------------------------------------------------------
   * Catégorie la plus vendue
   * GET /api/stats/best-category
   */
  getBestCategory: async (req, res) => {
    try {
      const bestCategory = await getBestCategory({
        enterpriseId: req?.enterpriseId,
        userId: req.user?.id
      });
  console.log('====================================');
      console.log(req?.enterpriseId);
      console.log(req.user?.id);

      console.log('====================================');
      if (!bestCategory.length) return res.json({ message: "No sales data available" });

      res.json({ bestCategory });
    } catch (error) {
      console.error("Erreur getBestCategory:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getBestByCategory
   * ------------------------------------------------------------
   * Meilleurs produits d'une catégorie
   * GET /api/stats/best-by-category/:id
   */
  getBestByCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const bestProducts = await bestProductByCategory(categoryId, {
        enterpriseId: req?.enterpriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.enterpriseId);
      console.log(req.user?.id);

      console.log('====================================');

      if (!bestProducts.length) return res.json({ message: "No products found for this category" });

      res.json({ bestProducts });
    } catch (error) {
      console.error("Erreur getBestByCategory:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getBestSellingProduct
   * ------------------------------------------------------------
   * Meilleur produit pour une période
   * GET /api/stats/best-selling?period=day|week|month
   */
  getBestSellingProduct: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const product = await getBestSellingProduct(period, {
        enterpriseId: req?.enterpriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.enterpriseId);
      console.log(req.user?.id);

      console.log('====================================');

      if (!product) return res.json({ message: "No sales data available for this period" });

      res.json({ period, product });
    } catch (error) {
      console.error("Erreur getBestSellingProduct:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getRevenue
   * ------------------------------------------------------------
   * Chiffre d’affaires total pour une période
   * GET /api/stats/revenue?period=day|month|year
   */
  getRevenue: async (req, res) => {
    try {
      const period = req.query.period || "day";
      const revenue = await getRevenueByPeriod(period, {
        enterpriseId: req?.enterpriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.enterpriseId);
      console.log(req.user?.id);

      console.log('====================================');

      res.json({ period, revenue });
    } catch (error) {
      console.error("Erreur getRevenue:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getProfit
   * ------------------------------------------------------------
   * Profit total pour une période
   * GET /api/stats/profit?period=day|month
   */
  getProfit: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const profit = await getProfitByPeriod(period, {
        enterpriseId: req?.entrepriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.entrepriseId);
      console.log(req.user?.id);

      console.log('====================================');

      res.json({ period, profit });
    } catch (error) {
      console.error("Erreur getProfit:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 compareSales
   * ------------------------------------------------------------
   * Comparaison des ventes actuelles vs période précédente
   * GET /api/stats/compare-sales?period=day|month
   */
  compareSales: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const comparison = await compareSales(period, {
        enterpriseId: req?.entrepriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.entrepriseId);
      console.log(req.user?.id);

      console.log('====================================');

      res.json({ period, ...comparison });
    } catch (error) {
      console.error("Erreur compareSales:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getQuarterlySales
   * ------------------------------------------------------------
   * Ventes par trimestre
   * GET /api/stats/quarterly-sales
   */
  getQuarterlySales: async (req, res) => {
    try {
      const quarters = await getQuarterlySales({
        enterpriseId: req?.entrepriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.entrepriseId);
      console.log(req.user?.id);

      console.log('====================================');

      res.json({ quarters });
    } catch (error) {
      console.error("Erreur getQuarterlySales:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getSalesTrend
   * ------------------------------------------------------------
   * Tendances des ventes pour graphique
   * GET /api/stats/sales-trend?period=month|year
   */
  getSalesTrend: async (req, res) => {
    try {
      const period = req.query.period || "month";
      const trend = await getSalesTrend(period, {
        enterpriseId: req?.entrepriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.entrepriseId);
      console.log(req.user?.id);

      console.log('====================================');

      res.json({ period, trend });
    } catch (error) {
      console.error("Erreur getSalesTrend:", error);
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * 🔹 getRevenueByCategory
   * ------------------------------------------------------------
   * Chiffre d’affaires par catégorie
   * GET /api/stats/revenue-by-category
   */
  getRevenueByCategory: async (req, res) => {
    try {
      const data = await getRevenueByCategory({
        enterpriseId: req?.entrepriseId,
        userId: req.user?.id
      });
        console.log('====================================');
      console.log(req?.entrepriseId);
      console.log(req.user?.id);

      console.log('====================================');

      res.json({ data });
    } catch (error) {
      console.error("Erreur getRevenueByCategory:", error);
      res.status(500).json({ error: error.message });
    }
  },
  getProductDistributionByCategory: async (req, res) => {
  try {
    const entrepriseId = req?.entrepriseId

    if (!entrepriseId) {
      return res.status(400).json({ error: "Entreprise non spécifiée" })
    }

    const rows = await getProductDistributionByCategory(entrepriseId)

    res.status(200).json(rows)
  } catch (error) {
    console.error("❌ Erreur dans getProductDistributionByCategory:", error)
    res.status(500).json({ error: "Erreur serveur lors du calcul des statistiques" })
  }
}

};
