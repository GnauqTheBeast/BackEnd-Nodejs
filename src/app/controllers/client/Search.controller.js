const Product = require('../../model/products.model');
const searchHelper = require('../../helpers/search.helper');

const SearchController = {
    // [GET] /
    show: async (req, res) => {
        let find = {
            deleted: false,
            status: 'active',
        }
        // Search
        const searchInfo = searchHelper(req.query);
        if (searchInfo.keyword) {
            find.title = searchInfo.title;
        }
        const searchProduct = await Product.find(find);
        res.render('client/pages/search/index', {
            searchProduct,
            searchInfo,
        });
    },
};

module.exports = SearchController;
