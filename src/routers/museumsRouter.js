const { Router } = require("express");
const { allMuseumsGet } = require("../controllers/museumsControllers");
const museumsRouter = Router();

museumsRouter.get("/", allMuseumsGet);
museumsRouter.get("/newMuseumForm");
museumsRouter.post("/newMuseumForm/submit");
museumsRouter.get("/:museumID");
module.exports = museumsRouter;
