const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");
const validationMiddleware = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("* Enter a first name or 'unkown' if it is not known")
    .matches(/^[A-Za-z0-9 .,'\-]+$/)
    .withMessage("No special characters")
    .isLength({ min: 1, max: 60 })
    .withMessage("* First name can must be between 1 and 60 characters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("* Enter a last name or 'unkown' if it is not known")
    .matches(/^[A-Za-z0-9 .,'\-]+$/)
    .withMessage("* No special characters")
    .isLength({ min: 1, max: 60 })
    .withMessage("* First name can must be between 1 and 60 characters"),
  body("birthPlace")
    .trim()
    .notEmpty()
    .withMessage("* Enter a birth place or 'unkown' if it is unkown")
    .matches(/^[A-Za-z0-9 .,'\-]+$/)
    .withMessage("* No special characters")
    .isLength({ min: 1, max: 120 })
    .withMessage("* Birth place must be between 1 and 120 characters"),
  body("description")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 255 })
    .withMessage("* Your description is too long. Nerd.")
    .matches(/^[A-Za-z0-9 .,'!&]+$/)
    .withMessage(
      "* Only enter letters, numbers, and select special characters"
    ),
];

async function allArtistsGet(req, res) {
  const rows = await queries.getAllArtists();
  res.render("allArtistsView", {
    header: "All Artists",
    search: "/artists/search",
    rows: rows,
  });
}
function newArtistFormGet(req, res) {
  res.render("forms/newArtistFormView", {
    header: "Add a new artist",
    errorMessages: null,
    success: null,
    src: "/artists/newArtistForm/submit",
  });
}

async function artistInfoGet(req, res) {
  const { artist, artworks } = await queries.getArtistInfo(req.params.artistID);

  res.render("artistInfo", {
    artist: artist,
    artworks: artworks,
    artistID: req.params.artistID,
  });
  res.end();
}

async function newArtistPost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("forms/newArtistFormView", {
      header: "Add a new artist",
      errorMessages: errors.array(),
      src: "/artists/newArtistForm/submit",
    });
  }
  await queries.createNewArtist(
    res,
    req.body.firstName,
    req.body.lastName,
    req.body.dob,
    req.body.birthPlace,
    req.body.description
  );
  res.render("forms/newArtistFormView", {
    header: "Add a new artist",
    success: { successMessage: res.locals.successMessage },
    src: "/artists/newArtistForm/submit",
  });
}
async function deleteArtist(req, res) {
  try {
    await queries.deleteArtist(req.params.artistID);
    res.redirect("/artists");
  } catch (error) {
    console.log(error);
  }
}
async function artistUpdateFormGet(req, res) {
  const { artist } = await queries.getArtistInfo(req.params.artistID);

  res.render("forms/newArtistFormView", {
    header: "Update artist",
    artist: artist,
    src: `/artists/${req.params.artistID}/newArtistForm/update/submit`,
  });
}
async function artistUpdatePost(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("forms/newArtistFormView", {
      header: "Add a new artwork",
      errorMessages: errors.array(),
      src: `/artists/${req.params.artistID}/newArtistForm/update/submit`,
    });
  }
  await queries.updateExistingArtist(
    req.params.artistID,
    res,
    req.body.firstName,
    req.body.lastName,
    req.body.dob,
    req.body.birthPlace,
    req.body.description
  );
  res.render("forms/newArtistFormView", {
    header: "Update artist",
    success: { successMessage: res.locals.successMessage },
    src: `/artists/${req.params.artistID}/newArtistForm/update/submit`,
  });
}

async function artistSearch(req, res) {
  let rows = await queries.searchArtist(req.query.search);
  res.render("allArtistsView", {
    header: "Search Results",
    rows: rows,
    search: "/artists/search",
  });
}
module.exports = {
  allArtistsGet,
  newArtistFormGet,
  artistInfoGet,
  validationMiddleware,
  newArtistPost,
  deleteArtist,
  artistUpdateFormGet,
  artistUpdatePost,
  artistSearch,
};
