const { pool } = require("../config/db");

async function getProduct() {
  const results = await pool.query("SELECT * FROM Product");
  const row = results[0];

  return row;
}
async function getOneProduct(id) {
  const result = await pool.query(`SELECT * FROM Product WHERE id = ?`, [id]);
  const rows = result[0];
  return rows;
}
async function updateProductQuantity(id, newQuantity) {
  const [result] = await pool.query(
    `UPDATE Product SET quantity = ? WHERE id = ?`,
    [newQuantity, id]
  );
  return result; // contains affectedRows, etc.
}
async function createSale(productId, quantitySold, totalPrice) {
  const [result] = await pool.query(
    `INSERT INTO Sales (product_id, quantity_sold, total_price) VALUES (?, ?, ?)`,
    [productId, quantitySold, totalPrice]
  );
  return result;
}
async function createProduct(
  Prod_name,
  quantity,
  cost_price,
  selling_price,
  category_id, // <-- change here
  Prod_Description,
  code_bar,
  date_of_arrival, // <-- fix spelling
  supplier,
  Prod_image
) {
  const [results] = await pool.query(
    `INSERT INTO Product (
      Prod_name,
      quantity,
      cost_price,
      selling_price,
      category_id,
      Prod_Description,
      code_bar,
      date_of_arrival,
      supplier,
      Prod_image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      Prod_name,
      quantity,
      cost_price,
      selling_price,
      category_id, // <-- change here
      Prod_Description,
      code_bar,
      date_of_arrival, // <-- fix spelling
      supplier,
      Prod_image,
    ]
  );
  return getProduct();
}
async function updateProduct(
  id,
  prod_name,
  quantity,
  cost_price,
  selling_price,
  category,
  Prod_Description,
  code_bar,
  date_of_arival,
  supplier,
  prod_image
) {
  const [result] = await pool.query(
    `UPDATE Product SET
      Prod_name = ?,
      quantity = ?,
      cost_price = ?,
      selling_price = ?,
      category_id = ?,
      Prod_Description = ?,
      code_bar = ?,
      date_of_arrival = ?,
      supplier = ?,
      Prod_image = ?
    WHERE id = ?`,
    [
      prod_name,
      quantity,
      cost_price,
      selling_price,
      category,
      Prod_Description,
      code_bar,
      date_of_arival,
      supplier,
      prod_image,
      id,
    ]
  );
  // Optionally, return true/false or the updated product
  return result.affectedRows > 0;
}
async function deleteProduct(id) {
  const result = await pool.query(`DELETE FROM Product WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}

async function getProductsByCategoryId(categoryId) {
  const [rows] = await pool.query(
    `SELECT * FROM Product WHERE category_id = ? ORDER BY Prod_name`,
    [categoryId]
  );
  return rows;
}

module.exports = {
  getProduct,
  createProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  updateProductQuantity,
  createSale,
  getProductsByCategoryId,
};
