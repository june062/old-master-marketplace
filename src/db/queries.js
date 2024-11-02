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
  let resultingArtist = await pool.query(
    "SELECT firstname,  lastname, dob, birthplace, description FROM artists WHERE id =$1",
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
async function getMuseumInfo(id) {
  const museumInfoResult = await pool.query(
    "SELECT * FROM museums where id = $1",
    [Number(id)]
  );
  const museumInfo = museumInfoResult.rows[0];
  const museumArtworksResult = await pool.query(
    "SELECT name, datecompleted, id FROM artworks WHERE museum_id =$1",
    [Number(id)]
  );
  const museumArtworks = museumArtworksResult.rows;

  return {
    museumInfo: museumInfo,
    museumArtworks: museumArtworks,
  };
}

async function createNewArtwork(
  res,
  name,
  mediums,
  dateCompleted,
  artist_id,
  sold,
  museum_id
) {
  await pool.query(
    "INSERT INTO artworks(name,mediums, datecompleted,artist_id,sold,museum_id) VALUES($1,$2,$3,$4,$5, $6)",
    [name, mediums, dateCompleted, artist_id, sold, museum_id]
  );
  res.locals.successMessage = "Artwork has been created!";
}
async function createNewArtist(
  res,
  firstname,
  lastname,
  dob,
  birthplace,
  description
) {
  await pool.query(
    "INSERT INTO artists (firstname, lastname, dob, birthplace, description) VALUES ($1,$2,$3,$4,$5)",
    [firstname, lastname, dob, birthplace, description]
  );
  res.locals.successMessage = "Artist has been created!";
}
async function createNewMuseum(res, name, city, country) {
  await pool.query(
    "INSERT INTO museums (name,city,country) VALUES ($1,$2,$3)",
    [name, city, country]
  );
  res.locals.successMessage = "Museum has been created!";
}

async function deleteArtist(id) {
  await pool.query("DELETE FROM artists WHERE artists.id = $1", [Number(id)]);
  await pool.query("DELETE FROM artworks WHERE artworks.artist_id = $1", [
    Number(id),
  ]);
}
async function deleteArtwork(id) {
  await pool.query("DELETE FROM artworks WHERE artworks.id = $1", [Number(id)]);
}
async function deleteMuseum(id) {
  await pool.query("DELETE FROM museums WHERE id = $1", [Number(id)]);
}
async function updateExistingArtist(
  id,
  res,
  firstname,
  lastname,
  dob,
  birthplace,
  description
) {
  await pool.query(
    "UPDATE artists SET firstname =$1, lastname = $2, dob =$3, birthplace = $4, description = $5 WHERE id = $6",
    [firstname, lastname, dob, birthplace, description, Number(id)]
  );
  res.locals.successMessage = "Artist has been updated!";
}
module.exports = {
  getAllMuseums,
  getAllArtworks,
  getAllArtists,
  getArtistInfo,
  getArtworkInfo,
  getMuseumInfo,
  createNewArtwork,
  createNewArtist,
  createNewMuseum,
  deleteArtist,
  deleteArtwork,
  deleteMuseum,
  updateExistingArtist,
};
