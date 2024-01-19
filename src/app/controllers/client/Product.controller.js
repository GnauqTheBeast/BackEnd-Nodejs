const Product = require('../../model/products.model');

const ProductController = {
  // [GET] /product
  show: (req, res) => {
    const find = {
      deleted: false,
      status: 'active'
    }
    Product.find(find)
      .then(product => res.render('client/pages/products/index', 
      { 
        titlePage: "Product list:",
        product 
      }))
  },
  // [GET] /detail/:slug
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
  }
};

module.exports = ProductController;
