const Product = require('../../model/products.model');

const ProductController = {
  // [GET] /product/mycar
  mycar: (req, res, next) => {
    Product.find({})
      .then(data => res.render('client/pages/products/index', 
      { 
        titlePage: "Product list:",
        data 
      }))
      .catch(next)
  }
  ,
  // [GET] /product/yourcar
  yourcar: (req, res, next) => {
    res.json({ message: "Mercedes" });
  },
};

module.exports = ProductController;
