// controllers/user.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Import des modèles Sequelize
const User = db.User;
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = await User.create({
      username,
      Last_name,
      email,
      telephone,
      password_hash: hashedPassword,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
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

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });

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
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

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
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

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
      attributes: ["id", "username", "email", "Last_name", "telephone", "createdAt"],
    });

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Erreur getProfile:", err);
    res.status(500).json({ message: err.message });
  }
};
