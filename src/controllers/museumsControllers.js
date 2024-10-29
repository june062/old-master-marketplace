const queries = require("../db/queries");

async function allMuseumsGet(req, res) {
  await queries.getAllMuseums();
  res.render("allMuseumsView", { header: "All Museums", search: "/museums" });
}

function newMuseumFormGet(req, res) {
  res.render("forms/newMuseumFormView", { header: "Add a new museum" });
}

module.exports = {
  allMuseumsGet,
  newMuseumFormGet,
};
