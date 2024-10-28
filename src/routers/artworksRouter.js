const { Router } = require("express");
const { allArtworksGet } = require("../controllers/artworksControllers");
const artworksRouter = Router();

artworksRouter.get("/", allArtworksGet);
artworksRouter.get("/newArtistForm");
artworksRouter.post("/newArtistForm/submit");
artworksRouter.get("/:artworkID");
module.exports = artworksRouter;
