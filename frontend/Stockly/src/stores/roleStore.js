// src/stores/roleStore.js
import { defineStore } from "pinia"
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "@/service/api"

export const useRoleStore = defineStore("roleStore", {
  state: () => ({
    roles: [],
    selectedRole: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchRoles() {
      this.loading = true
      this.error = null
      try {
        this.roles = await getAllRoles()
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to fetch roles"
      } finally {
        this.loading = false
      }
    },

    async fetchRoleById(id) {
      this.loading = true
      this.error = null
      try {
        this.selectedRole = await getRoleById(id)
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to fetch role"
      } finally {
        this.loading = false
      }
    },

    async addRole(roleData) {
      this.loading = true
      this.error = null
      try {
        const newRole = await createRole(roleData)
        await this.fetchRoles() // Refresh the list after creation
        return newRole
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to create role"
      } finally {
        this.loading = false
      }
    },

    async editRole(id, roleData) {
      this.loading = true
      this.error = null
      try {
        await updateRole(id, roleData)
        await this.fetchRoles()
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to update role"
      } finally {
        this.loading = false
      }
    },

    async removeRole(id) {
      this.loading = true
      this.error = null
      try {
        await deleteRole(id)
        this.roles = this.roles.filter((r) => r.id !== id)
      } catch (err) {
        this.error = err.response?.data?.message || "Failed to delete role"
      } finally {
        this.loading = false
      }
    },
  },
})
