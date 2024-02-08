const Category = require('../../app/model/productsCategory.model');
const hierarchyCategoryHelper = require('../../app/helpers/hierarchyCategory.helper');

const CategoryMiddleware = {
    category: async (req, res, next) => {
        const find = {
            deleted: false,
            status: 'active'
        }
        const category = await Category.find(find);
        const categoryTree = hierarchyCategoryHelper(category);
        res.locals.categoryTree = categoryTree;
        next();
    }
};

module.exports = CategoryMiddleware;