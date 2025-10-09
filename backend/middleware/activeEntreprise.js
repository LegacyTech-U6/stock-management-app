// middleware/activeEntreprise.js
const getActiveEntreprise = (req, res, next) => {
  // Lire le header X-Entreprise-Id
  const entrepriseId = req.headers['x-entreprise-id'];

  if (!entrepriseId) {
    req.entrepriseId = null; // pas obligatoire, mais pratique
  } else {
    req.entrepriseId = parseInt(entrepriseId, 10); // convertir en number
  }

  next();
};

module.exports = getActiveEntreprise;
