const { pool } = require("../config/db");

//In this file we are going to deal with the suppiers tables

async function getAllsupplier() {
    const results = await pool.query("SELECT * FROM supplier");
    const row = results[0];

    return row;
}
async function createSupplier(supplier_name, supplier_address, phone_number) {
    const result = await pool.query(
        `INSERT INTO supplier (supplier_name, supplier_address, phone_number) VALUES (?, ?, ?)`,
        [supplier_name, supplier_address, phone_number]
    );
    return result.insertId,getAllsupplier();
}
async function getOnesupplier(id) {
    const results = await pool.query(`SELECT * FROM supplier WHERE id = ?`, [id]);

    const row = results[0];

    return row;
}

async function updateSuppliers(
    id,
    supplier_name,
    suppier_address,
    phone_number
) {
    const [results] = await pool.query(
        `UPDATE supplier SET supplier_name = ?, supplier_address = ?, phone_number = ? WHERE id = ?`,
        [supplier_name, suppier_address, phone_number, id]
    );
    return results.affectedRows > 0;
}
 async function deleteSupplier(id) {
    const result = await pool.query(`DLETE FROM supplier WHERE id = ?`,[id]);
    return result.affectedRows>0;
    
 }

 async function getProductBySuppliers(id) {
    const [rows] = await pool.query(
        `SELECT * FROM  Product WHERE supplier = ? ORDER BY Prod_name`,[id]
    );
    return rows; 
 }

 module.exports={
    getAllsupplier,
    getOnesupplier,
    updateSuppliers,
    deleteSupplier,
    getProductBySuppliers,
    createSupplier
 }