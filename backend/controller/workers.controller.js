// controller/WorkersController.js
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const WorkerModel = require("../models/WorkerModel");

const WorkersController = {
  // ✅ Créer un nouveau worker
  async createWorker(req, res) {
    const user_id = req.user.id;
    const {
      email,
      entreprise_id,
      position = null,
      date_hired = null,
      status = "active",
      role, // C'est le role_id
      password,
      name,
    } = req.body;

    console.log("📝 Creating worker:", { name, email, entreprise_id, role });

    try {
      // 1️⃣ Vérifier si l'email existe déjà
      const existing = await WorkerModel.findByEmail(email);
      if (existing) {
        return res.status(400).json({ message: "Email déjà utilisé pour un worker" });
      }

      // 2️⃣ Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // 3️⃣ Insertion
      const workerId = await WorkerModel.createWorker({
        name,
        email,
        entreprise_id,
        user_id,
        position,
        date_hired,
        status,
        hashedPassword,
        role, // role_id
      });

      res.status(201).json({ 
        message: "Worker créé avec succès", 
        workerId,
        worker: {
          id: workerId,
          name,
          email,
          position,
          status,
          role_id: role
        }
      });
    } catch (err) {
      console.error("❌ Error creating worker:", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // ✅ Récupérer tous les workers
  async getAllWorkers(req, res) {
    try {
      const user_id = req.user.id;
      console.log("👥 Fetching workers for user:", user_id);
      
      const workers = await WorkerModel.getAll(user_id);
      
      console.log(`📊 Found ${workers.length} workers`);
      res.json({ workers });
    } catch (err) {
      console.error("❌ Error fetching workers:", err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // ✅ Récupérer un worker par ID
  async getWorkerById(req, res) {
    const { id } = req.params;
    try {
      const worker = await WorkerModel.getById(id);
      if (!worker) {
        return res.status(404).json({ message: "Worker not found" });
      }
      res.json({ worker });
    } catch (err) {
      console.error("❌ Error fetching worker:", err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // ✅ Mise à jour
  async updateWorker(req, res) {
    const { id } = req.params;
    const { 
      name, 
      email, 
      position, 
      date_hired, 
      status, 
      role_id 
    } = req.body;
    
    try {
      const affected = await WorkerModel.update(id, {
        name,
        email,
        position,
        date_hired,
        status,
        role_id
      });
      
      if (!affected) {
        return res.status(404).json({ message: "Worker not found" });
      }
      
      res.json({ message: "Worker updated successfully" });
    } catch (err) {
      console.error("❌ Error updating worker:", err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // ✅ Suppression
  async deleteWorker(req, res) {
    const { id } = req.params;
    try {
      const affected = await WorkerModel.delete(id);
      if (!affected) {
        return res.status(404).json({ message: "Worker not found" });
      }
      res.json({ message: "Worker deleted successfully" });
    } catch (err) {
      console.error("❌ Error deleting worker:", err);
      res.status(500).json({ error: "Database error" });
    }
  },
};

module.exports = WorkersController;