// routes/invoiceRoutes.js
const express = require("express");
const router = express.Router();
const { 
  createInvoiceController,
  getInvoicesController,
  getInvoiceByIdController
} = require("../controller/facture");
const getActiveEntreprise = require('../middleware/activeEntreprise');

router.post("/", getActiveEntreprise,createInvoiceController);     // Créer une facture
router.get("/",getActiveEntreprise, getInvoicesController);        // Récupérer toutes les factures
router.get("/:id", getActiveEntreprise, getInvoiceByIdController);  // Récupérer une facture spécifique

module.exports = router;
