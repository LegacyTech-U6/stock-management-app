// middleware/activeEntreprise.js
const getActiveEntreprise = (req, res, next) => {
  // Lire le header X-Entreprise-Id
  const entrepriseId = req.headers['x-entreprise-id'];

  // 🔍 Debug : voir tous les headers envoyés
  console.log('🧩 Headers reçus :', req.headers);

  // 🔍 Debug : voir spécifiquement la valeur envoyée
  console.log('🏢 X-Entreprise-Id reçu :', entrepriseId);

  if (!entrepriseId) {
    console.log('⚠️ Aucun X-Entreprise-Id trouvé dans les headers');
    req.entrepriseId = null;
  } else {
    req.entrepriseId = parseInt(entrepriseId, 10);
    console.log('✅ Entreprise ID stocké dans req.entrepriseId :', req.entrepriseId);
  }

  next();
};

module.exports = getActiveEntreprise;
