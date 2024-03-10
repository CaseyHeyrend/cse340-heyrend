const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}


/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
*   Build vehicle detail view
* *************************** */
invCont.buildVehicleDetailView = async function (req, res, next) {
  const inv_id = req.params.vehicleId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const wrap = await utilities.buildVehicleWrap(data)
  let nav = await utilities.getNav()
  const inv_year = data.inv_year
  const inv_make = data.inv_make
  const inv_model = data.inv_model
  res.render("./inventory/detail.ejs", {
    title: inv_year + " " + inv_make + " " + inv_model,
    nav,
    wrap,
  })
}

/* ****************************************
* Build the mangement view HTML
* *************************************** */
invCont.buildManagement = async function(req, res, next){
   let nav = await utilities.getNav() 
   res.render("./inventory/management.ejs", {
    title: "CSE Motor Vehicle Management Menu", 
    nav, 
    error: null,
  }) 
}

/* ****************************************
* Build the Add classification view HTML
* *************************************** */
invCont.buildAddClassification = async function(req, res, next){
  let nav = await utilities.getNav() 
  res.render("./inventory/add-classification.ejs", {
   title: "Add New Classification Type",
   nav,
   error: null,
  }) 
}

/* ****************************************
* Build the Add inventory view HTML
* *************************************** */
invCont.buildAddInventory = async function(req, res, next){
  const vehicle_id = req.params.vehicleId
  let nav = await utilities.getNav();
  let selectList = await utilities.getClassification();
  res.render("./inventory/add-inventory.ejs", {
    title: "Add New Inventory",
    nav,
    selectList,
    error: null,
  })
}

/* ****************************************
* Build the Add classification 
* *************************************** */
invCont.AddNewClassification = async function(req, res, next){
  let nav = await utilities.getNav();
  const { add_classification } = req.body;
  const classResult = await invModel.addClassification(add_classification);
  if (classResult) {
    req.flash("notice",
      `Congratulations, you\'ve created the ${add_classification} classification!`,
    );
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice",
      "Sorry, that classification did not work. Please try again",
    );
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    });
  }
};

/* ****************************************
* Build the Add inventory to the database
* *************************************** */
invCont.AddNewInventory = async function(req, res, next){
  let nav = await utilities.getNav();
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id, } 
  = req.body;

  const invResult = await invModel.addInventory( inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id,);

  if (invResult) {
    req.flash("notice",
      `Congratulations, you\'ve added ${inv_make} ${inv_model} to the inventory!\n`,
    );
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice",
      "Sorry, there was an issue adding a new vehicle. Please try again.",
    );
    res.status(501).render("./inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      errors: null,
    });
  }
};


module.exports = invCont