// models/WorkerModel.js
const { pool } = require("../config/db");

const WorkerModel = {
  async createWorker({ 
    name, 
    email, 
    entreprise_id, 
    user_id, 
    position, 
    date_hired, 
    status, 
    hashedPassword, 
    role 
  }) {
    const [result] = await pool.query(
      `INSERT INTO Workers 
      (name, email, entreprise_id, user_id, position, date_hired, status, password_hash, role_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, entreprise_id, user_id, position, date_hired, status, hashedPassword, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.query("SELECT id FROM Workers WHERE email = ?", [email]);
    return rows[0];
  },

  // ✅ CORRECTION : Ajouter le paramètre user_id
  async getAll(user_id) {
    const [rows] = await pool.query(`
      SELECT 
        w.id,
        w.name,
        w.email,
        w.position,
        w.date_hired,
        w.status,
        w.role_id,
        w.entreprise_id,
        e.name AS entreprise_name,
        e.description AS entreprise_description,
        r.name AS role_name
      FROM Workers w
      JOIN Entreprises e ON w.entreprise_id = e.id
      LEFT JOIN roles r ON w.role_id = r.id
      WHERE w.user_id = ?;
    `, [user_id]);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(`
      SELECT 
        w.id,
        w.name,
        w.email,
        w.position,
        w.date_hired,
        w.status,
        w.role_id,
        w.entreprise_id,
        e.name AS entreprise_name,
        e.description AS entreprise_description,
        r.name AS role_name
      FROM Workers w
      JOIN Entreprises e ON w.entreprise_id = e.id
      LEFT JOIN roles r ON w.role_id = r.id
      WHERE w.id = ?;
    `, [id]);
    return rows[0];
  },

  // ✅ CORRECTION : Ajouter la possibilité de mettre à jour le nom et email
  async update(id, { name, email, position, date_hired, status, role_id }) {
    const [result] = await pool.query(
      `UPDATE Workers SET 
        name = ?, 
        email = ?, 
        position = ?, 
        date_hired = ?, 
        status = ?,
        role_id = ?
      WHERE id = ?`,
      [name, email, position, date_hired, status, role_id, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query(`DELETE FROM Workers WHERE id = ?`, [id]);
    return result.affectedRows;
  }
};

module.exports = WorkerModel;