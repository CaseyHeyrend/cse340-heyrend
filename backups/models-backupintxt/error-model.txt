const pool = require("../database/")


/* ***************************
* Intentionally generate SQL error
* *************************** */
async function getIntentionalError() {
    try {
        const data = await pool.query(
            `SELECT * FROM public.doesnotexist`
        )
        return data.rows
    } catch (error) {
        return error
    }
}

module.exports = { getIntentionalError }