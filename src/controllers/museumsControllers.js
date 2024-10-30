const queries = require("../db/queries");

async function allMuseumsGet(req, res) {
  const rows = await queries.getAllMuseums();
  res.render("allMuseumsView", {
    header: "All Museums",
    search: "/museums",
    rows: rows,
  });
}

function newMuseumFormGet(req, res) {
  res.render("forms/newMuseumFormView", { header: "Add a new museum" });
}
async function museumInfoGet(req, res) {
  const { museumInfo, museumArtworks } = await queries.getMuseumInfo(
    req.params.museumID
  );
  res.render("museumInfo", {
    museumInfo: museumInfo,
    museumArtworks: museumArtworks,
  });
}
module.exports = {
  allMuseumsGet,
  newMuseumFormGet,
  museumInfoGet,
};
