const express = require("express");
const router = express.Router();
const activityController = require("../controller/activity.controller");
const reportSales = require("../controller/SalesReport.controller");
// 🔐 Middleware pour vérifier l’entreprise active (comme pour les produits)
const getActiveEntreprise = require("../middleware/activeEntreprise");
router.use(getActiveEntreprise);

// 📜 Récupérer toutes les activités
router.get("/", activityController.getAllActivities);
router.get("/reports/daily-sales", reportSales.getDailySalesReport);

module.exports = router;
