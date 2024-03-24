// Needed resources
const express = require("express")
const router = new express.Router()
const errorController = require("../controllers/errorController")

// Route to generate error page
router.get("/intentional", errorController.generateIntentionalErrorPage);

module.exports = router;