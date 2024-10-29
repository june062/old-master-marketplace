const { Router } = require("express");
const artworksControllers = require("../controllers/artworksControllers");
const artworksRouter = Router();

artworksRouter.get("/", artworksControllers.allArtworksGet);
artworksRouter.get("/newArtworkForm", artworksControllers.newArtworkFormGet);
artworksRouter.post("/newArtistForm/submit");
artworksRouter.get("/:artworkID");
module.exports = artworksRouter;
