
const mysql = require("mysql2")
const dotenv = require("dotenv");

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
    const results = await pool.query("SELECT * FROM Products")
    const row = results[0]

    return row;
    
}
async function createProduct(prod_name,quantity,cost_price,selling_price,category,Prod_Description,code_bar,date_of_arival,supplier,prod_image) {
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
  Prod_image) VALUES(?,?,?,?,?,?,?,?,?,?)`,[prod_name,quantity,cost_price,selling_price,category,Prod_Description,code_bar,date_of_arival,supplier,prod_image]
    );
    return getProduct();
    
}