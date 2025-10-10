// WorkersController.js
const {pool} = require("../config/db"); // your MySQL connection
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Secret JWT (idéalement mettre dans .env)
const JWT_SECRET = process.env.JWT_SECRET;
const WorkersController = {
  // Create a new worker
  createWorker:async (req, res) => {
    // Vérification des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      entreprise_id,
      user_id = null, // null par défaut si non fourni
      position = null,
      date_hired = null,
      status = "active",
      role, // ici on attend l'id du rôle
      password,
    } = req.body;

    try {
      // 1️⃣ Vérifier si l'email existe déjà dans Workers
      const [existing] = await pool.execute(
        "SELECT id FROM Workers WHERE email = ?",
        [email]
      );
      if (existing.length > 0) {
        return res.status(400).json({ message: "Email déjà utilisé pour un worker" });
      }

      // 2️⃣ Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // 3️⃣ Insérer le worker
      const [result] = await pool.execute(
        `INSERT INTO Workers 
        (email, entreprise_id, user_id, position, date_hired, status, password_hash ,role_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [email, entreprise_id, user_id, position, date_hired, status, hashedPassword, role]
      );

      const workerId = result.insertId;

      // 5️⃣ Réponse
      res.status(201).json({ message: "Worker créé avec succès", workerId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Get all workers
  getAllWorkers: async (req, res) => {
    try {
      const [rows] = await pool.execute(
        `SELECT 
    w.id AS worker_id,
    w.position,
    w.date_hired,
    w.status,
    e.id AS entreprise_id,
    e.name AS entreprise_name,
    e.description AS entreprise_description,
    r.name AS role_name
FROM Workers w
JOIN Entreprises e ON w.entreprise_id = e.id
JOIN roles r ON w.id = r.id;

`
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // Get one worker by ID
  getWorkerById: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.execute(
        `SELECT 
    w.id AS worker_id,
    w.position,
    w.date_hired,
    w.status,
    e.id AS entreprise_id,
    e.name AS entreprise_name,
    e.description AS entreprise_description
FROM Workers w
JOIN Entreprises e ON w.entreprise_id = e.id;
WHERE id = ?`,
        [id]
      );

      if (!rows.length)
        return res.status(404).json({ message: "Worker not found" });

      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // Update worker
  updateWorker: async (req, res) => {
    const { id } = req.params;
    const { position, date_hired, status } = req.body;

    try {
      const [result] = await pool.execute(
        `UPDATE Workers SET position = ?, date_hired = ?, status = ? WHERE id = ?`,
        [position, date_hired, status, id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Worker not found" });

      res.json({ message: "Worker updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // Delete worker
  deleteWorker: async (req, res) => {
    const { id } = req.params;

    try {
      const [result] = await pool.execute(`DELETE FROM Workers WHERE id = ?`, [
        id,
      ]);

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Worker not found" });

      res.json({ message: "Worker deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  },
};

module.exports = WorkersController;
