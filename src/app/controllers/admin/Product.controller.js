const Product = require('../../model/products.model');
const ProductCategory = require('../../model/productsCategory.model');
const Account = require('../../model/account.model');
const buttonFilter = require('../../helpers/filterStatus.helper');
const searchHelper = require('../../helpers/search.helper');
const paginationHelper = require('../../helpers/pagination.helper');
const sortHelper = require('../../helpers/sort.helper');
const hierarchyCategoryHelper = require('../../helpers/hierarchyCategory.helper');

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

      // Deleted Product
      const deletedProduct = await Product.countDocuments({ deleted: true });
      
      // Sort 
      let sortBtnTitle = 'Sort';
      let sortBtns = sortHelper;
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
      Product.find( Find ).limit(pagination.limit).skip(pagination.indexStart).sort(SORT)
        .then(async products => {
          // Find Product Creator
          for(const product of products) {
            const account_create = await Account.findOne({_id: product.createdBy.account_id}).select('fullName');
            if(account_create) {
              product.accountCreate = account_create.fullName;
            }
            const lastestUpdateProduct = product.updatedBy.slice(-1)[0];
            if(lastestUpdateProduct) {
              const account_update = await Account.findOne({_id: lastestUpdateProduct.account_id}).select('fullName');
              if(account_update)
                product.accountUpdate = account_update.fullName;
                product.accountUpdateTime = lastestUpdateProduct.updatedAt;
            }
          }
          res.render('./admin/pages/products/index',
            {
              filterBtn,
              products,
              buttonFilters,
              searchInfo,
              pagination,
              deletedProduct,
              sortHelper,
              sortBtnTitle,
              sortBtns,
            }
          )});
    },
    // [PATCH] /admin/product/change-status/:status/:id
    changeStatus: async (req, res, next) => {
      const status = req.params.status;
      const productId = req.params.id;
      const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date(),
      }
      Product.updateOne({ _id: productId }, 
        { 
          status: status,
          $push: { updatedBy: updatedBy }
        })
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
      const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: Date.now(),
      }
      switch(req.body.action) {
        case '1':
          Product.updateMany({ _id: { $in: ID }}, { 
            status: 'active',
            $push: { updatedBy: updatedBy }
          })
            .then(() => 
              {
                req.flash('success', 'Success! You have changed successfully');
                res.redirect('back');
              })
            .catch(next);
          break;
        case '2':
          Product.updateMany({_id: { $in: ID }}, { 
            status: 'inactive',
            $push: { updatedBy: updatedBy }
          })
              .then(() => {
                req.flash('success', 'Success! You have changed successfully');
                res.redirect('back')}
                )
              .catch(next);
          break;
        case '3':
          Product.updateMany({_id: { $in: ID }}, {
            deleted: true,
            deletedBy: {
              account_id: res.locals.id
            }
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
            await Product.updateOne( {_id: productId[i]}, { 
              position: positionChange[i],
              $push: { updatedBy: updatedBy }
            } );
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
        deletedBy: {
          account_id: res.locals.user.id,
          deletedAt: Date.now(),
        }
      })
        .then(() => res.redirect('back'))
    },
    // [GET] /create
    create: (req, res) => {
      res.render('./admin/pages/products/create');
    },
    // [POST] /create
    createProduct: async (req, res) => { 
      req.body.price = parseInt(req.body.price);
      req.body.position = parseInt(req.body.position); 
      if(isNaN(req.body.position)) {
        req.body.position = await Product.countDocuments() + 1;
      }
      req.body.createdBy = {
        account_id: res.locals.user.id,
        createdAt: Date.now(),
      }
      const product = new Product(req.body);
      await product.save();
      res.redirect('../product');
    },
    // [GET] /edit/:id
    edit: async (req, res) => {
      const find = {
        deleted: false,
        _id: req.params.id,
      }
      const allProductCategories = await ProductCategory.find({deleted: false}); 
      const records = hierarchyCategoryHelper(allProductCategories);
      Product.findOne(find)
        .then((product) => res.render('./admin/pages/products/edit', {
          product,
          records
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
      try {
        const updatedBy = {
          account_id: res.locals.user.id,
          updatedAt: new Date(),
        }
        Product.findByIdAndUpdate(
          { _id: req.params.id }, 
          {
            ...req.body,
            $push: {
              updatedBy: updatedBy,
            }
          })
          .then(() => {
            req.flash('success', 'Success! Your edit changes is successfully');
            res.redirect('/admin/product');
          })
      } catch (error) {
          req.flash('error', 'Error updated');
          res.redirect('/admin/product');
      }
    },
    // [GET] /detail/:id
    detail: async (req, res) => {
      const Categories = await ProductCategory.find({deleted: false});
      Product.findById({ _id: req.params.id })
        .then(product => res.render('./admin/pages/products/detail', { 
            product,
            Categories
        }));
    },
    // [GET] /trash
    trash: async (req, res) => {
      const find = {
        deleted: true
      }
      // Search
      const searchInfo = searchHelper(req.query);
      if(searchInfo.keyword) {
        find.title = searchInfo.title;
      }
      const products = await Product.find(find);
      for(const product of products) {
        const account = await Account.findOne({_id: product.deletedBy.account_id});
        if(account) {
          product.accountDelete = account.fullName;
        }
      }
      res.render('./admin/pages/products/trash', 
      {
        products,
        searchInfo,
      });
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