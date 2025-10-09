// controllers/invoiceController.js
const { createInvoice, getAllInvoices, getInvoiceById } = require("../models/Facture");

// Créer une facture
async function createInvoiceController(req, res) {
  try {
    const { client_id, items, reduction = 0, reduction_type, tva = 0, notes, mode_paiement, date_of_creation, date_echeance, status } = req.body;

    // L'ID de l'entreprise vient du middleware
    const entreprise_id = req.entrepriseId; 
    if (!entreprise_id) {
      return res.status(400).json({ message: "Entreprise non définie" });
    }

    // Validation basique
    if (!client_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Client et items sont obligatoires" });
    }

    // Appel du model avec entreprise_id
    const factureId = await createInvoice(
      client_id,
      items,
      reduction,
      reduction_type,
      notes,
      mode_paiement,
      date_of_creation,
      status,
      date_echeance,
      tva,
      entreprise_id // <-- ajouté ici
    );

    res.status(201).json({ message: "Facture créée avec succès", factureId });
  } catch (error) {
    console.error("Erreur création facture:", error);
    res.status(500).json({ error: error.message });
  }
}

// Récupérer toutes les factures de l'entreprise active
async function getInvoicesController(req, res) {
  try {
    const entreprise_id = req.entrepriseId;
    if (!entreprise_id) {
      return res.status(400).json({ message: "Entreprise non définie" });
    }

    const factures = await getAllInvoices(entreprise_id); // filtre dans le model
    res.json(factures);
  } catch (error) {
    console.error("Erreur récupération factures:", error);
    res.status(500).json({ error: error.message });
  }
}

// Récupérer une facture par ID pour l'entreprise active
async function getInvoiceByIdController(req, res) {
  try {
    const entreprise_id = req.entrepriseId;
    const { id } = req.params;

    if (!entreprise_id) {
      return res.status(400).json({ message: "Entreprise non définie" });
    }

    const facture = await getInvoiceById(id, entreprise_id); // filtre dans le model
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
