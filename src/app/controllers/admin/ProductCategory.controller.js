const ProductCategory = require('../../model/productsCategory.model');
const searchHelper = require('../../helpers/search.helper');
const buttonFilter = require('../../helpers/filterStatus.helper');
const sortHelper = require('../../helpers/sortCategory.helper');
const hierarchyCategoryHelper = require('../../helpers/hierarchyCategory.helper');
const createTree = require('../../helpers/hierarchyCategory.helper');
const paginationHelper = require('../../helpers/pagination.helper');

const ProductCategoryController = {
    // [GET] /admin/product-category
    show: async (req, res) => {
        // Filter (Active & Inactive Category)
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
        const totalCategory = await ProductCategory.countDocuments(Find);
        const pagination = paginationHelper(totalCategory, req.query);
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
        const allProductCategories = await ProductCategory.find( Find );
        const productCategories = await ProductCategory.find( Find ).sort(SORT).limit(pagination.limit).skip(pagination.indexStart);
        let records = hierarchyCategoryHelper(allProductCategories);
        res.render('./admin/pages/products-category/index', {
            productCategories,
            searchInfo,
            buttonFilters,
            filterBtn,
            sortBtns,
            sortBtnTitle,
            records,
            pagination,
        });
    },
    // [GET] /admin/product-category/create
    create: async (req, res) => {
        let find = {
            deleted: false,
        };
        let records = await ProductCategory.find(find);
        records = hierarchyCategoryHelper(records);
        res.render('./admin/pages/products-category/create', {
            records,
        });
    },
    // [POST] /admin/product-category/create
    createCategory: async (req, res) => {
        req.body.position = parseInt(req.body.position); 
        if(isNaN(req.body.position)) {
            req.body.position = await ProductCategory.countDocuments() + 1;
        }
        const productCategory = new ProductCategory(req.body);
        await productCategory.save();
        res.redirect('../product-category');
    },
    // [DELETE] /admin/product-category/delete/:id
    softDelete: async (req, res) => {
        const categoryId = req.params.id;
        await ProductCategory.updateOne({_id: categoryId}, { deleted: true })
        res.redirect('back');
    },
    // [GET] /admin/product-category/edit/:id
    edit: async (req, res) => {
        let find = {
            deleted: false,
        };
        const categoryId = req.params.id;
        const category = await ProductCategory.findById({ _id: categoryId });
        let records = await ProductCategory.find(find);
        records = createTree(records);
        res.render('admin/pages/products-category/edit', {
            category,
            records,
        });
    },
    // [PATCH] /admin/product-category/edit/:id
    editCategory: async (req, res) => {
        const categoryId = req.params.id;
        req.body.position = parseInt(req.body.position); 
        if(isNaN(req.body.position)) {
            req.body.position = await ProductCategory.countDocuments() + 1;
        }
        ProductCategory.updateOne({ _id: categoryId }, req.body)
            .then(() => {
                req.flash('success', 'Success! Your edit changes is successfully');
                res.redirect('/admin/product-category');
            });
    },
    // [GET] /admin/product-category/detail/:id
    detail: async(req, res) => {
        try {
            const categoryId = req.params.id;
            const category = await ProductCategory.findById({ _id: categoryId });
            res.render('admin/pages/products-category/detail', {
                category,
            });
        } catch (error) {
            res.redirect('/admin/product-category');
        }
    },
    // [PATCH] /admin/product-category/change-status/:status/:id
    changeStatus: async(req, res) => {
        const status = req.params.status;
        const categoryId = req.params.id;
        ProductCategory.updateOne({ _id: categoryId }, { status: status})
            .then(() =>
            {
                req.flash('success', 'Success! You have changed successfully');
                res.redirect('back')
            })
    },
    // [PATCH] /admin/product-category/handle-form-action
    handleFormAction: async (req, res, next) => {
        const positionChange = req.body.positionChange.split(',');
        let ID = req.body.category;
        switch(req.body.action) {
          case '1':
            ProductCategory.updateMany({ _id: { $in: ID }}, { status: 'active'})
              .then(() => 
                {
                  req.flash('success', 'Success! You have changed successfully');
                  res.redirect('back');
                })
              .catch(next);
            break;
          case '2':
            ProductCategory.updateMany({_id: { $in: ID }}, { status: 'inactive' })
                .then(() => {
                  req.flash('success', 'Success! You have changed successfully');
                  res.redirect('back')}
                  )
                .catch(next);
            break;
          case '3':
            ProductCategory.updateMany({_id: { $in: ID }}, {
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
            if(typeof ID === 'string')
              ID = ID.split();
            for(let i = 0; i < ID.length; i++) {
              await ProductCategory.updateOne( {_id: ID[i]}, {position: positionChange[i]} );
            } 
            req.flash('success', 'Success! You have changed successfully');
            res.redirect('back');
            break;
          default:
              res.json({message: 'error !!!'});
        }
    },
} 

module.exports = ProductCategoryController;