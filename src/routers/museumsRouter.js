const { Router } = require("express");
const museumsControllers = require("../controllers/museumsControllers");
const museumsRouter = Router();

museumsRouter.get("/", museumsControllers.allMuseumsGet);
museumsRouter.get("/newMuseumForm", museumsControllers.newMuseumFormGet);
museumsRouter.post("/newMuseumForm/submit");
museumsRouter.get("/:museumID", museumsControllers.museumInfoGet);
module.exports = museumsRouter;
