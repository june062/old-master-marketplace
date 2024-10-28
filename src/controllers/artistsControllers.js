function allArtistsGet(req, res) {
  res.render("allArtistsView", { header: "All Artists", search: "/artists" });
}

module.exports = {
  allArtistsGet,
};
