const queries = require("../db/queries");

async function allArtworksGet(req, res) {
  const rows = await queries.getAllArtworks();
  res.render("allArtworksView", {
    header: "All Artworks",
    search: "/artworks",
    rows: rows,
  });
}
function newArtworkFormGet(req, res) {
  res.render("forms/newArtworkFormView", { header: "Add a new artwork" });
}
module.exports = {
  allArtworksGet,
  newArtworkFormGet,
};
