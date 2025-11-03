// config/mail.config.js
require('dotenv').config();
const Mailjet = require('node-mailjet');

// ⚡ Connexion à l’API Mailjet
const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,  // clé publique Mailjet
  process.env.MJ_APIKEY_PRIVATE  // clé privée Mailjet
);

// 🔧 Fonction utilitaire pour envoyer un mail avec logs détaillés
async function sendMailDebug(message) {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] 📨 Tentative d’envoi du mail via Mailjet...`);
  console.log(`[${timestamp}] Message à envoyer:\n`, JSON.stringify(message, null, 2));

  try {
    // Envoi du mail
    const response = await mailjet.post('send', { version: 'v3.1' }).request(message);

    // Log complet de la réponse
    console.log(`[${timestamp}] ✅ Mail envoyé avec succès !`);
    console.log(`[${timestamp}] Mailjet Response:\n`, JSON.stringify(response.body, null, 2));

    return response.body;
  } catch (err) {
    console.error(`[${timestamp}] ❌ Erreur lors de l’envoi du mail :`, err.message);
    if (err.response && err.response.body) {
      console.error(`[${timestamp}] Détails de l’erreur Mailjet :\n`, JSON.stringify(err.response.body, null, 2));
    }
    throw err;
  }
}

// 🔎 Fonction pour tester la connexion Mailjet au démarrage
async function testMailjetConnection() {
  console.log('🔎 Test de connexion à Mailjet...');
  try {
    const response = await mailjet.get('account').request(); // récupère les infos du compte
    console.log('✅ Connexion Mailjet OK !');
    console.log('Infos du compte Mailjet :', JSON.stringify(response.body, null, 2));
  } catch (err) {
    console.error('❌ Impossible de se connecter à Mailjet :', err.message);
    if (err.response && err.response.body) {
      console.error('Détails :', JSON.stringify(err.response.body, null, 2));
    }
  }
}

// Exporter l’instance Mailjet + utilitaires
module.exports = {
  mailjet,
  sendMailDebug,
  testMailjetConnection,
};
