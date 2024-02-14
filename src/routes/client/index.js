const productRoute = require("./product.route");
const profileRoute = require("./profile.route");
const homeRoute = require('./home.route');
const searchRoute = require('./search.route');
const cartRoute = require('./cart.route');
const checkoutRoute = require('./checkout.route');
const CategoryMiddleware = require('../../middlewares/client/category.middleware');
const CartMiddleware = require('../../middlewares/client/cart.middleware');

function route(app) {
  app.use(CategoryMiddleware.category);
  app.use(CartMiddleware.cart);
  app.use("/checkout", checkoutRoute);
  app.use("/cart", cartRoute);
  app.use("/search", searchRoute);
  app.use("/product", productRoute);
  app.use("/profile", profileRoute);
  app.use("/", homeRoute);
}

module.exports = route;