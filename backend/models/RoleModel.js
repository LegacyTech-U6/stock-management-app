// models/RoleModel.js
const { pool } = require("../config/db")

const RoleModel = {
  // Create a new role
  async createRole(name, description) {
    const [result] = await pool.execute(
      `INSERT INTO roles (name, description) VALUES (?, ?)`,
      [name, description]
    )
    return result
  },

  // Get all roles
  async getAllRoles() {
    const [rows] = await pool.execute(`SELECT * FROM roles`)
    return rows
  },

  // Get one role by ID
  async getRoleById(id) {
    const [rows] = await pool.execute(`SELECT * FROM roles WHERE id = ?`, [id])
    return rows[0]
  },

  // Update role
  async updateRole(id, name, description) {
    const [result] = await pool.execute(
      `UPDATE roles SET name = ?, description = ? WHERE id = ?`,
      [name, description, id]
    )
    return result
  },

  // Delete role
  async deleteRole(id) {
    const [result] = await pool.execute(`DELETE FROM roles WHERE id = ?`, [id])
    return result
  },
}

module.exports = RoleModel
