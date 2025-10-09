// backend/routes/entreprise.routes.js
const express = require('express');
const router = express.Router();
const entrepriseController = require('../controller/entreprise.controller');
const authenticateUser = require('../middleware/AuthenticatedUser');

// Toutes les routes sont protégées : l'utilisateur doit être connecté
router.use(authenticateUser);

// CRUD entreprises
router.post('/', entrepriseController.createEntreprise);       // créer
router.get('/', entrepriseController.getEntreprises);          // lister toutes
router.get('/:id', entrepriseController.getEntrepriseById);    // détails
router.put('/:id', entrepriseController.updateEntreprise);     // mise à jour
router.delete('/:id', entrepriseController.deleteEntreprise);  // suppression

module.exports = router;
