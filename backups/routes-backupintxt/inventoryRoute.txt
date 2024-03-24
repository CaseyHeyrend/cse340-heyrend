// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/");
const regValidate = require("../utilities/inv-validation");


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle detail view
router.get("/detail/:vehicleId", invController.buildVehicleDetailView);

// Route to build management view
router.get("/management", invController.buildManagement);

// Route to build add-classification view
router.get("/add-classification", invController.buildAddClassification);

// Add-Inventory View
router.get("/add-inventory",utilities.handleErrors (invController.buildAddInventory));

//Add the new Classification
router.post(
    "/add-classification",
    regValidate.classificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.AddNewClassification),
  );
// Add-Inventory View
router.post(
    "/add-inventory",
    regValidate.inventoryRules(), regValidate.checkInventoryData, utilities.handleErrors(invController.AddNewInventory),
  );
  router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


module.exports = router;