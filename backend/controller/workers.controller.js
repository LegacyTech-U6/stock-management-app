// WorkersController.js
const {pool} = require("../config/db"); // your MySQL connection
const { validationResult } = require("express-validator");

const WorkersController = {
  // Create a new worker
  createWorker: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { entreprise_id, user_id, position, date_hired, status, role } =
      req.body;

    try {
      const [result] = await pool.execute(
        `INSERT INTO Workers (entreprise_id, user_id, position, date_hired, status, role) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [entreprise_id, user_id, position, date_hired, status || "active", role]
      );
      res
        .status(201)
        .json({ message: "Worker created", workerId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
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
