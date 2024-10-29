function allMuseumsGet(req, res) {
  res.render("allMuseumsView", { header: "All Museums", search: "/museums" });
}

function newMuseumFormGet(req, res) {
  res.render("forms/newMuseumFormView", { header: "Add a new museum" });
}

module.exports = {
  allMuseumsGet,
  newMuseumFormGet,
};
