function allArtworksGet(req, res) {
  res.render("allArtworksView", {
    header: "All Artworks",
    search: "/artworks",
  });
}
function newArtworkFormGet(req, res) {
  res.render("forms/newArtworkFormView", { header: "Add a new artwork" });
}
module.exports = {
  allArtworksGet,
  newArtworkFormGet,
};
