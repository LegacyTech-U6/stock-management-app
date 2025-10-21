const express = require("express");
const router = express.Router();
const {
 
  deleteClient,
  getAllClients,
  getClientById,
  createClient,
  updateClient,
} = require("../controller/client.controller");
const authenticateUser = require("../middleware/AuthenticatedUser");
const getActiveEntreprise = require('../middleware/activeEntreprise');
// router.use(getActiveEntreprise)
router.get("/", getAllClients);
router.post("/", createClient);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
