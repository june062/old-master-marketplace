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
artworksRouter.get("/:artworkID/delete", artworksControllers.deleteArtwork);
artworksRouter.get(
  "/:artworkID/newArtworkForm/update",
  artworksControllers.updateArtworkFormGet
);

module.exports = artworksRouter;
