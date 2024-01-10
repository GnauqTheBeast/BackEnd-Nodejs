const productRoute = require("./product.route");
const profileRoute = require("./profile.route");

function route(app) {
  app.use("/product", productRoute);
  app.use("/profile", profileRoute);
  app.use("/", (req, res, next) => {
    res.render('client/pages/home/index', {titlePage: 'HelloTitlePage !!!', message: 'hello from Quang!!!'} );
  });
}

module.exports = route;