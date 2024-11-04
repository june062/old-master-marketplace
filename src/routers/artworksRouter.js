const { Router } = require("express");
const artworksControllers = require("../controllers/artworksControllers");
const artworksRouter = Router();

artworksRouter.get("/", artworksControllers.allArtworksGet);
artworksRouter.get("/newArtworkForm", artworksControllers.newArtworkFormGet);
artworksRouter.post("/newArtworkForm/submit", [
  artworksControllers.validationMiddleware,
  artworksControllers.newArtworkPost,
]);
artworksRouter.get("/search", artworksControllers.searchArtwork);
artworksRouter.get("/:artworkID", artworksControllers.artworkInfoGet);
artworksRouter.get("/:artworkID/delete", artworksControllers.deleteArtwork);
artworksRouter.get(
  "/:artworkID/newArtworkForm/update",
  artworksControllers.updateArtworkFormGet
);
artworksRouter.post("/:artworkID/newArtworkForm/update/submit", [
  artworksControllers.validationMiddleware,
  artworksControllers.updateArtworkPost,
]);

module.exports = artworksRouter;
