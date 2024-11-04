const { query } = require("../db/pool");
const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

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
    .matches("^[.a-zA-Z,!? ]*$")
    .withMessage(
      "* You can only enter letters and select special characters in mediums field"
    )
    .escape(),
];

const allArtworksGet = asyncHandler(async function (req, res) {
  const rows = await queries.getAllArtworks();
  res.render("allArtworksView", {
    header: "All Artworks",
    search: "/artworks/search",
    rows: rows,
  });
});
const newArtworkFormGet = asyncHandler(async function (req, res) {
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
});

const artworkInfoGet = asyncHandler(async function (req, res) {
  const [artworkInfo] = await queries.getArtworkInfo(req.params.artworkID);

  res.render("artworkInfo", {
    artworkInfo: artworkInfo,
    artworkID: req.params.artworkID,
  });
});
const newArtworkPost = asyncHandler(async function (req, res) {
  const allArtists = await queries.getAllArtists();
  const allMuseums = await queries.getAllMuseums();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("forms/newArtworkFormView", {
      header: "Add a new artwork",
      errorMessages: errors.array(),
      allArtists: [],
      allMuseums: [],
      src: "/artworks/newArtworkForm/submit",
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

  res.render("forms/newArtworkFormView", {
    src: `/artworks/newArtworkForm/submit`,
    header: "Add a new artwork",
    success: { successMessage: res.locals.successMessage },
    allArtists: allArtists,
    allMuseums: allMuseums,
  });
});
const deleteArtwork = asyncHandler(async function (req, res) {
  try {
    await queries.deleteArtwork(req.params.artworkID);
    res.redirect("/artworks");
  } catch (error) {
    console.log(error);
  }
});
const updateArtworkFormGet = asyncHandler(async function (req, res) {
  const allArtists = await queries.getAllArtists();
  const allMuseums = await queries.getAllMuseums();
  const [artwork] = await queries.getArtworkInfo(req.params.artworkID);

  res.render("forms/newArtworkFormView", {
    header: "Update artwork",
    src: `/artworks/${req.params.artworkID}/newArtworkForm/update/submit`,
    allArtists: allArtists,
    allMuseums: allMuseums,
    artwork: artwork,
  });
});

const updateArtworkPost = asyncHandler(async function (req, res) {
  const allArtists = await queries.getAllArtists();
  const allMuseums = await queries.getAllMuseums();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("forms/newArtworkFormView", {
      header: "Update artwork",
      errorMessages: errors.array(),
      allArtists: allArtists,
      allMuseums: allMuseums,
      src: `/artworks/${req.params.artworkID}/newArtworkForm/update/submit`,
    });
  }

  await queries.updateExistingArtwork(
    req.params.artworkID,
    res,
    req.body.artworkName,
    req.body.mediums,
    req.body.dateCreated,
    req.body.artist,
    req.body.sold,
    req.body.museum
  );
  res.render("forms/newArtworkFormView", {
    header: "Update artwork",
    allArtists: allArtists,
    allMuseums: allMuseums,
    src: `/artworks/${req.params.artworkID}/newArtworkForm/update/submit`,
    success: { successMessage: res.locals.successMessage },
  });
});
const searchArtwork = asyncHandler(async function (req, res) {
  const rows = await queries.searchArtworks(req.query.search);

  res.render("allArtworksView", {
    header: "Search Results",
    search: "/artworks/search",
    rows: rows,
  });
});
module.exports = {
  allArtworksGet,
  newArtworkFormGet,
  artworkInfoGet,
  newArtworkPost,
  validationMiddleware,
  deleteArtwork,
  updateArtworkFormGet,
  updateArtworkPost,
  searchArtwork,
};
