const Cart = require('../../model/cart.model');
const Product = require('../../model/products.model');
const Order = require('../../model/order.model');

const CheckoutController = {
    // [GET] /checkout
    show: async (req, res) => {
        const cart = await Cart.findOne({ _id: req.cookies.cartId });
        if(cart.products.length) {
            let totalPrice = 0;
            await Promise.all(cart.products.map(async (item) => {
                const productInfo = await Product.findOne({ _id: item.product_id }).select('title price thumbnail slug');
                item.productInfo = productInfo;
                item.price = productInfo.price * item.quantity;
                totalPrice += item.price;
            }));
            cart.totalPrice = totalPrice;
        }
        res.render('client/pages/checkout/index', {
            cart
        });
    },
    // [POST] /checkout/purchase
    purchase: async (req, res) => {
        const userInfo = req.body;
        const productList = [];
        const cart = await Cart.findOne({_id: req.cookies.cartId});
        for (const item of cart.products) {
            const objProduct = {
                product_id: item.product_id,
                price: 0,
                quantity: item.quantity,
            }
            const product = await Product.findOne({_id: item.product_id}).select('price');
            objProduct.price = product.price;
            productList.push(objProduct);
        }
        const order = new Order();
        order.userInfo = userInfo;
        order.products = productList;
        order.cart_id = req.cookies.cartId;
        order.save();
        // remove all item in cart after purchase
        await Cart.updateOne({ 
            _id: req.cookies.cartId,
        }, {
            products: []
        });
        req.flash('success', 'Purchase Successfully');
        res.render('client/pages/checkout/purchase');
    }
};

module.exports = CheckoutController;
