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
invCont.buildManagementView = async function(req, res, next){
  
}
/* ****************************************
* Build the Add classification view HTML
* *************************************** */

/* ****************************************
* Build the Add inventory view HTML
* *************************************** */



module.exports = invCont