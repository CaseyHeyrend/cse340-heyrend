// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Login
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
  )

// Route to build my account view
router.get("/login", accountController.buildLogin)


// Process the login request
//router.post("/login",regValidate.loginRules(),regValidate.checkLoginData,utilities.handleErrors(accountController.accountLogin))
router.post("/login",(req, res) => {res.status(200).send('login process')})

// Route to build account registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

// Process the login attempt
//router.post("/login",(req, res) => {res.status(200).send('login process') })


//router.post(
  //"/login",
  //regValidate.loginRules(),
  //regValidate.checkLoginData,
  //utilities.handleErrors(accountController.accountLogin))

//router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

module.exports = router;