const Cart = require('../../app/model/cart.model');
const User = require('../../app/model/users.model');

const CartMiddleware = {
    cart: async (req, res, next) => {
        if(!req.cookies.tokenUser) {
            const cart = new Cart();
            cart.save();
            const expiresTime = 24 * 60 * 60 * 1000;
            res.cookie('cartId', cart.id, {
                expires: new Date(Date.now() + expiresTime)
            });
            res.locals.totalProductCart = 0;
        }
        else {
            const user = await User.findOne({tokenUser: req.cookies.tokenUser}).select('--password');
            if(user) {
                if(!user.cart_id) {
                    await User.updateOne({ tokenUser: req.cookies.tokenUser }, { cart_id: req.cookies.cartId });
                }
                res.cookie('cartId', user.cart_id);
                const cart = await Cart.findOne({ _id: user.cart_id });
                await Cart.updateOne({ _id: req.cookies.cartId }, { user_id:  user.id });
                res.locals.totalProductCart = cart.products.length;
            }
        }
        next();
    }
};

module.exports = CartMiddleware;