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

module.exports = {
  getProductSalesStats,
  getSalesReportByPeriod,
};
