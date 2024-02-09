const Product = require('../../model/products.model');

const HomeController = {
    // [GET] /
    show: async (req, res) => {
        let find = {
            deleted: false, 
            status: 'active',
            featured: true,
        }
        let findNewest = {
            deleted: false, 
            status: 'active'
        }
        const featuredProduct = await Product.find(find).limit(4);
        const latestProduct = await Product.find(findNewest).sort({position: 'desc'}).limit(4);
        res.render('client/pages/home/index', {
            featuredProduct,
            latestProduct,
        });
    }
};

module.exports = HomeController;
