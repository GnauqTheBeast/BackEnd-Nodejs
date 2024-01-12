const Product = require('../../model/products.model');
const buttonFilter = require('../../helpers/filterStatus.helper');
const searchHelper = require('../../helpers/search.helper');
const paginationHelper = require('../../helpers/pagination.helper');
const ProductController = {
    // [GET] /admin/product
    show: async (req, res, next) => {
      // Filter 
      let filterBtn = "Filter";
      let buttonFilters = buttonFilter;
      let Find = {
        deleted: false
      };

      if(req.query.status) {
        Find.status = req.query.status;
        buttonFilters.forEach(btn => {
          if(btn.btn_status === Find.status)
            filterBtn = btn.name;
        });
      }

      // Search
      const searchInfo = searchHelper(req.query);
      if(searchInfo.keyword) {
        Find.title = searchInfo.title;
      }

      // Pagination
      let totalProduct = await Product.countDocuments( Find );
      const pagination = paginationHelper(totalProduct, req.query);
      Product.find( Find ).limit(limitProduct).skip(indexStartProduct)
        .then(products => {
          res.render('./admin/pages/products/index',
            {
              filterBtn,
              products,
              buttonFilters,
              searchInfo,
              pagination,
            }
          )})
        .catch(next);
    },
    // [PATCH] /admin/product/change-status/:status/:id
    changeStatus: async (req, res, next) => {
      const status = req.params.status;
      const productId = req.params.id;
      Product.updateOne({ _id: productId }, { status: status})
        .then(() => res.redirect('back'))
        .catch(next);
    },
    // [PATCH] /admin/product/handle-form-action
    handleFormAction: async (req, res, next) => {
      switch(req.body.action) {
        case '1':
          Product.updateMany({ _id: { $in: req.body.product }}, { status: 'active'})
            .then(() => res.redirect('back'))
            .catch(next);
          console.log(req.body);
          break;
        case '2':
          Product.updateMany({_id: { $in: req.body.product }}, { status: 'inactive' })
              .then(() => res.redirect('back'))
              .catch(next);
          break;
        case '3':
          Product.deleteMany({_id: { $in: req.body.product }})
              .then(() => res.redirect('back'))
              .catch(next);
          break;
        default:
            res.json({message: 'error !!!'});
      }
    },
  };
  
module.exports = ProductController;