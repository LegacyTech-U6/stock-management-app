const { pool } = require("../config/db");
const {
  createSale,
  updateProductQuantity,
  getOneProduct,
} = require("../models/dbConfig");

// --- Facture ---

// Créer une facture et ses lignes
async function createInvoice(
  client_id,
  items = [],
  reduction = 0,
  reduction_type,
  notes,
  mode_paiement = "espece",
  date_of_creation,
  status = "en_attente",
  date_echeance,
  tva = 0,
  entrepriseId // <-- ajouter entreprise active
) {
  try {
    console.log("🚀 Starting createInvoice");

    // 1. Calcul total hors réduction
    let total_hors_reduction = 0;
    for (const item of items) {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.selling_price) || 0;
      total_hors_reduction += qty * price;
    }
    const total =
      total_hors_reduction - (Number(reduction) || 0) + (Number(tva) || 0);

    // 2. Insérer dans Factures
    const [factureResult] = await pool.query(
      `INSERT INTO Factures (
        client_id,
        entreprise_id,       -- <-- ajout entreprise
        total_hors_reduction,
        date_of_creation,
        date_echeance,
        mode_paiement,
        reduction_type,
        reduction,
        tva,
        total,
        status,
        notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        client_id,
        entrepriseId,        // <-- ici
        total_hors_reduction,
        date_of_creation,
        date_echeance,
        mode_paiement,
        reduction_type,
        reduction,
        tva,
        total,
        status,
        notes,
      ]
    );
    const factureId = factureResult.insertId;

    // 3. Insérer les lignes dans facture_items
    for (const item of items) {
      await pool.query(
        `INSERT INTO FactureItems (
          facture_id,
          product_id,
          quantity,
          unit_price,
          tva,
          discount
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          factureId,
          item.id,
          item.quantity,
          item.selling_price,
          item.vat || 0,
          item.discount || 0,
        ]
      );

      // Mettre à jour stock
      const productRow = await getOneProduct(item.id, entrepriseId);
      if (!productRow) throw new Error("Produit introuvable");

      const newQuantity = productRow.quantity - item.quantity;
      await updateProductQuantity(item.id, newQuantity, entrepriseId);

      // Créer la vente
      const totalPrice = item.selling_price * item.quantity;
      await createSale(item.id, item.quantity, totalPrice, entrepriseId);
    }

    return factureId;
  } catch (error) {
    console.error("❌ Error in createInvoice:", error);
    throw error;
  }
}

// ✅ Récupérer toutes les factures d'une entreprise avec tous les champs + nom du client + items
async function getAllInvoices(entrepriseId) {
  // 1️⃣ Get all invoice fields + client name
  const [factures] = await pool.query(
    `
    SELECT 
      f.*,               -- all fields from Factures
      c.client_name      -- client name from Clients
    FROM Factures f
    JOIN Client c ON f.client_id = c.id
    WHERE f.entreprise_id = ?
    ORDER BY f.id DESC
    `,
    [entrepriseId]
  );

  // 2️⃣ For each invoice, get related items
  for (const facture of factures) {
    const [items] = await pool.query(
      `SELECT * FROM FactureItems WHERE facture_id = ?`,
      [facture.id]
    );
    facture.items = items;
  }

  return factures;
}


// Récupérer une facture par ID et entreprise
async function getInvoiceById(id, entrepriseId) {
  const [factureRows] = await pool.query(
    `SELECT * FROM Factures WHERE id = ? AND entreprise_id = ?`,
    [id, entrepriseId]
  );
  if (factureRows.length === 0) return null;

  const [items] = await pool.query(
    `SELECT * FROM FactureItems WHERE facture_id = ? AND entreprise_id = ?`,
    [id, entrepriseId]
  );
  return { ...factureRows[0], items };
}

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
};
