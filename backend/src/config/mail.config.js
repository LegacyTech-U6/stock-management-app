require('dotenv').config();
const nodemailer = require('nodemailer');

// Création du transporteur mail
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_PORT == 465, // true si port 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Vérification automatique de la connexion au démarrage
transporter.verify((error) => {
  if (error) {
    console.error("❌ Erreur de connexion au serveur mail :", error.message);
  } else {
    console.log("✅ Serveur mail prêt à envoyer des emails !");
  }
});

module.exports = transporter;
