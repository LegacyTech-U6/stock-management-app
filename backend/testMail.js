const transporter = require("./src/config/mail.config");
require("dotenv").config();
console.log("✅ Vérification des variables :");
console.log("MAIL_HOST =", process.env.MAIL_HOST);
console.log("MAIL_PORT =", process.env.MAIL_PORT);
console.log("MAIL_USER =", process.env.MAIL_USER);
console.log("MAIL_PASS =", process.env.MAIL_PASS ? "✅ défini" : "❌ manquant");

async function testMail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: "tonautreemail@gmail.com",
      subject: "Test SMTP Factgen",
      html: "<h2>✅ Le mailer fonctionne parfaitement !</h2>",
    });
    console.log("📨 Email envoyé :", info.messageId);
  } catch (err) {
    console.error("❌ Erreur lors de l'envoi du mail :", err);
  }
}

testMail();
