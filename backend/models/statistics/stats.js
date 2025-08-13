const { get } = require("jquery");
const { pool } = require("../../config/db");

async function getProductSalesStats() {
  const [rows] = await pool.query(`
    SELECT product_id, SUM(quantity_sold) AS total_sold
    FROM Sales
    GROUP BY product_id
    ORDER BY total_sold DESC
  `);
  return rows;
}
async function getSalesReportByPeriod(period) {
  let query = `
    SELECT product_id, SUM(quantity_sold) AS total_sold
    FROM Sales
  `;
  let params = [];

  if (period === "day") {
    query += " WHERE DATE(sale_date) = CURDATE() ";
  } else if (period === "week") {
    query += " WHERE YEARWEEK(sale_date, 1) = YEARWEEK(CURDATE(), 1) ";
  } else if (period === "month") {
    query +=
      " WHERE YEAR(sale_date) = YEAR(CURDATE()) AND MONTH(sale_date) = MONTH(CURDATE()) ";
  }
  query += " GROUP BY product_id ORDER BY total_sold DESC";

  const [rows] = await pool.query(query, params);
  return rows;
}
async function getBestCategory() {
  const [rows] = await pool.query(`SELECT 
    Category.id AS category_id,
        Category.name AS category_name,
        SUM(Sales.quantity_sold) AS total_quantity_sold
    FROM Category
    JOIN Product
    ON Category.id = Product.category_id
    JOIN Sales
    ON Product.id = Sales.product_id
    GROUP BY Category.id, Category.name
    ORDER BY total_quantity_sold DESC;
`);
  return rows;
}
async function bestProductByCategory(categoryId) {
  const [rows] = await pool.query(`SELECT 
    cat.id AS category_id,
    cat.name AS category_name,
    p.id AS product_id,
    p.Prod_name AS Product_name,
    SUM(s.quantity_sold) AS total_sold
FROM Sales AS s
JOIN Product AS p 
    ON s.product_id = p.id
JOIN Category AS cat
    ON p.category_id = cat.id
GROUP BY cat.id, cat.name, p.id, p.Prod_name
ORDER BY cat.name ASC, total_sold DESC;
`, [categoryId]);
  return rows;
}
module.exports = {
  getProductSalesStats,
  getSalesReportByPeriod,
  getBestCategory,
  bestProductByCategory,
};
