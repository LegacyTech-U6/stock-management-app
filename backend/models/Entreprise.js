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
    const [rows] = await pool.query(
      `SELECT * FROM Entreprises WHERE user_id = ?`,
      [user_id]
    );
    return rows;
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
