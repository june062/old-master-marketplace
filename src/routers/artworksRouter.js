const { Router } = require("express");
const artworksControllers = require("../controllers/artworksControllers");
const artworksRouter = Router();

artworksRouter.get("/", artworksControllers.allArtworksGet);
artworksRouter.get("/newArtworkForm", artworksControllers.newArtworkFormGet);
artworksRouter.post("/newArtworkForm/submit", [
  artworksControllers.validationMiddleware,
  artworksControllers.newArtworkPost,
]);
artworksRouter.get("/:artworkID", artworksControllers.artworkInfoGet);
module.exports = artworksRouter;
