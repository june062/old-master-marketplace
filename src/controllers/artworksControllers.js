function allArtworksGet(req, res) {
  res.render("allArtworksView", {
    header: "All Artworks",
    search: "/artworks",
  });
}
module.exports = {
  allArtworksGet,
};
