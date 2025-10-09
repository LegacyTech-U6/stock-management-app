// backend/models/Entreprise.js
const db = require('../config/db'); // instance mysql2/promise avec pool

class Entreprise {
  static async create({ user_id, name, description, logo_url }) {
    const [result] = await db.query(
      `INSERT INTO Entreprises (user_id, name, description, logo_url) VALUES (?, ?, ?, ?)`,
      [user_id, name, description, logo_url]
    );
    return { id: result.insertId, user_id, name, description, logo_url };
  }

  static async getAllByUser(user_id) {
    const [rows] = await db.query(
      `SELECT * FROM Entreprises WHERE user_id = ?`,
      [user_id]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      `SELECT * FROM Entreprises WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  static async update(id, { name, description, logo_url }) {
    await db.query(
      `UPDATE Entreprises SET name = ?, description = ?, logo_url = ? WHERE id = ?`,
      [name, description, logo_url, id]
    );
  }

  static async delete(id) {
    await db.query(`DELETE FROM Entreprises WHERE id = ?`, [id]);
  }
}

module.exports = Entreprise;
