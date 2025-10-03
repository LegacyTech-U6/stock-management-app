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

router.get("/", getAll);
router.post("/", create);
router.get("/:id", get);
router.put("/:id", update);
router.delete("/:id", deleteclient);

module.exports = router;
