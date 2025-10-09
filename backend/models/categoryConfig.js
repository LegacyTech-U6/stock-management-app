// models/categoryModel.js
const { pool } = require("../config/db");

// --- Récupérer toutes les catégories de l'entreprise active ---
async function getAllCategories(entreprise_id) {
  console.log("Entreprise ID passé :", entreprise_id);

  // const [rows] = await pool.query(`
  //   SELECT 
  //     c.id, 
  //     c.name, 
  //     c.description,
  //     COUNT(p.id) AS productCount
  //   FROM Category c
  //   LEFT JOIN Product p ON p.category_id = c.id
  //   WHERE c.entreprise_id = ?
  //   GROUP BY c.id
  //   ORDER BY c.name
  // `, [entreprise_id]);

  const [rows] = await pool.query("SELECT * FROM Category WHERE entreprise_id = ?",
    [entreprise_id]
  );
  console.log(rows);
  return rows;
}

// --- Récupérer une catégorie spécifique ---
async function getCategoryById(id, entreprise_id) {
  const [rows] = await pool.query(`
    SELECT 
      c.id, 
      c.name, 
      c.description,
      COUNT(p.id) AS productCount
    FROM Category c
    LEFT JOIN Product p ON p.category_id = c.id
    WHERE c.id = ? AND c.entreprise_id = ?
    GROUP BY c.id, c.name, c.description
    ORDER BY c.name
  `, [id, entreprise_id]);
  return rows[0] || null;
}

// --- Créer une catégorie liée à l'entreprise ---
async function createCategory(name, entreprise_id, description = null) {
  const [result] = await pool.query(
    `INSERT INTO Category (name, description, entreprise_id) VALUES (?, ?, ?)`,
    [name, description, entreprise_id]
  );
  return result.insertId;
}

// --- Mettre à jour une catégorie ---
async function updateCategory(id, name, entreprise_id, description = null) {
  const [result] = await pool.query(
    `UPDATE Category SET name = ?, description = ? WHERE id = ? AND entreprise_id = ?`,
    [name, description, id, entreprise_id]
  );
  return result.affectedRows;
}

// --- Supprimer une catégorie ---
async function deleteCategory(id, entreprise_id) {
  const [result] = await pool.query(
    `DELETE FROM Category WHERE id = ? AND entreprise_id = ?`,
    [id, entreprise_id]
  );
  return result.affectedRows;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
