const { query } = require("../db/pool");
const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validationMiddleware = [
  body("artworkName")
    .trim()
    .notEmpty()
    .withMessage(
      "* Input a valid name for the artwork or 'unnamed' if it does not have a name"
    )
    .isLength({ min: 1, max: 150 })
    .withMessage("* Artwork name must be between 1 and 150 characters")
    .matches(/^[A-Za-z0-9 .,'!&]+$/)
    .withMessage("* Only enter letters, numbers, and select special characters")
    .escape(),
  body("mediums")
    .trim()
    .notEmpty()
    .withMessage(
      "* Input a valid name for the mediums or 'unkown' if mediums are not known"
    )
    .isLength({ min: 1, max: 120 })
    .withMessage("* Mediums must contain between 1 and 120 characters")
    .isAlpha()
    .withMessage("* You can only enter letters into mediums field")
    .escape(),
];

async function allArtworksGet(req, res) {
  const rows = await queries.getAllArtworks();
  res.render("allArtworksView", {
    header: "All Artworks",
    search: "/artworks",
    rows: rows,
  });
}
async function newArtworkFormGet(req, res) {
  const allArtists = await queries.getAllArtists();
  const allMuseums = await queries.getAllMuseums();
  res.render("forms/newArtworkFormView", {
    header: "Add a new artwork",
    errorMessages: null,
    success: null,
    allArtists: allArtists,
    allMuseums: allMuseums,
    src: "/artworks/newArtworkForm/submit",
  });
}

async function artworkInfoGet(req, res) {
  const [artworkInfo] = await queries.getArtworkInfo(req.params.artworkID);
  res.render("artworkInfo", {
    artworkInfo: artworkInfo,
    artworkID: req.params.artworkID,
  });
}
async function newArtworkPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("forms/newArtworkFormView", {
      header: "Add a new artwork",
      errorMessages: errors.array(),
      success: null,
      allArtists: [],
      allMuseums: [],
      src: `/artworks/${req.params.artworkID}/newArtworkForm/submit`,
    });
  }

  await queries.createNewArtwork(
    res,
    req.body.artworkName,
    req.body.mediums,
    req.body.dateCreated,
    req.body.artist,
    req.body.sold,
    req.body.museum
  );
  const allArtists = await queries.getAllArtists();
  const allMuseums = await queries.getAllMuseums();
  res.render("forms/newArtworkFormView", {
    src: `/artworks/${req.params.artworkID}/newArtworkForm/submit`,
    header: "Add a new artwork",
    success: { successMessage: res.locals.successMessage },
    allArtists: allArtists,
    allMuseums: allMuseums,
  });
}
async function deleteArtwork(req, res) {
  try {
    await queries.deleteArtwork(req.params.artworkID);
    res.redirect("/artworks");
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  allArtworksGet,
  newArtworkFormGet,
  artworkInfoGet,
  newArtworkPost,
  validationMiddleware,
  deleteArtwork,
};
