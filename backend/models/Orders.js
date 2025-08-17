// On importe le pool de connexion à la base de données MySQL
const { pool } = require('../config/db');

/**
 * Crée une nouvelle commande dans la table Orders.
 * @param {number} product_id - L'ID du produit à commander
 * @param {number} supplier_id - L'ID du fournisseur
 * @param {number} quantity - Quantité à commander
 * @param {string} status - Statut de la commande (par défaut 'pending')
 * @returns {number} L'ID de la commande créée
 */
async function createOrder(product_id, supplier_id, quantity, status = 'pending') {
    // pool.query retourne un tableau [result, fields]
    const [result] = await pool.query(
        `INSERT INTO Orders (product_id, supplier_id, quantity, status) VALUES (?, ?, ?, ?)`,
        [product_id, supplier_id, quantity, status] // les ? sont remplacés par ces valeurs
    );

    // result.insertId contient l'ID généré automatiquement pour cette commande
    return result.insertId;
}

/**
 * Récupère toutes les commandes de la table Orders avec les infos produit et fournisseur.
 * @returns {Array} Liste des commandes avec détails produit et fournisseur
 */
async function getAllOrders() {
    const [rows] = await pool.query(
        `SELECT 
            o.id AS order_id,
            o.product_id,
            p.Prod_name AS product_name,
            o.supplier_id,
            s.supplier_name,
            s.email,
            s.whatsapp_number,
            s.preferred_channel,
            o.quantity,
            o.status,
            o.created_at,
            o.updated_at
        FROM Orders o
        JOIN Product p ON o.product_id = p.id
        JOIN supplier s ON o.supplier_id = s.id
        ORDER BY o.id DESC`
    );

    return rows;
}

/**
 * Récupère une commande spécifique par son ID
 * @param {number} id - ID de la commande
 * @returns {Object|null} Détails de la commande ou null si non trouvé
 */
async function getOrderById(id) {
    const [rows] = await pool.query(
        `SELECT 
            o.id AS order_id,
            o.product_id,
            p.Prod_name AS product_name,
            o.supplier_id,
            s.supplier_name,
            s.email,
            s.whatsapp_number,
            s.preferred_channel,
            o.quantity,
            o.status,
            o.created_at,
            o.updated_at
        FROM Orders o
        JOIN Product p ON o.product_id = p.id
        JOIN supplier s ON o.supplier_id = s.id
        WHERE o.id = ?`,
        [id]
    );

    // Retourne le premier élément si trouvé, sinon null
    return rows[0] || null;
}

/**
 * Met à jour le statut d'une commande
 * @param {number} id - ID de la commande
 * @param {string} status - Nouveau statut ('pending', 'sent', 'delivered')
 * @returns {boolean} true si la mise à jour a réussi, false sinon
 */
async function updateOrderStatus(id, status) {
    const [result] = await pool.query(
        `UPDATE Orders SET status = ? WHERE id = ?`,
        [status, id]
    );

    // affectedRows > 0 si une ligne a été modifiée
    return result.affectedRows > 0;
}

// On exporte toutes les fonctions pour pouvoir les utiliser ailleurs
module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};
