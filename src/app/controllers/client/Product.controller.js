const Product = require('../../model/products.model');
const ProductCategory = require('../../model/productsCategory.model');
const categoryProductHelper = require('../../helpers/category-product.helper');

const ProductController = {
  // [GET] /product
  show: (req, res) => {
    const find = {
      deleted: false,
      status: 'active'
    }
    Product.find(find)
      .then(productList => res.render('client/pages/products/index', 
      { 
        categoryTitle: "Product list:",
        productList 
      }));
  },
  // [GET] product/detail/:slug
  detail: (req, res) => {
    const find = {
      deleted: false, 
      slug: req.params.slug,
      status: 'active',
    }
    Product.findOne(find)
      .then(product => res.render('client/pages/products/detail', 
      { 
        product 
      }));
  },
  // [GET] /product/:slugCategory
  category: async (req, res) => {
    let find = {
      deleted: false, 
      status: 'active',
      slug: req.params.slugCategory,
    }
    const category = await ProductCategory.findOne(find);
    const categoryList = await categoryProductHelper(category.id);
    const categoryTitle = category.title;
    const productList = await Product.find({categoryId: {$in: categoryList}});
    res.render('client/pages/products/index', {
      categoryTitle, 
      productList,
    })
  }
};

module.exports = ProductController;
