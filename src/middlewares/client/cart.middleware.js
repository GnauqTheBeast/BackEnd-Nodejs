const Cart = require('../../app/model/cart.model');

const CartMiddleware = {
    cart: async (req, res, next) => {
        if(!req.cookies.cartId) {
            const cart = new Cart();
            cart.save();
            const expiresTime = 24 * 60 * 60 * 1000;
            res.cookie('cartId', cart.id, {
                expires: new Date(Date.now() + expiresTime)
            });
            res.locals.totalProductCart = 0;
        }
        else {
            const cart = await Cart.findOne({ _id: req.cookies.cartId });
            res.locals.totalProductCart = cart.products.length;
        }
        next();
    }
};

module.exports = CartMiddleware;