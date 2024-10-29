const pool = require("./pool");

async function getAllMuseums() {
  const { rows } = await pool.query("SELECT * FROM museums");
}

module.exports = {
  getAllMuseums,
};
