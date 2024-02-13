const Cart = require('../../model/cart.model');
const Product = require('../../model/products.model');

const CartController = {
    // [GET] /
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
        res.render('client/pages/cart/index', {
            cart
        });
    },
    // [POST] /cart/add/:productId
    add: async (req, res) => {
        const cart = await Cart.findOne({_id: req.cookies.cartId});
        const productId = req.params.productId;
        const quantity = req.body.quantity;
        const productExist = (cart, productId) => {
            const productExist = cart.products.some(product => product.product_id === productId);
            return productExist;
        }   
        if(productExist(cart, productId)) {
            await Cart.updateOne({ 
                _id: req.cookies.cartId,
                "products.product_id": productId,
            }, {
                $inc: {
                    "products.$.quantity": quantity,
                }  
            })
        }
        else {
            await Cart.updateOne({ 
                _id: req.cookies.cartId,
            }, {
                $push: {
                    products: {
                        product_id: productId,
                        quantity: quantity,
                    },
                }  
            })
        }
        req.flash('success', 'Add to cart successfully!');
        res.redirect('/product');
    },
    // [GET] /cart/delete/:productId
    delete: async(req, res) => {
        const productId = req.params.productId;
        const cart = await Cart.findOne({_id: req.cookies.cartId});
        await Cart.updateOne({ 
            _id: req.cookies.cartId,
            "products.product_id": productId,
        }, {
            $pull: {
                "products": {
                    product_id: productId,
                } 
            }  
        })
        req.flash('success', 'Remove item successfully');
        res.redirect('back');
    },
    // [GET] /cart/update/:productId/:quantity
    update: async(req, res) => {
        const productId = req.params.productId;
        const quantity = req.params.quantity;
        await Cart.updateOne({ 
            _id: req.cookies.cartId,
            "products.product_id": productId,
        }, {
            $set: {
                "products.$.quantity": quantity,
            }  
        })
        res.redirect('back');
    }
};

module.exports = CartController;
