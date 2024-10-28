function homeViewGet(req, res) {
  res.render("homeView", { header: "Newly Added", search: "/" });
}

module.exports = {
  homeViewGet,
};
