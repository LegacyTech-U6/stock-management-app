const db = require('../config/db'); // index.js avec les modèles
const transporter = require('../config/mail.config');

const Setting = db.mailSettings;
const User = db.User;

const sendMail = async ({ userId, to, subject, html }) => {
  try {
    // 1️⃣ Récupération des infos du site
    const site = await Setting.findOne({ where: { key: 'site' } });

    // 2️⃣ Récupération de l’utilisateur si un id est fourni
    let user = null;
    if (userId) {
      user = await User.findByPk(userId);
    }

    // 3️⃣ Construction du message
    const mailOptions = {
      from: {
        name: site?.param1 || 'Stockly',
        address: site?.param2 || process.env.MAIL_USER,
      },
      to: user ? user.email : to,
      subject,
      html,
    };

    // 4️⃣ Envoi du mail
    await transporter.sendMail(mailOptions);
    console.log(`✅ Mail envoyé à ${mailOptions.to}`);

    return { success: true };
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du mail:", error);
    return { success: false, error };
  }
};

module.exports = sendMail;
