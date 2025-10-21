// db-init.js
const fs = require('fs');
const mysql = require('mysql2');
const dotenv = require("dotenv")

// dotenv.config();

const sql = fs.readFileSync('./Stockly.sql', 'utf8');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // change ici
  multipleStatements: true
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Connecté à MySQL');
  connection.query(sql, (err, results) => {
    if (err) throw err.message;
    console.log(' Script SQL exécuté avec succès ');
    
  });
});
