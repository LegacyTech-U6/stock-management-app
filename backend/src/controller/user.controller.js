// controllers/user.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Import des modèles Sequelize
const User = db.User;
const sendMail = require("../utils/mailer");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// ===============================
// 🔹 Créer un utilisateur (inscription)
// ===============================
exports.register = async (req, res) => {
  try {
    const { username, Last_name, email, telephone, password } = req.body;

    // Vérifier si l'email existe déjà
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email déjà utilisé" });

    // Hacher le mot de passe
   

    // ✅ Création du compte
    const newUser = await User.create({
      username,
      Last_name,
      email,
      telephone,
      password_hash: password,
      is_active: false, // Compte inactif jusqu'à activation
    });

    // ✅ Création du token d’activation
    const activationToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Lien d’activation
    const activationLink = `${process.env.FRONTEND_URL}/verify/${activationToken}`;

    // ✅ Envoi du mail
    await sendMail({
      userId: newUser.id,
      subject: "Activez votre compte Stockly",
      html: `
        <h2>Bienvenue, ${newUser.username} 👋</h2>
        <p>Merci de vous être inscrit sur <strong>Stockly</strong>.</p>
        <p>Cliquez sur le bouton ci-dessous pour activer votre compte :</p>
        <a href="${activationLink}" 
           style="display:inline-block;background:#2563eb;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;">
          Activer mon compte
        </a>
        <p>Ce lien expire dans 24 heures.</p>
      `,
    });

    res.status(201).json({
      message: "Utilisateur créé. Un email d’activation a été envoyé.",
    });
  } catch (err) {
    console.error("Erreur register:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Connexion (login)
// ===============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(400)
        .json({ message: "cette email nas pas de compte Stockly" });
  console.log(user.password_hash);
  
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res
        .status(400)
        .json({ message: "mot de passe incorrect" });

    // Générer le token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Déconnexion (logout)
// ===============================
// Rien à supprimer côté serveur : le token est invalidé côté client.
exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Mot de passe oublié
// ===============================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email non trouvé" });

    // Générer un token de réinitialisation (15 min)
    const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // 💌 Normalement : envoi du lien par email
    // Exemple : https://tonsite.com/reset-password?token=xxxx
    // Ici on renvoie juste le token (pour dev)
    res.status(200).json({
      message: "Lien de réinitialisation généré (à envoyer par email)",
      resetToken,
    });
  } catch (err) {
    console.error("Erreur forgotPassword:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Réinitialiser le mot de passe
// ===============================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return res
        .status(400)
        .json({ message: "Token et nouveau mot de passe requis" });

    // Vérifier le token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Token invalide ou expiré" });
    }

    const user = await User.findByPk(decoded.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashed;
    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (err) {
    console.error("Erreur resetPassword:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Changer le mot de passe (auth requis)
// ===============================
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const match = await bcrypt.compare(oldPassword, user.password_hash);
    if (!match)
      return res.status(400).json({ message: "Ancien mot de passe incorrect" });

    user.password_hash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
  } catch (err) {
    console.error("Erreur changePassword:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Mettre à jour le profil
// ===============================
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, telephone, Last_name } = req.body;

    // Vérifier les doublons
    const existing = await User.findOne({
      where: {
        email,
        id: { [db.Sequelize.Op.ne]: userId },
      },
    });

    if (existing)
      return res.status(400).json({ message: "Email déjà utilisé" });

    await User.update(
      { username, email, telephone, Last_name },
      { where: { id: userId } }
    );

    res.status(200).json({ message: "Profil mis à jour avec succès" });
  } catch (err) {
    console.error("Erreur updateProfile:", err);
    res.status(500).json({ message: err.message });
  }
};

// ===============================
// 🔹 Récupérer le profil de l'utilisateur connecté
// ===============================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "username",
        "email",
        "Last_name",
        "telephone",
        "created_at",
      ],
    });

    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Erreur getProfile:", err);
    res.status(500).json({ message: err.message });
  }
};

// =================================
// activation link message
// =================================
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.is_active = true;
    await user.save();

    res.status(200).json({ message: "Compte activé avec succès" });
  } catch (err) {
    res.status(400).json({ message: "Lien d’activation invalide ou expiré" });
  }
};
