// models/categoryModel.js
const pool = require('../config/db');

async function getAllCategories() {
  const [rows] = await pool.query(`SELECT * FROM Category ORDER BY name`);
  return rows;
}

async function getCategoryById(id) {
  const [rows] = await pool.query(`SELECT * FROM Category WHERE id = ?`, [id]);
  return rows[0] || null;
}

async function createCategory(name, description = null) {
  const [result] = await pool.query(
    `INSERT INTO Category (name, description) VALUES (?, ?)`,
    [name, description]
  );
  return result.insertId;
}

async function updateCategory(id, name, description = null) {
  const [result] = await pool.query(
    `UPDATE Category SET name = ?, description = ? WHERE id = ?`,
    [name, description, id]
  );
  return result.affectedRows;
}

async function deleteCategory(id) {
  const [result] = await pool.query(`DELETE FROM Category WHERE id = ?`, [id]);
  return result.affectedRows;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
