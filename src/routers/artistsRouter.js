const { Router } = require("express");
const { allArtistsGet } = require("../controllers/artistsControllers");
const artistsRouter = Router();

artistsRouter.get("/", allArtistsGet);
artistsRouter.get("/newArtistForm");

artistsRouter.post("/newArtistForm/submit");

artistsRouter.get("/:artistID");

module.exports = artistsRouter;
