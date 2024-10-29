const pool = require("./pool");

async function getAllMuseums() {
  const { rows } = await pool.query("SELECT * FROM museums");
  return rows;
}

module.exports = {
  getAllMuseums,
};
