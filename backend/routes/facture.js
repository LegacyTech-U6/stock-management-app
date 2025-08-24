// routes/invoiceRoutes.js
const express = require("express");
const router = express.Router();
const { 
  createInvoiceController,
  getInvoicesController,
  getInvoiceByIdController
} = require("../controller/facture");

router.post("/", createInvoiceController);     // Créer une facture
router.get("/", getInvoicesController);        // Récupérer toutes les factures
router.get("/:id", getInvoiceByIdController);  // Récupérer une facture spécifique

module.exports = router;
