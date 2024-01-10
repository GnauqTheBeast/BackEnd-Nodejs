const Product = require('../../model/products.model');
const buttonFilter = require('../helpers/filterStatus.helper');
const DashboardController = {
    show: (req, res, next) => {
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

      const searchInfo = {};
      if(req.query.keyword) {
        const re = new RegExp(req.query.keyword, "i");
        Find.title = re;
        searchInfo.title = req.query.keyword;
      }
      
      Product.find( Find ) 
        .then(products => {
          res.render('./admin/pages/dashboard/index',
            {
              filterBtn,
              products,
              buttonFilters,
              searchInfo
            }
          )})
        .catch(next);
    },
  };
  
module.exports = DashboardController;