const { pool } = require("../config/db");

//In this file we deal with the functions and queries to manipule the product tables

async function getProduct() {
 const [rows] = await pool.query(`
  SELECT 
    p.id,
    p.Prod_name,
    p.quantity,
    p.cost_price,
    p.selling_price,
    p.Prod_Description,
    p.code_bar,
    p.date_of_arrival,
    p.Prod_image,
    p.min_stock_level,
    p.max_stock_level,
    c.name AS category_name,
    s.supplier_name
  FROM Product p
  LEFT JOIN Category c ON p.category_id = c.id
  LEFT JOIN supplier s ON p.supplier = s.id
  ORDER BY p.Prod_name
`);
  return rows;
}
async function getOneProduct(id) {
const [rows] = await pool.query(`
  SELECT 
    p.id,
    p.Prod_name,
    p.quantity,
    p.cost_price,
    p.selling_price,
    p.Prod_Description,
    p.code_bar,
    p.date_of_arrival,
    p.Prod_image,
    c.name AS category_name,
    s.supplier_name
  FROM Product p
  LEFT JOIN Category c ON p.category_id = c.id
  LEFT JOIN supplier s ON p.supplier = s.id
  WHERE p.id = ?
`, [id]);
return rows[0];

}
async function updateProductQuantity(id, newQuantity) {
  const [result] = await pool.query(
    `UPDATE Product SET quantity = ? WHERE id = ?`,
    [newQuantity, id]
  );
  return result; // contains affectedRows, etc.
}
async function createSale(productId, quantitySold, totalPrice) {
 
  const profits = await getOneProduct(productId)

  let total_profit = 0
  for (let profit of profits) {
    total_profit = profit.selling_price - profit.cost_price
    
  }
   const [result] = await pool.query(
    `INSERT INTO Sales (product_id, quantity_sold, total_price , total_profit) VALUES (?, ?, ?, ?)`,
    [productId, quantitySold, totalPrice, total_profit]
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
  Prod_image,
  min_stock_level,
  max_stock_level
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
      Prod_image,
      min_stock_level,
      max_stock_level
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      min_stock_level,
      max_stock_level
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
  date_of_arrival,
  supplier,
  prod_image,
  min_stock_level,
  max_stock_level
) {
  let query = `
    UPDATE Product SET
      Prod_name = ?,
      quantity = ?,
      cost_price = ?,
      selling_price = ?,
      category_id = ?,
      Prod_Description = ?,
      code_bar = ?,
      date_of_arrival = ?,
      supplier = ?,
      min_stock_level = ?,
      max_stock_level = ?
  `;
  const values = [
    prod_name,
    quantity,
    cost_price,
    selling_price,
    category,
    Prod_Description,
    code_bar,
    date_of_arrival,
    supplier,
    min_stock_level,
    max_stock_level
  ];

  if (prod_image) {
    query += `, Prod_image = ?`;
    values.push(prod_image);
  }

  query += ` WHERE id = ?`;
  values.push(id);

  const [result] = await pool.query(query, values);
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
const [products] = await pool.query(`
    SELECT 
      p.id,
      p.Prod_name,
      p.quantity,
      p.cost_price,
      p.selling_price,
      p.supplier,  -- 🟢 important
      c.name AS category_name,
      s.supplier_name
    FROM Product p
    LEFT JOIN Category c ON p.category_id = c.id
    LEFT JOIN supplier s ON p.supplier = s.id
    WHERE p.quantity = 0
  `);


return products;

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
  getLowStockProductsGlobal,
  checkLowStock,
  getOutOfStockProducts,
  getSales,
  checkLowStock,
};
