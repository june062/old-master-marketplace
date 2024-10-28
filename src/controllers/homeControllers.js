function homeViewGet(req, res) {
  res.render("homeView", { header: "Newly Added" });
}

module.exports = {
  homeViewGet,
};
