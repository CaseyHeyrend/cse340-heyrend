const pool = require("../database/");

/* ********************
 * Get all the classification data
 * ********************/
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

async function getUpgrade() {
  return await pool.query(
    "SELECT * FROM public.upgrade ORDER BY short_name"
  )
}
/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(`SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1`,[classification_id]);
    return data.rows;
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error);
  }
}
async function getUpgradeByInventoryID(inv_id) {
  try {
    const data = await pool.query(
      `SELECT u.* FROM public.invupgrade AS iu
      JOIN public.upgrade AS u
      ON iu.upgrade_id = u.upgrade_id
      WHERE iu.inv_id = $1`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getupgradesbyinventoryid error " + error)
  }
}

/* ********************
 * Get vehicle detail data by inv_id
 * ********************/
async function getInventoryItemById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [inv_id]
    );
    return data.rows[0];
  } catch (error) {
    console.error("getInventoryItemById error " + error);
  }
}
async function getUpgradeByID(upgrade_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.upgrade as u WHERE u.upgrade_id = $1",
      [upgrade_id]
    )
    return data.rows
  } catch (error) {
    console.error("inventorymodel/getUpgradeByID error " + error)
  }
}

/* ********************
 * Function to Add new classification to database
 * ********************/
async function addClassification(classification_name) {
  try {
    const data = await pool.query(
      `INSERT INTO public.classification (classification_name) VALUES ($1)`,
      [classification_name]
    );
    return data;
  } catch (error) {
    console.error("addClassification error " + error);
  }
}

/* ********************
 * Function to Add new inventory item to database
 * ********************/
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
  classification_id
) {
  try {
    const data = await pool.query(
      `INSERT INTO public.inventory (
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
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
      ]
    );
    return data;
  } catch (error) {
    console.error("addInventory error " + error);
  }
}

/* ********************
 * Function to Update inventory item in database
 * ********************/
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_year = $3, inv_description = $4, inv_image = $5, inv_thumbnail = $6, inv_price = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *";
    const data = await pool.query(sql, [
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
      inv_id,
    ]);
    return data.rows[0];
  } catch (error) {
    console.error("model error: " + error);
  }
}

/* ********************
 * Function to Delete item from the database
 * ********************/
async function deleteInventory(inv_id) {
  try {
    const sql = "DELETE FROM inventory WHERE inv_id = $1";
    const data = await pool.query(sql, [inv_id]);
    return data;
  } catch (error) {
    new Error("Delete Inventory Error");
  }
}


module.exports = {
  getClassifications, 
  getInventoryByClassificationId, 
  getInventoryItemById, 
  addClassification, 
  addInventory, 
  updateInventory, 
  deleteInventory, 
  getUpgrade,
  getUpgradeByID, 
  getUpgradeByInventoryID,};