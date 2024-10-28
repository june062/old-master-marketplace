const { Router } = require("express");
const { homeViewGet } = require("../controllers/homeControllers");
const homeRouter = Router();
homeRouter.get("/", homeViewGet);

module.exports = homeRouter;
