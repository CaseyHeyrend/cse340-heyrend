const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

//module.exports = {getClassifications}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id],
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}
/* ************************************
* Get inventory detail by inventory id
* ********************************** */
async function getInventoryByInventoryId(inv_id) {
  try {
      const data = await pool.query(
          `SELECT * FROM public.inventory
          WHERE inv_id = $1`,
          [inv_id]
      );
      return data.rows[0];
  } catch (error) {
      console.error("getinventorybyid error " + error);
  }
}
/* ************************************
* Funtion to insert new classification into the database
* ********************************** */
async function addClassification(add_classification) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
    return await pool.query(sql, [add_classification]);
  } catch (error) {
    return error.message;
  }
}
/* ************************************
* A check function to see classification name is already in the database
* ********************************** */
async function checkExistingClassification(add_classification) {
  try {
    const sql =
      "SELECT * FROM public.classification WHERE classification_name = $1";
    const classification = await pool.query(sql, [add_classification]);
    return classification.rowCount;
  } catch (error) {
    return error.message;
  }
}
/* ************************************
* A check function to see classification name is already in the database
* ********************************** */
async function checkExistingClassification(add_classification) {
  try {
    const sql ="SELECT * FROM public.classification WHERE classification_name = $1";
    const classification = await pool.query(sql, [add_classification]);
    return classification.rowCount;
  } catch (error) {
    return error.message;
  }
}
/* ************************************
* Funtion to get the classifications by id
* ********************************** */
async function getClassificationsById() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name",
  );
}
/* ************************************
* Insert new inventory item into the database
* ********************************** */
async function addInventory(
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id,
) {
  try {
    const sql =
      "INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    return await pool.query(sql, [
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    ]);
  } catch (error) {
    return error.message;
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByInventoryId, addClassification, checkExistingClassification, getClassificationsById, addInventory,};
