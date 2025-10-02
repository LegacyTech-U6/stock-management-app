const { pool } = require("../config/db");

async function getAllClients() {
  const [rows] = await pool.query("SELECT * FROM Client");
  return rows;
}

async function getClient(id) {
  const [rows] = await pool.query("SELECT * FROM Client WHERE id = ?", [id]);
  return rows;
}

async function createClient(name, signature, phone, email, location) {
  const [result] = await pool.query(
    "INSERT INTO Client (client_name, client_signature, client_PhoneNumber,email,location) VALUES (?, ?, ?, ?, ?)",
    [name, signature, phone, email, location]
  );
  return result.insertId;
}

async function updateClient(id, name, signature, phone, email, location) {
  await pool.query(
    "UPDATE Client SET client_name = ?, client_signature = ?, client_PhoneNumber = ?,email = ?,location = ?, WHERE id = ?",
    [name, signature, phone, id, email, location]
  );
}

async function deleteClient(id) {
  await pool.query("DELETE FROM Client WHERE id = ?", [id]);
}

module.exports = {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
