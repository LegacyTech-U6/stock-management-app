// utils/sendMail.js
const db = require('../config/db');
const { mailjet } = require('../config/mail.config'); // Mailjet avec debug
const Setting = db.mailSettings;
const User = db.User;

const sendMail = async ({ userId, to, subject, html }) => {
  const timestamp = new Date().toISOString();

  try {
    // Récupération des infos du site
    const site = await Setting.findOne({ where: { key: 'site' } });
    const user = userId ? await User.findByPk(userId) : null;

    const fromEmail = site?.param2 || process.env.MAIL_FROM || 'noreply@tondomaine.com';
    const fromName = site?.param1 || 'Stockly';
    const toEmail = user ? user.email : to;

    // 🔍 Log avant envoi
    console.log(`[${timestamp}] 📨 Tentative d’envoi du mail via Mailjet`);
    console.log(`[${timestamp}] De: ${fromName} <${fromEmail}>`);
    console.log(`[${timestamp}] À: ${toEmail}`);
    console.log(`[${timestamp}] Sujet: ${subject}`);
    console.log(`[${timestamp}] Contenu HTML:\n`, html);

    // Construction du message pour Mailjet
    const message = {
      Messages: [
        {
          From: { Email: fromEmail, Name: fromName },
          To: [{ Email: toEmail, Name: user?.username || 'Client' }],
          Subject: subject,
          HTMLPart: html,
        },
      ],
    };

    // ✅ Envoi du mail
    const response = await mailjet.post('send', { version: 'v3.1' }).request(message);

    // 🔍 Log complet de la réponse Mailjet
    console.log(`[${timestamp}] ✅ Mail envoyé avec succès !`);
    console.log(`[${timestamp}] Mailjet Response:\n`, JSON.stringify(response.body, null, 2));

    return { success: true, response: response.body };
  } catch (err) {
    console.error(`[${timestamp}] ❌ Erreur lors de l’envoi du mail :`, err.message);
    if (err.response && err.response.body) {
      console.error(`[${timestamp}] Détails de l’erreur Mailjet :\n`, JSON.stringify(err.response.body, null, 2));
    }
    return { success: false, error: err };
  }
};

module.exports = sendMail;
