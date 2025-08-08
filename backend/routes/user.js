const express = require("express")

const router = express.Router()
const controlleur = require("../controller/userControlleur")
router.get('/',controlleur.get)


module.exports= router