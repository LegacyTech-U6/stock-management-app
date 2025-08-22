const { createInvoice, getAllInvoices, getInvoiceById } = require("../models/Facture");

// Créer une facture
async function createInvoiceController(req, res) {
  try {
    const { client_id, items, reduction, tva } = req.body;

    // Validation basique
    if (!client_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Client et items sont obligatoires" });
    }

    // Appel du model
    const factureId = await createInvoice(client_id, items, reduction || 0, tva || 0);

    res.status(201).json({ message: "Facture créée avec succès", factureId });
  } catch (error) {
    console.error("Erreur création facture:", error);
    res.status(500).json({ error: error.message });
  }
}

// Récupérer toutes les factures
async function getInvoicesController(req, res) {
  try {
    const factures = await getAllInvoices();
    res.json(factures);
  } catch (error) {
    console.error("Erreur récupération factures:", error);
    res.status(500).json({ error: error.message });
  }
}

// Récupérer une facture avec ses lignes
async function getInvoiceByIdController(req, res) {
  try {
    const { id } = req.params;
    const facture = await getInvoiceById(id);

    if (!facture) {
      return res.status(404).json({ message: "Facture introuvable" });
    }

    res.json(facture);
  } catch (error) {
    console.error("Erreur récupération facture par ID:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createInvoiceController,
  getInvoicesController,
  getInvoiceByIdController,
};
