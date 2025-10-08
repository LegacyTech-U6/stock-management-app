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
    console.log("🚀 Starting createInvoice");
    console.log("Client ID:", client_id);
    console.log("Items:", items);
    console.log("Reduction:", reduction, "Type:", reduction_type);
    console.log("Mode de paiement:", mode_paiement, "Notes:", notes);

    // 1. Calcul total hors réduction
    let total_hors_reduction = 0;
    for (const item of items) {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.selling_price) || 0;
      total_hors_reduction += qty * price;
      console.log(
        `Item: ${item.id} | Qty: ${qty} | Price: ${price} | Total so far: ${total_hors_reduction}`
      );
    }
    const total =
      total_hors_reduction - (Number(reduction) || 0) + (Number(tva) || 0);
    console.log(
      "Total hors réduction:",
      total_hors_reduction,
      "TVA:",
      tva,
      "Total final:",
      total
    );

    // 2. Insérer dans Factures
    console.log("Inserting invoice into Factures...");
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
    console.log("Invoice created with ID:", factureId);

    // 3. Insérer les lignes dans facture_items
    for (const item of items) {
      console.log(
        `Adding item to FactureItems: Product ID ${item.id}, Qty ${item.quantity}`
      );
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
      console.log(`Item ${item.id} inserted into FactureItems`);

      // Mettre à jour stock
      console.log(`Fetching product ${item.id} for stock update...`);
      const productRow = await getOneProduct(item.id); // productRow est maintenant un objet ou undefined

      if (!productRow) throw new Error("Produit introuvable");

      const newQuantity = productRow.quantity - item.quantity;
      console.log(
        `Old stock: ${productRow.quantity} | Ordered: ${item.quantity} | New stock: ${newQuantity}`
      );

      if (await updateProductQuantity(item.id, newQuantity)) {
        console.log("✅ Quantity modified successfully", item.id, newQuantity);
      } else {
        console.warn("⚠️ Quantity modification failed for product", item.id);
      }

      // Créer la vente
      const totalPrice = item.selling_price * item.quantity;
      console.log(
        `Creating sale for product ${item.id} | Total price: ${totalPrice}`
      );
      try {
        await createSale(item.id, item.quantity, totalPrice);
        console.log(`✅ Sale created for product ${item.id}`);
      } catch (error) {
        console.error(`❌ Error creating sale for product ${item.id}:`, error);
        throw error;
      }
    }

    console.log("✅ Invoice creation complete:", factureId);
    return factureId;
  } catch (error) {
    console.error("❌ Error in createInvoice:", error);
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
