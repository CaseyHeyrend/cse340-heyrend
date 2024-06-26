const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav();
  /*req.flash("notice", "This is a flash message.")This is test. :)*/
  res.render("index", { title: "Home", nav, messages: req.flash() });
};

module.exports = baseController;