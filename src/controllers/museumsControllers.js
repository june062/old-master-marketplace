function allMuseumsGet(req, res) {
  res.render("allMuseumsView", { header: "All Museums", search: "/museums" });
}

module.exports = {
  allMuseumsGet,
};
