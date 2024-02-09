const ProductCategory = require('../model/productsCategory.model');

const categoryProductHelper = async (categoryId) => {
    const categoryIds = [];
    categoryIds.push(categoryId);
    const Find = async (categoryId) => {
        const categories = await ProductCategory.find({
            deleted: false,
            status: 'active',
            parentId: categoryId,
        });
        if(categories) {
            for (const category of categories) {
                categoryIds.push(category.id);
                await Find(category.id);
            }
        }
    }
    await Find(categoryId);
    return categoryIds; 
}

module.exports = categoryProductHelper;