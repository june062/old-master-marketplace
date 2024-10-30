const pool = require("./pool");

async function getAllMuseums() {
  const { rows } = await pool.query("SELECT * FROM museums");
  return rows;
}
async function getAllArtworks() {
  const { rows } = await pool.query("SELECT * FROM artworks");
  return rows;
}
async function getAllArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");
  return rows;
}
async function getArtistInfo(id) {
  id = 1;
  let resultingArtist = await pool.query("SELECT * FROM artists WHERE id =$1", [
    Number(id),
  ]);
  const artist = resultingArtist.rows[0];
  let resultingArtworks = await pool.query(
    "SELECT * FROM artworks WHERE artist_id =$1",
    [Number(id)]
  );
  const artworks = resultingArtworks.rows;
  return { artist, artworks };
}
async function getArtworkInfo(id) {
  const { rows } = await pool.query(
    "SELECT artworks.name AS artworkName,artists.firstname, artists.lastname, mediums, datecompleted,museums.name AS museumName, museums.city, museums.country FROM artworks INNER JOIN artists ON artist_id = artists.id INNER JOIN museums ON museum_id = museums.id WHERE artworks.id=$1 ",
    [Number(id)]
  );
  console.log(rows);
}

module.exports = {
  getAllMuseums,
  getAllArtworks,
  getAllArtists,
  getArtistInfo,
  getArtworkInfo,
};
