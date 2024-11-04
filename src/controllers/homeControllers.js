function homeViewGet(req, res) {
  res.render("homeView", { header: "Welcome back!", search: "/" });
}

module.exports = {
  homeViewGet,
};
