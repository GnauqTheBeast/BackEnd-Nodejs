const systemConfig = require('../../config/system');
const dashboardRoute = require('./dashboard.route.js');

function route(app) {
    const Path = systemConfig.prefixAdmin;
    app.use(Path + '/dashboard', dashboardRoute);
}

module.exports = route;