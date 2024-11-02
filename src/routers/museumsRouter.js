const { Router } = require("express");
const museumsControllers = require("../controllers/museumsControllers");
const museumsRouter = Router();

museumsRouter.get("/", museumsControllers.allMuseumsGet);
museumsRouter.get("/newMuseumForm", museumsControllers.newMuseumFormGet);
museumsRouter.post("/newMuseumForm/submit", [
  museumsControllers.validationMiddleware,
  museumsControllers.newMuseumPost,
]);
museumsRouter.get("/:museumID", museumsControllers.museumInfoGet);
museumsRouter.get("/:museumID/delete", museumsControllers.deleteMuseum);

museumsRouter.get(
  "/:museumID/newMuseumForm/update",
  museumsControllers.updateMuseumFormGet
);
museumsRouter.post("/:museumID/newMuseumForm/update/submit", [
  museumsControllers.validationMiddleware,
  museumsControllers.updateMuseumFormPost,
]);

module.exports = museumsRouter;
