const systemConfig = require('../../config/system');
const productRoute = require('./product.route');
const dashboardRoute = require('./dashboard.route');
const productCategoryRoute = require('./productCategory.route');
const roleRoute = require('./role.route');
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');
const AuthMiddleware = require('../../middlewares/admin/auth.middleware');
const myAccountRoute = require('./my-account.route');

function route(app) {
    const Path = systemConfig.prefixAdmin;
    app.use(Path + '/my-account', AuthMiddleware.login, myAccountRoute);
    app.use(Path + '/auth', authRoute);
    app.use(Path + '/account', AuthMiddleware.login, accountRoute);
    app.use(Path + '/role', AuthMiddleware.login, roleRoute);
    app.use(Path + '/dashboard', AuthMiddleware.login, dashboardRoute);
    app.use(Path + '/product', AuthMiddleware.login, productRoute);
    app.use(Path + '/product-category', AuthMiddleware.login, productCategoryRoute);
}

module.exports = route;