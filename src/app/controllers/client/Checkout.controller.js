const Cart = require('../../model/cart.model');
const Product = require('../../model/products.model');
const Order = require('../../model/order.model');
const User = require('../../model/users.model');

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
        if(req.cookies.tokenUser) {
            const user = await User.findOne({ tokenUser: req.cookies.tokenUser }).select('id');
            order.user_id = user.id;
        }
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
        res.redirect(`/checkout/success/${order.id}`);
    },
    // [GET] /checkout/success/:orderId
    success: async (req, res) => {
        const orderId = req.params.orderId;
        const order = await Order.findOne({ _id: orderId });
        const productInfo = [];
        let bill = 0;
        for (const item of order.products) {
            const product = await Product.findOne({ _id: item.product_id }).select('title thumbnail');
            item.title = product.title;
            item.thumbnail = product.thumbnail;
            item.totalPrice = item.price * item.quantity;
            bill += item.totalPrice;
            productInfo.push(item);
        }
        order.bill = bill;
        res.render('client/pages/checkout/purchase', {
            order,
            productInfo,
        });
    }

};

module.exports = CheckoutController;
