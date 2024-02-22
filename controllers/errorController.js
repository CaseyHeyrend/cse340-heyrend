const utilities = require("../utilities")
const errorModel = require("../models/error-model")

const errCont = {}

errCont.generateIntentionalErrorPage = async function (req, res, next) {
    const data = await errorModel.getIntentionalError()
    let nav = await utilities.getNav()
    res.render("./errors/error", {
        title: "500",
        message: data,
        nav,
    })
}

module.exports = errCont