const Product = require('../../model/products.model');
const searchHelper = require('../../helpers/search.helper');

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
        let Find = {
            deleted: false, 
            status: 'active',
        }
        // Search
        const searchInfo = searchHelper(req.query);
        let searchProduct;
        if(searchInfo.keyword) {
            Find.title = searchInfo.title;
            searchProduct = await Product.find(Find);
        }
        const featuredProduct = await Product.find(find).limit(4);
        const latestProduct = await Product.find(findNewest).sort({position: 'desc'}).limit(4);
        res.render('client/pages/home/index', {
            featuredProduct,
            latestProduct,
            searchProduct,
            searchInfo,
        });
    },
    
};

module.exports = HomeController;
