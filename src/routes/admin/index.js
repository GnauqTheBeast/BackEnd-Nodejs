const systemConfig = require('../../config/system');
const productRoute = require('./product.route');
const dashboardRoute = require('./dashboard.route');

function route(app) {
    const Path = systemConfig.prefixAdmin;
    app.use(Path + '/dashboard', dashboardRoute);
    app.use(Path + '/product', productRoute);
}

module.exports = route;