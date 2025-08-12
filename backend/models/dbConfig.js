const { pool } = require("../config/db");

//In this file we deal with the functions and queries to manipule the product tables

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
async function getSales() {
  const [rows] = await pool.query(`SELECT * FROM Sales`);
  return rows;
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
async function getLowStockProductsGlobal(thresholdParam) {
  let threshold = thresholdParam;

  // Si aucun seuil n'est passé, on prend celui de la table Settings
  if (typeof threshold === "undefined" || threshold === null) {
    const [settings] = await pool.query(
      `SELECT stock_alert_threshold FROM Settings LIMIT 1`
    );
    threshold = settings[0]?.stock_alert_threshold ?? 5; // 5 par défaut si Settings vide
  }
  console.log("Seuil utilisé dans la fonction:", threshold);
  // Vérifie les produits
  const [products] = await pool.query(
    "SELECT * FROM Product WHERE quantity <= ?",
    [threshold]
  );
  console.log("Low stock products:", products);
  return { threshold, products };
}
async function checkLowStock(productId) {
  // Récupérer le seuil global
  const [settings] = await pool.query(
    `SELECT stock_alert_threshold FROM Settings LIMIT 1`
  );
  const threshold = settings[0]?.stock_alert_threshold || 0;

  // Récupérer le produit
  const [product] = await pool.query(
    `SELECT Prod_name, quantity FROM Product WHERE id = ?`,
    [productId]
  );

  if (!product.length) return { alert: false };

  const prod = product[0];
  return {
    alert: prod.quantity <= threshold,
    product: prod,
    threshold,
  };
}
async function getOutOfStockProducts() {
  const [products] = await pool.query(
    "SELECT * FROM Product WHERE quantity = 0"
  );
  return products;
}

module.exports = {
  // ... autres fonctions
  checkLowStock,
};

module.exports = {
  getProduct,
  createProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  updateProductQuantity,
  createSale,
  getProductsByCategoryId,
  getLowStockProductsGlobal,
  checkLowStock,
  getOutOfStockProducts,
  getSales,
};
