const {pool} = require('../config/db');


async function getAllClients() {
    const [rows] = await pool.query('SELECT * FROM Client');
    return rows;
}

async function getClient(id){
    const [rows] = await pool.query('SELECT * FROM Client WHERE id = ?', [id]);
    return rows;
}

async function createClient(name, signature, phone) {
    const [result] = await pool.query(
        'INSERT INTO Client (client_name, client_signature, client_PhoneNumber) VALUES (?, ?, ?)',
        [name, signature, phone]
    );
    return result.insertId;
}

async function updateClient(id, name, signature, phone) {
    await pool.query(
        'UPDATE Client SET client_name = ?, client_signature = ?, client_PhoneNumber = ? WHERE id = ?',
        [name, signature, phone, id]
    );
}

async function deleteClient(id) {
    await pool.query('DELETE FROM Client WHERE id = ?', [id]);
}

module.exports = {
    getAllClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
};