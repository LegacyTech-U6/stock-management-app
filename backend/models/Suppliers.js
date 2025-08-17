const { pool } = require("../config/db");

// --- Récupérer tous les fournisseurs ---
async function getAllsupplier() {
    const [rows] = await pool.query("SELECT * FROM supplier");
    return rows;
}

// --- Créer un fournisseur ---
async function createSupplier(supplier_name, supplier_address, phone_number, email = null, whatsapp_number = null, preferred_channel = 'email') {
    const [result] = await pool.query(
        `INSERT INTO supplier (supplier_name, supplier_address, phone_number, email, whatsapp_number, preferred_channel) VALUES (?, ?, ?, ?, ?, ?)`,
        [supplier_name, supplier_address, phone_number, email, whatsapp_number, preferred_channel]
    );
    return result.insertId;
}

// --- Récupérer un fournisseur par ID ---
async function getOnesupplier(id) {
    const [rows] = await pool.query(`SELECT * FROM supplier WHERE id = ?`, [id]);
    return rows[0] || null;
}

// --- Mettre à jour un fournisseur ---
async function updateSuppliers(id, supplier_name, supplier_address, phone_number, email = null, whatsapp_number = null, preferred_channel = 'email') {
    const [result] = await pool.query(
        `UPDATE supplier SET supplier_name = ?, supplier_address = ?, phone_number = ?, email = ?, whatsapp_number = ?, preferred_channel = ? WHERE id = ?`,
        [supplier_name, supplier_address, phone_number, email, whatsapp_number, preferred_channel, id]
    );
    return result.affectedRows > 0;
}

// --- Supprimer un fournisseur ---
async function deleteSupplier(id) {
    const [result] = await pool.query(`DELETE FROM supplier WHERE id = ?`, [id]);
    return result.affectedRows > 0;
}

// --- Récupérer les produits d’un fournisseur ---
async function getProductBySuppliers(id) {
    const [rows] = await pool.query(
        `SELECT * FROM Product WHERE supplier_id = ? ORDER BY Prod_name`,
        [id]
    );
    return rows;
}

module.exports = {
    getAllsupplier,
    getOnesupplier,
    updateSuppliers,
    deleteSupplier,
    getProductBySuppliers,
    createSupplier
};
