// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')


// Route to build my account view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build account registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Deliver account view
router.get(
  "/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildManagement)
  )


// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )
  
// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
  )
//Logout 
router.get("/logout", utilities.handleErrors(accountController.logoutUser))

router.get(
  "/edit/:account_id",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.buildAccountEdit)
)
router.post(
  "/updateaccount",
  regValidate.updateAcctRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)

router.post(
  "/updatepassword",
  regValidate.updatePassRules(),
  regValidate.checkUpdatePass,
  utilities.handleErrors(accountController.updatePassword)
)

module.exports = router;