const { Router } = require("express");
const artistsControllers = require("../controllers/artistsControllers");
const artistsRouter = Router();

artistsRouter.get("/", artistsControllers.allArtistsGet);
artistsRouter.get("/newArtistForm", artistsControllers.newArtistFormGet);

artistsRouter.post("/newArtistForm/submit", [
  artistsControllers.validationMiddleware,
  artistsControllers.newArtistPost,
]);

artistsRouter.get("/:artistID", artistsControllers.artistInfoGet);

module.exports = artistsRouter;
