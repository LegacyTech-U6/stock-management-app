const express = require("express");
const router = express.Router();
const {
  get,
  getAll,
  create,
  update,
  deleteclient,
} = require("../controller/client");
const authenticateUser = require("../middleware/AuthenticatedUser");
const getActiveEntreprise = require('../middleware/activeEntreprise');

router.get("/", getActiveEntreprise, getAll);
router.post("/", getActiveEntreprise, create);
router.get("/:id", getActiveEntreprise, get);
router.put("/:id", getActiveEntreprise, update);
router.delete("/:id", getActiveEntreprise, deleteclient);

module.exports = router;
