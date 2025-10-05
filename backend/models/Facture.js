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
  tva = 0
) {
  try {
    // 1. Calcul total hors réduction
    let total_hors_reduction = 0;
    for (const item of items) {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.selling_price) || 0;
      total_hors_reduction += qty * price;
    }
    const total =
      total_hors_reduction - (Number(reduction) || 0) + (Number(tva) || 0);

    // 3. Insérer dans Factures
    const [factureResult] = await pool.query(
      `INSERT INTO Factures (client_id, total_hors_reduction, date_of_creation, date_echeance, mode_paiement, reduction_type, reduction, tva, total, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        client_id,
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

    // 4. Insérer les lignes dans facture_items
    for (const item of items) {
      await pool.query(
        `INSERT INTO FactureItems (facture_id, product_id, quantity, unit_price, tva, discount)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          factureId,
          item.id,
          item.quantity,
          item.selling_price,
          item.vat || 0,
          item.discount || 0,
        ]
      );

      // Mettre à jour stock comme dans buyProduct
      const productRows = await getOneProduct(item.id);
      if (productRows.length === 0) throw new Error("Produit introuvable");
      const newQuantity = productRows[0].quantity - item.quantity;
      await updateProductQuantity(item.product_id, newQuantity);

      // Créer la vente
      const totalPrice = item.selling_price * item.quantity;
      try {
        await createSale(item.id, item.quantity, totalPrice);
      } catch (error) {
        throw error;
        
      }
      
    }

    return factureId;
  } catch (error) {
    throw error;
  }
}

// Récupérer toutes les factures
async function getAllInvoices() {
  const [factures] = await pool.query(
    `SELECT * FROM Factures ORDER BY id DESC`
  );
  for (const facture of factures) {
    const [items] = await pool.query(
      `SELECT * FROM FactureItems WHERE facture_id = ?`,
      [facture.id]
    );
    facture.items = items;
  }
  return factures;
}

// Récupérer une facture par ID avec ses lignes
async function getInvoiceById(id) {
  const [factureRows] = await pool.query(
    `SELECT * FROM Factures WHERE id = ?`,
    [id]
  );
  if (factureRows.length === 0) return null;

  const [items] = await pool.query(
    `SELECT * FROM facture_items WHERE facture_id = ?`,
    [id]
  );
  return { ...factureRows[0], items };
}

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
};
