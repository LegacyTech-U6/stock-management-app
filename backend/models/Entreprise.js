// backend/models/Entreprise.js
const {pool} = require('../config/db'); // instance mysql2/promise avec pool

class Entreprise {
  static async create({ user_id, name, description, logo_url }) {
    const [result] = await pool.query(
      `INSERT INTO Entreprises (user_id, name, description, logo_url) VALUES (?, ?, ?, ?)`,
      [user_id, name, description, logo_url]
    );
    return { id: result.insertId, user_id, name, description, logo_url };
  }

 static async getAllByUser(user_id) {
 // 1️⃣ Get enterprises owned by this admin
  const [entreprises] = await pool.query(
    `SELECT * FROM Entreprises WHERE user_id = ?`,
    [user_id]
  );

  // 2️⃣ Loop through enterprises to compute stats
  const result = await Promise.all(
    entreprises.map(async (e) => {
      const entrepriseId = e.id;

      // 🔹 Total revenue
      const [revenueRows] = await pool.query(
        `SELECT SUM(total_price) AS total_revenue
         FROM Sales
         WHERE entreprise_id = ?`,
        [entrepriseId]
      );
      const totalRevenue = revenueRows[0]?.total_revenue || 0;

      // 🔹 Inventory value
      const [inventoryRows] = await pool.query(
        `SELECT SUM(quantity * selling_price) AS inventory_value
         FROM Product
         WHERE entreprise_id = ?`,
        [entrepriseId]
      );
      const inventoryValue = inventoryRows[0]?.inventory_value || 0;

      // 🔹 Total members (workers + entreprise users)
      const [memberRows] = await pool.query(
        `SELECT 
           (SELECT COUNT(*) FROM Workers WHERE entreprise_id = ?) +
           (SELECT COUNT(*) FROM EntrepriseUsers WHERE entreprise_id = ?) AS total_members`,
        [entrepriseId, entrepriseId]
      );
      const totalMembers = memberRows[0]?.total_members || 0;

      return {
        ...e,
        totalRevenue,
        inventoryValue,
        totalMembers
      };
    })
  );

  return result;
}

  static async getById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM Entreprises WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  static async update(id, { name, description, logo_url }) {
    await pool.query(
      `UPDATE Entreprises SET name = ?, description = ?, logo_url = ? WHERE id = ?`,
      [name, description, logo_url, id]
    );
  }

  static async delete(id) {
    await pool.query(`DELETE FROM Entreprises WHERE id = ?`, [id]);
  }
}

module.exports = Entreprise;
