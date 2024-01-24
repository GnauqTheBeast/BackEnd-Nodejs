const systemConfig = require('../../config/system');
const productRoute = require('./product.route');
const dashboardRoute = require('./dashboard.route');
const productCategoryRoute = require('./productCategory.route');

function route(app) {
    const Path = systemConfig.prefixAdmin;
    app.use(Path + '/dashboard', dashboardRoute);
    app.use(Path + '/product', productRoute);
    app.use(Path + '/product-category', productCategoryRoute);
}

module.exports = route;