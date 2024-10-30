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
  let resultingArtist = await pool.query(
    "SELECT CONCAT(firstname, ' ', lastname) AS name, dob, birthplace, description FROM artists WHERE id =$1",
    [Number(id)]
  );
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
    "SELECT artworks.name AS artworkName,CONCAT(artists.firstname,' ', artists.lastname) AS artistName, mediums, datecompleted,CONCAT(museums.name,' in ', museums.city, ', ',museums.country) AS artworkLocation, sold, artist_id, museum_id FROM artworks INNER JOIN artists ON artist_id = artists.id INNER JOIN museums ON museum_id = museums.id WHERE artworks.id=$1 ",
    [Number(id)]
  );
  return rows;
}

module.exports = {
  getAllMuseums,
  getAllArtworks,
  getAllArtists,
  getArtistInfo,
  getArtworkInfo,
};
