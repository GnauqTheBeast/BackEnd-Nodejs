const Product = require('../../model/products.model');
const buttonFilter = require('../../helpers/filterStatus.helper');
const searchHelper = require('../../helpers/search.helper');
const paginationHelper = require('../../helpers/pagination.helper');
const sort = require('../../helpers/sort.helper');
const ProductController = {
    // [GET] /admin/product
    show: async (req, res) => {
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
      const limitProduct = pagination.limit;
      const indexStartProduct = pagination.indexStartProduct;

      // Deleted Product
      const deletedProduct = await Product.countDocuments({ deleted: true });
      
      // Sort 
      let sortBtnTitle = 'Sort';
      let sortBtns = sort;
      let SORT = {};
      if(req.query.sortKey && req.query.sortValue) {
        SORT[req.query.sortKey] = req.query.sortValue; 
        sortBtns.forEach(btn => {
          if(req.query.sortKey === btn.field && req.query.sortValue === btn.btn_sort) 
            sortBtnTitle = btn.name;
        });
      }
      else {
        SORT.position = 'desc';
      }
  
      //
      Product.find( Find ).limit(limitProduct).skip(indexStartProduct).sort(SORT)
        .then(products => {
          res.render('./admin/pages/products/index',
            {
              filterBtn,
              products,
              buttonFilters,
              searchInfo,
              pagination,
              deletedProduct,
              sort,
              sortBtnTitle,
              sortBtns,
            }
          )});
    },
    // [PATCH] /admin/product/change-status/:status/:id
    changeStatus: async (req, res, next) => {
      const status = req.params.status;
      const productId = req.params.id;
      Product.updateOne({ _id: productId }, { status: status})
        .then(() =>
          {
            req.flash('success', 'Success! You have changed successfully');
            res.redirect('back')
          })
        .catch(next);
    },
    // [PATCH] /admin/product/handle-form-action
    handleFormAction: async (req, res, next) => {
      const positionChange = req.body.positionChange.split(',');
      const ID = req.body.product;
      switch(req.body.action) {
        case '1':
          Product.updateMany({ _id: { $in: ID }}, { status: 'active'})
            .then(() => 
              {
                req.flash('success', 'Success! You have changed successfully');
                res.redirect('back');
              })
            .catch(next);
          break;
        case '2':
          Product.updateMany({_id: { $in: ID }}, { status: 'inactive' })
              .then(() => {
                req.flash('success', 'Success! You have changed successfully');
                res.redirect('back')}
                )
              .catch(next);
          break;
        case '3':
          Product.updateMany({_id: { $in: ID }}, {
            deleted: true,
            deletedAt: new Date()
          })
              .then(() => {
                req.flash('success', 'Success! You have changed successfully');
                res.redirect('back')}
                )
              .catch(next);
          break;
        case '4':
          let productId = req.body.product; 
          if(typeof productId === 'string')
            productId = productId.split();
          for(let i = 0; i < productId.length; i++) {
            await Product.updateOne( {_id: productId[i]}, {position: positionChange[i]} );
          } 
          req.flash('success', 'Success! You have changed successfully');
          res.redirect('back');
          break;
        default:
            res.json({message: 'error !!!'});
      }
    },
    // [PATCH] /delete/:id
    softDelete: (req, res) => {
      const productId = req.params.id;
      Product.updateOne({ _id: productId }, { 
        deleted: true,
        deletedAt: new Date()
      })
        .then(() => res.redirect('back'))
    },
    // [GET] /create
    create: (req, res, next) => {
      res.render('./admin/pages/products/create');
    },
    // [POST] /create
    createProduct: async (req, res, next) => { 
      req.body.price = parseInt(req.body.price);
      req.body.position = parseInt(req.body.position); 
      if(isNaN(req.body.position)) {
        req.body.position = await Product.countDocuments() + 1;
      }
      const product = new Product(req.body);
      await product.save();
      res.redirect('../product');
    },
    // [GET] /edit/:id
    edit: async (req, res, next) => {
      const find = {
        deleted: false,
        _id: req.params.id,
      }
      Product.findOne(find)
        .then((product) => res.render('./admin/pages/products/edit', {
          product
        }))
        .catch(() => {
          req.flash('error', 'ERORR! You cannot edit unexist product');
          res.redirect('/admin/product')
        });
    },
    // [PATCH] /edit/:id
    editProduct: async (req, res, next) => {
      req.body.price = parseInt(req.body.price);
      req.body.position = parseInt(req.body.position); 
      if(isNaN(req.body.position)) {
        req.body.position = await Product.countDocuments() + 1;
      }
      if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
      }
      Product.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
          req.flash('success', 'Success! Your edit changes is successfully');
          res.redirect('/admin/product');
        })
    },
    // [GET] /detail/:id
    detail: (req, res, next) => {
      Product.findById({ _id: req.params.id })
        .then(product => res.render('./admin/pages/products/detail', { product }));
    },
    // [GET] /trash
    trash: (req, res) => {
      const find = {
        deleted: true
      }
      // Search
      const searchInfo = searchHelper(req.query);
      if(searchInfo.keyword) {
        find.title = searchInfo.title;
      }
      Product.find(find)
        .then(products => res.render('./admin/pages/products/trash', 
          {
           products,
           searchInfo,
          }));
    },
    // [PATCH] /trash/restore/:id
    restore: (req, res) => {
      Product.findByIdAndUpdate({ _id: req.params.id }, { deleted: false })
        .then(() => {
          req.flash('success', 'Success!');
          res.redirect('back');
        });
    },
    // [DELETE] /trash/destroy/:id
    destroy: (req, res) => {
      Product.deleteOne({ _id: req.params.id })
        .then(() => 
          { 
            req.flash('success', 'Success!');
            res.redirect('back');
          });
    },
  };
  
module.exports = ProductController;