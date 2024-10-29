function allArtistsGet(req, res) {
  res.render("allArtistsView", { header: "All Artists", search: "/artists" });
}
function newArtistFormGet(req, res) {
  res.render("forms/newArtistFormView", { header: "Add a new artist" });
}

module.exports = {
  allArtistsGet,
  newArtistFormGet,
};
