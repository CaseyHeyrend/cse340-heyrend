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
// Deliver account view
router.get(
  "/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildManagement)
  );

  // Account Update route
  router.get("/update/:id", utilities.checkLogin,accountController.buildAccountUpdate
  );

  // Handle account update post request
  router.post(
    "/update",utilities.checkLogin,regValidate.updateAccountRules(),regValidate.checkUpdateAccountData, accountController.updateAccount
    );
 // Change Password route
 router.post("/change-password",utilities.checkLogin,regValidate.changePasswordRules(),regValidate.checkChangePasswordData,accountController.changePassword
 );
// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/account/login");
});


module.exports = router;