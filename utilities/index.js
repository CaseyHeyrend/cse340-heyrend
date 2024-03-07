const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data.rows)
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ****************************************
* Build the inventory detail view HTML
* *************************************** */
Util.buildVehicleWrap = async function(data) {
  let wrap
  if (data) {
    wrap = '<div id="inv-wrap">'
    wrap += '<img src="' + data.inv_image + '" alt="' + data.inv_make + " " + data.inv_model
    wrap += ' on CSE Motors">'
    wrap += '<span>$' + new Intl.NumberFormat('en-US').format(data.inv_price) + '</span>'
    wrap += '<table>'
    wrap += '<tr><th>Mileage</th><th>Color</th></tr>'
    wrap += '<tr><td>' + new Intl.NumberFormat('en-US').format(data.inv_miles) + '</td><td>' + data.inv_color + '</td></tr>'
    wrap += '<tr><th colspan="2">Description</th></tr>'
    wrap += '<tr><td colspan="2">' + data.inv_description + '</td></tr>'
    wrap += '</table>'
    wrap += '</div>'
  } else {
    wrap += '<p class="notice">Sorry, vehicle not found.</p>'
  }
  return wrap
}
/* ****************************************
* Build the mangement view HTML
* *************************************** */

/* ****************************************
* Build the Add classification view HTML
* *************************************** */

/* ****************************************
* Build the Add inventory view HTML
* *************************************** */

Util.buildClassDropdown = async function (classification_id) {
  let data = await invModel.getClassifications()
  let select =
    '<label for="classification_id">Classification:</label><select id="classification_id" class="class-dropdown p-font" name="classification_id" required><option value="" disabled selected>Select classification</option>'

  for (var i = 0; i < data.rowCount; i++) {
    const selected =
      classification_id && data.rows[i].classification_id === classification_id
        ? "selected"
        : ""
    select += `<option value="${data.rows[i].classification_id}" ${selected}>${data.rows[i].classification_name}</option>`
  }
  select += "</select>"
  return select
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util