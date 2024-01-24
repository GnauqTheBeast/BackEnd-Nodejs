const ProductCategory = require('../../model/productsCategory.model');
const searchHelper = require('../../helpers/search.helper');
const buttonFilter = require('../../helpers/filterStatus.helper');
const sort = require('../../helpers/sortCategory.helper');

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

        const productCategories = await ProductCategory.find( Find ).sort(SORT);
        res.render('./admin/pages/products-category/index', {
            productCategories,
            searchInfo,
            buttonFilters,
            filterBtn,
            sortBtns,
            sortBtnTitle,
        });
    },
    // [GET] /admin/product-category/create
    create: (req, res) => {
        res.render('./admin/pages/products-category/create');
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

} 

module.exports = ProductCategoryController;