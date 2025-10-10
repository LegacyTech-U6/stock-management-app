// controller/roles.controller.js
const RoleModel = require("../models/RoleModel")

const RolesController = {
  // Create a new role
  async createRole(req, res) {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({ message: "Role name is required" })
    }

    try {
      const result = await RoleModel.createRole(name, description)
      res.status(201).json({
        message: "Role created successfully",
        roleId: result.insertId,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Database error" })
    }
  },

  // Get all roles
  async getAllRoles(req, res) {
    try {
      const roles = await RoleModel.getAllRoles()
      res.json(roles)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Database error" })
    }
  },

  // Get role by ID
  async getRoleById(req, res) {
    const { id } = req.params
    try {
      const role = await RoleModel.getRoleById(id)
      if (!role) return res.status(404).json({ message: "Role not found" })
      res.json(role)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Database error" })
    }
  },

  // Update role
  async updateRole(req, res) {
    const { id } = req.params
    const { name, description } = req.body

    try {
      const result = await RoleModel.updateRole(id, name, description)
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Role not found" })
      res.json({ message: "Role updated successfully" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Database error" })
    }
  },

  // Delete role
  async deleteRole(req, res) {
    const { id } = req.params

    try {
      const result = await RoleModel.deleteRole(id)
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Role not found" })
      res.json({ message: "Role deleted successfully" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Database error" })
    }
  },
}

module.exports = RolesController
