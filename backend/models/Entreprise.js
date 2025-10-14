// backend/models/Entreprise.js
const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Entreprise {
  // Créer une entreprise
  static async create({
    user_id,
    name,
    description = null,
    logo_url = null,
    numero_fiscal = null,
    nui = null,
    adresse = null,
    ville = null,
    code_postal = null,
    email_contact = null,
    telephone_contact = null,
    informations_bancaires = null
  }) {
    const uuid = uuidv4(); // Générer UUID
    const [result] = await pool.query(
      `INSERT INTO Entreprises 
      (uuid, user_id, name, description, logo_url, numero_fiscal, nui, adresse, ville, code_postal, email_contact, telephone_contact, informations_bancaires)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuid,
        user_id,
        name,
        description,
        logo_url,
        numero_fiscal,
        nui,
        adresse,
        ville,
        code_postal,
        email_contact,
        telephone_contact,
        informations_bancaires
      ]
    );

    return { id: result.insertId, uuid, user_id, name, description, logo_url, numero_fiscal, nui, adresse, ville, code_postal, email_contact, telephone_contact, informations_bancaires };
  }

  // Récupérer toutes les entreprises d’un utilisateur
  static async getAllByUser(user_id) {
    const [entreprises] = await pool.query(
      `SELECT * FROM Entreprises WHERE user_id = ?`,
      [user_id]
    );
    return entreprises;
  }

  // Récupérer par UUID
  static async getByUuid(uuid) {
    const [rows] = await pool.query(
      `SELECT * FROM Entreprises WHERE uuid = ?`,
      [uuid]
    );
    return rows[0];
  }

  // Mettre à jour par UUID
  static async updateByUuid(
    uuid,
    {
      name,
      description,
      logo_url,
      numero_fiscal,
      nui,
      adresse,
      ville,
      code_postal,
      email_contact,
      telephone_contact,
      informations_bancaires
    }
  ) {
    await pool.query(
      `UPDATE Entreprises
       SET name = ?, description = ?, logo_url = ?, numero_fiscal = ?, nui = ?, adresse = ?, ville = ?, code_postal = ?, email_contact = ?, telephone_contact = ?, informations_bancaires = ?
       WHERE uuid = ?`,
      [name, description, logo_url, numero_fiscal, nui, adresse, ville, code_postal, email_contact, telephone_contact, informations_bancaires, uuid]
    );
  }

  // Supprimer par UUID
  static async deleteByUuid(uuid) {
    await pool.query(`DELETE FROM Entreprises WHERE uuid = ?`, [uuid]);
  }
}

module.exports = Entreprise;
