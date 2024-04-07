const invModel = require("../models/inventory-model");
const Util = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +='<a href="../../inv/detail/' +
        vehicle.inv_id +'" title="View ' 
        +vehicle.inv_make +" " +
        vehicle.inv_model +'details"><img src="' +
        vehicle.inv_thumbnail +'" alt="Image of ' +
        vehicle.inv_make +" " +
        vehicle.inv_model +' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +='<a href="../../inv/detail/' +
        vehicle.inv_id +'" title="View ' +
        vehicle.inv_make +" " +
        vehicle.inv_model +' details">' +
        vehicle.inv_make +" " +
        vehicle.inv_model +"</a>";
      grid += "</h2>";
      grid +="<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +"</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};
Util.buildGoBack = async function (vehicle) {
  let vehicleName = `${vehicle[0].inv_make} ${vehicle[0].inv_model}`
  let goBack = `Go back to <a href="/inv/detail/${vehicle[0].inv_id}">${vehicleName}</a>`
  return goBack
}
Util.buildUpgradeDropdown = async function (inv_id, upgrade_id) {
  let data = await invModel.getUpgradesByInventoryID(inv_id)
  let select = `<label for="upgrade_id">Upgrades:</label>
                <select id="upgrade_id" class="class-dropdown" name="upgrade_id" required>`

  if (data.length > 0) {
    select += `<option value="" disabled selected>Select upgrade</option>`

    for (var i = 0; i < data.length; i++) {
      const selected =
        upgrade_id && data[i]?.upgrade_id === upgrade_id ? "selected" : ""
      select += `<option value="${data[i].upgrade_id}" ${selected}>${data[i].short_name}</option>`
    }
  } else {
    select += `<option value="" disabled selected> No upgrades available </option>`
  }

  select += `</select>`

  return select
}

Util.buildUpgradeInfo = async function (data) {
  let upgradePage = '<div id="info-wrapper" class="info-wrapper">'
  if (data.length > 0) {
    upgradePage +=
      '<img class="individual-image" src="' +
      data[0].image +
      '" alt="Image of ' +
      data[0].name +
      '"/>'

    upgradePage += '<div class="details">'
    upgradePage += "<h2>" + data[0].name + " Details:</h2>"
    upgradePage += "<ul>"
    upgradePage +=
      '<li> <span class="boldme">Price:</span> $' +
      new Intl.NumberFormat("en-US").format(data[0].price) +
      "</li>"
    upgradePage +=
      '<li> <span class="boldme">Description:</span> ' +
      data[0].description +
      "</li>"
    upgradePage += "</ul></div>"
  } else {
    upgradePage +=
      '<p class="notice">Sorry, no matching upgrade could be found.</p>'
  }
  upgradePage += "</div>"
  return upgradePage
}


/* **************************************
 * Build the detail view HTML
 * ************************************ */
Util.buildDetailView = async function (vehicle) {
  const formatter = new Intl.NumberFormat("en-US");
  //let upgradeDropdown = await Util.buildUpgradeDropdown(invid)
  const html = `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${
    vehicle.inv_model
  }" />
      <div class="vehicle-detail-text">
        <p>Year: ${vehicle.inv_year}</p>
        <p>Price: $${formatter.format(vehicle.inv_price)}</p>
        <p>Mileage: ${formatter.format(vehicle.inv_miles)} miles</p>
        <p>Color: ${vehicle.inv_color}</p>
      </div>
    </div>
  `;
  return html;
};


/* **************************************
 * Build the classification dropdown
 * ************************************ */
Util.buildDropdown = async function () {
  let classifications = await invModel.getClassifications();
  const dropdownOptions = classifications.rows
    .map((classification) => {
      return `<option value="${classification.classification_id}">${classification.classification_name}</option>`;
    })
    .join("");

  const dropdown = `
    <select id="classification-id" name="classification_id">
      ${dropdownOptions}
    </select>
  `;

  return dropdown;
};

/* **************************************
 * Middleware for handling errors
 * ************************************ */
Util.handleError = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* ****************************************
 * Middleware to check JWT token validity
 **************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("Please log in");
          res.clearCookie("jwt");
          return res.redirect("/account/login");
        }
        res.locals.accountData = accountData;
        res.locals.loggedin = 1;
        next();
      }
    );
  } else {
    next();
  }
};

/* ****************************************
 * Middleware to check if user is logged in
 **************************************** */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next();
  } else {
    req.flash("notice", "Please log in");
    return res.redirect("/account/login");
  }
};

/* ****************************************
 * Middleware to check if user is Employee or Admin from JWT Token
 **************************************** */
Util.checkAdmin = (req, res, next) => {
  if (
    res.locals.loggedin &&
    (res.locals.accountData.account_type === "Employee" ||
      res.locals.accountData.account_type === "Admin")
  ) {
    next();
  } else {
    req.flash(
      "notice",
      "You must be logged in as an Employee or Admin to access this page"
    );
    return res.redirect("/account/login");
  }
};

module.exports = Util;