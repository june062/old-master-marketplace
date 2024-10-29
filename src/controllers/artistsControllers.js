const queries = require("../db/queries");

async function allArtistsGet(req, res) {
  const rows = await queries.getAllArtists();
  res.render("allArtistsView", {
    header: "All Artists",
    search: "/artists",
    rows: rows,
  });
}
function newArtistFormGet(req, res) {
  res.render("forms/newArtistFormView", { header: "Add a new artist" });
}

async function artistInfoGet(req, res) {
  const { artist, artworks } = await queries.getArtistInfo(req.params.artsitID);

  res.render("artistInfo", { artist: artist, artworks: artworks });
  res.end();
}
module.exports = {
  allArtistsGet,
  newArtistFormGet,
  artistInfoGet,
};
