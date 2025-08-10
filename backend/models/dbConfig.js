const mysql = require("mysql2");
const dotenv = require("dotenv");
const { error } = require("jquery");

dotenv.config();
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

console.log("✅ Connecté à MySQL !");
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
async function createProduct(
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
  const [results] = await pool.query(
    `INSERT INTO Product (
  Prod_name,
  quantity,
  cost_price,
  selling_price,
  category,
  Prod_Description,
  code_bar,
  date_of_arrival,
  supplier,
  Prod_image) VALUES(?,?,?,?,?,?,?,?,?,?)`,
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
      category = ?,
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

module.exports = {
  getProduct,
  createProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
};
