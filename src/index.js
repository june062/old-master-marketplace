require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const path = require("node:path");
const homeRouter = require("./routers/homeRouter");
/* const artistsRouter = require("./routers/artistsRouter");
const artworksRouter = require("./routers/artworksRouter");
const museumsRouter = require("./routers/museumsRouter");
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
/* app.use("/artists", artistsRouter);
app.use("/artworks", artworksRouter);
app.use("/museums", museumsRouter);
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Express server is active at port ${PORT}!`));
