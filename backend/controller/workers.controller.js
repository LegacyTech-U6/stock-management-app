// controller/WorkersController.js
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const WorkerModel = require("../models/WorkerModel");

const WorkersController = {
  // ✅ Créer un nouveau worker
  async createWorker(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      email,
      entreprise_id,
      user_id = null,
      position = null,
      date_hired = null,
      status = "active",
      role,
      password,
      name
    } = req.body;

    try {
      // 1️⃣ Vérifier si l'email existe déjà
      const existing = await WorkerModel.findByEmail(email);
      if (existing) return res.status(400).json({ message: "Email déjà utilisé pour un worker" });

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
        role,
      });

      res.status(201).json({ message: "Worker créé avec succès", workerId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // ✅ Récupérer tous les workers
  async getAllWorkers(req, res) {
    try {
      const workers = await WorkerModel.getAll();
      res.json({workers});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // ✅ Récupérer un worker par ID
  async getWorkerById(req, res) {
    const { id } = req.params;
    try {
      const worker = await WorkerModel.getById(id);
      if (!worker) return res.status(404).json({ message: "Worker not found" });
      res.json({worker});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // ✅ Mise à jour
  async updateWorker(req, res) {
    const { id } = req.params;
    const { position, date_hired, status } = req.body;
    try {
      const affected = await WorkerModel.update(id, { position, date_hired, status });
      if (!affected) return res.status(404).json({ message: "Worker not found" });
      res.json({ message: "Worker updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // ✅ Suppression
  async deleteWorker(req, res) {
    const { id } = req.params;
    try {
      const affected = await WorkerModel.delete(id);
      if (!affected) return res.status(404).json({ message: "Worker not found" });
      res.json({ message: "Worker deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },
};

module.exports = WorkersController;
