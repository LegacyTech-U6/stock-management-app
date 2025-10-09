const { pool } = require("../config/db");

// ✅ Récupérer tous les clients d'une entreprise
async function getAllClients(entrepriseId) {
  const [rows] = await pool.query(
    "SELECT * FROM Client WHERE entreprise_id = ?",
    [entrepriseId]
  );
  return rows;
}

// ✅ Récupérer un client par ID et entreprise
async function getClient(id, entrepriseId) {
  const [rows] = await pool.query(
    "SELECT * FROM Client WHERE id = ? AND entreprise_id = ?",
    [id, entrepriseId]
  );
  return rows[0] || null;
}

// ✅ Créer un client pour une entreprise
async function createClient(
  name,
  signature,
  phone,
  email,
  location,
  entrepriseId
) {
  const [result] = await pool.query(
    "INSERT INTO Client (entreprise_id, client_name, client_signature, client_PhoneNumber, email, location) VALUES (?, ?, ?, ?, ?, ?)",
    [entrepriseId, name, signature, phone, email, location]
  );
  return result.insertId;
}

// ✅ Mettre à jour un client (uniquement s'il appartient à l'entreprise)
async function updateClient(
  id,
  name,
  signature,
  phone,
  email,
  location,
  entrepriseId
) {
  await pool.query(
    "UPDATE Client SET client_name = ?, client_signature = ?, client_PhoneNumber = ?, email = ?, location = ? WHERE id = ? AND entreprise_id = ?",
    [name, signature, phone, email, location, id, entrepriseId]
  );
}

// ✅ Supprimer un client (uniquement s'il appartient à l'entreprise)
async function deleteClient(id, entrepriseId) {
  await pool.query(
    "DELETE FROM Client WHERE id = ? AND entreprise_id = ?",
    [id, entrepriseId]
  );
}

module.exports = {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
