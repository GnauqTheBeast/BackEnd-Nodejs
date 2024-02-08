const productRoute = require("./product.route");
const profileRoute = require("./profile.route");
const homeRoute = require('./home.route');
const CategoryMiddleware = require('../../middlewares/client/category.middleware');

function route(app) {
  app.use(CategoryMiddleware.category);
  app.use("/product", productRoute);
  app.use("/profile", profileRoute);
  app.use("/", homeRoute);
}

module.exports = route;