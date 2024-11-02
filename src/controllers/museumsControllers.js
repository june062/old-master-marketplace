const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validationMiddleware = [
  body("museumName")
    .trim()
    .notEmpty()
    .withMessage("You must enter the name of the museum")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("* No special characters")
    .isLength({ min: 1, max: 60 })
    .withMessage("* You must enter a museum name"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("You must enter the city the museum is located in")
    .matches(/^[A-Za-z0-9 .,'\-]+$/)
    .withMessage("* No special characters")
    .isLength({ min: 1, max: 40 })
    .withMessage("* You must enter a city"),
  body("country")
    .trim()
    .notEmpty()
    .withMessage("You must enter the country the museum is located in")
    .matches(/^[A-Za-z0-9 .,'\-]+$/)
    .withMessage("* No special characters")
    .isLength({ min: 1, max: 40 })
    .withMessage("* You must enter a country"),
];

async function allMuseumsGet(req, res) {
  const rows = await queries.getAllMuseums();
  res.render("allMuseumsView", {
    header: "All Museums",
    search: "/museums",
    rows: rows,
  });
}

function newMuseumFormGet(req, res) {
  res.render("forms/newMuseumFormView", {
    header: "Add a new museum",

    src: "/museums/newMuseumForm/submit",
  });
}
async function museumInfoGet(req, res) {
  const { museumInfo, museumArtworks } = await queries.getMuseumInfo(
    req.params.museumID
  );

  res.render("museumInfo", {
    museumInfo: museumInfo,
    museumArtworks: museumArtworks,
    museumID: req.params.museumID,
  });
}
async function newMuseumPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).render("forms/newMuseumFormView", {
      header: "Add a new museum",
      errorMessages: errors.array(),
    });
  }
  await queries.createNewMuseum(
    res,
    req.body.museumName,
    req.body.city,
    req.body.country
  );
  res.render("forms/newMuseumFormView", {
    header: "Add a new museum",
    success: { successMessage: res.locals.successMessage },
  });
}
async function deleteMuseum(req, res) {
  try {
    await queries.deleteMuseum(req.params.museumID);
    res.redirect("/museums");
  } catch (error) {
    console.log(error);
  }
}

async function updateMuseumFormGet(req, res) {
  const { museumInfo } = await queries.getMuseumInfo(req.params.museumID);
  res.render("forms/newMuseumFormView", {
    header: "Update museum",
    src: `/museums/${req.params.museumID}/newMuseumForm/update/submit`,
    museum: museumInfo,
  });
}
async function updateMuseumFormPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).render("forms/newMuseumFormView", {
      header: "Update museum",
      src: `/museums/${req.params.museumID}/newMuseumForm/update/submit`,
      errorMessages: errors.array(),
    });
  }

  await queries.updateExistingMuseum(
    req.params.museumID,
    res,
    req.body.museumName,
    req.body.city,
    req.body.country
  );
  res.render("forms/newMuseumFormView", {
    header: "Update museum",
    src: `/museums/${req.params.museumID}/newMuseumForm/update/submit`,
    success: { successMessage: res.locals.successMessage },
  });
}
module.exports = {
  allMuseumsGet,
  newMuseumFormGet,
  museumInfoGet,
  newMuseumPost,
  validationMiddleware,
  deleteMuseum,
  updateMuseumFormGet,
  updateMuseumFormPost,
};
