const { Router } = require("express");
const { allArtworksGet } = require("../controllers/artworksControllers");
const artworksRouter = Router();

artworksRouter.use("/", allArtworksGet);
module.exports = artworksRouter;
