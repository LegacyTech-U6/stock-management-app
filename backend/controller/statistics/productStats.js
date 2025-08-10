const { getProductSalesStats,getSalesReportByPeriod } = require("../../models/statistics/stats");

module.exports = {
  productSales: async (req, res) => {
    try {
      const stats = await getProductSalesStats();

      if (stats.length === 0) {
        return res.json({ message: "No sales data available" });
      }

      // Optionnel : récupérer les infos produits aussi
      // Pour enrichir les résultats avec les noms, prix, etc.
      // Tu peux faire une jointure SQL ou faire plusieurs requêtes.

      res.json({ stats });
    } catch (error) {
      console.error("Erreur getProductSalesStats:", error);
      res.status(500).json({ error: error.message });
    }
  },
  getSalesReport: async (req, res) => {
    console.log("getSalesReport called with query:", req.query);
    try {
      const period = req.query.period || "month"; // day, week, month par défaut
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
};
