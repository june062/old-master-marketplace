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
function newArtworkFormGet(req, res) {
  res.render("forms/newArtworkFormView", {
    header: "Add a new artwork",
    errorMessages: null,
  });
}

async function artworkInfoGet(req, res) {
  const [artworkInfo] = await queries.getArtworkInfo(req.params.artworkID);
  res.render("artworkInfo", { artworkInfo: artworkInfo });
}
async function newArtworkPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("forms/newArtworkFormView", {
      header: "Add a new artwork",
      errorMessages: errors.array(),
    });
  }
  await queries.createNewArtwork(
    req,
    res,
    req.body.artworkName,
    req.body.mediums,
    req.body.dateCreated,
    req.body.artist,
    req.body.museum
  );
  res.render("forms/newArtworkFormView", {
    success: { successMessage: res.locals.successMessage },
  });
}

module.exports = {
  allArtworksGet,
  newArtworkFormGet,
  artworkInfoGet,
  newArtworkPost,
  validationMiddleware,
};
