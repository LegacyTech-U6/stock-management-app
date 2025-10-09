// src/models/supplier.js
const { pool } = require("../config/db");

// --- Récupérer tous les fournisseurs de l’entreprise active ---
async function getAllSuppliers(entreprise_id) {
  const [rows] = await pool.query(
    `SELECT * FROM Supplier WHERE entreprise_id = ? ORDER BY supplier_name`,
    [entreprise_id]
  );
  return rows;
}

// --- Créer un fournisseur lié à l’entreprise active ---
async function createSupplier(
  supplier_name,
  supplier_address,
  phone_number,
  entreprise_id, // obligatoire
  email = null,
  whatsapp_number = null,
  preferred_channel = 'email'
) {
  const [result] = await pool.query(
    `INSERT INTO Supplier 
      (supplier_name, supplier_address, phone_number, email, whatsapp_number, preferred_channel, entreprise_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [supplier_name, supplier_address, phone_number, email, whatsapp_number, preferred_channel, entreprise_id]
  );
  return result.insertId;
}

// --- Récupérer un fournisseur par ID et entreprise ---
async function getOneSupplier(id, entreprise_id) {
  const [rows] = await pool.query(
    `SELECT * FROM Supplier WHERE id = ? AND entreprise_id = ?`,
    [id, entreprise_id]
  );
  return rows[0] || null;
}

// --- Mettre à jour un fournisseur ---
async function updateSupplier(
  id,
  supplier_name,
  supplier_address,
  phone_number,
  entreprise_id,
  email = null,
  whatsapp_number = null,
  preferred_channel = 'email'
) {
  const [result] = await pool.query(
    `UPDATE Supplier 
     SET supplier_name = ?, supplier_address = ?, phone_number = ?, email = ?, whatsapp_number = ?, preferred_channel = ?
     WHERE id = ? AND entreprise_id = ?`,
    [supplier_name, supplier_address, phone_number, email, whatsapp_number, preferred_channel, id, entreprise_id]
  );
  return result.affectedRows > 0;
}

// --- Supprimer un fournisseur ---
async function deleteSupplier(id, entreprise_id) {
  const [result] = await pool.query(
    `DELETE FROM Supplier WHERE id = ? AND entreprise_id = ?`,
    [id, entreprise_id]
  );
  return result.affectedRows > 0;
}

// --- Récupérer les produits d’un fournisseur (de l’entreprise active) ---
async function getProductsBySupplier(id, entreprise_id) {
  const [rows] = await pool.query(
    `SELECT * FROM Product WHERE supplier = ? AND entreprise_id = ? ORDER BY Prod_name`,
    [id, entreprise_id]
  );
  return rows;
}

module.exports = {
  getAllSuppliers,
  createSupplier,
  getOneSupplier,
  updateSupplier,
  deleteSupplier,
  getProductsBySupplier,
};
