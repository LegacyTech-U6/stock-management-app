// models/categoryModel.js
//In this file we have the functions and database queries to manipulate the category table i.e

const { pool } = require("../config/db");
const Category = require("../controller/Category");

//function that return all the categories off the tables
async function getAllCategories() {
  const [rows] = await pool.query(`
    SELECT 
      c.id, 
      c.name, 
      c.description,
      COUNT(p.id) AS productCount
    FROM Category c
    LEFT JOIN Product p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.name
  `);
  return rows;
}

//function that gets a specific category from the table
async function getCategoryById(id) {
  const [rows] = await pool.query(
    `SELECT 
  c.id, 
  c.name, 
  c.description,
  COUNT(p.id) AS productCount
FROM Category c
LEFT JOIN Product p ON p.category_id = c.id
WHERE c.id = ?
GROUP BY c.id, c.name, c.description
ORDER BY c.name;
`,
    [id]
  );
  return rows[0] || null;
}

//function that create a category
async function createCategory(name, description = null) {
  const [result] = await pool.query(
    `INSERT INTO Category (name, description) VALUES (?, ?)`,
    [name, description]
  );
  return result.insertId;
}

//Function that update\modify a category
async function updateCategory(id, name, description = null) {
  const [result] = await pool.query(
    `UPDATE Category SET name = ?, description = ? WHERE id = ?`,
    [name, description, id]
  );
  return result.affectedRows;
}

//function to delete a Category
async function deleteCategory(id) {
  const [result] = await pool.query(`DELETE FROM Category WHERE id = ?`, [id]);
  return result.affectedRows;
}

//Here we export the functions to be able to import it from others files i.e the controller document in Category.js

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
