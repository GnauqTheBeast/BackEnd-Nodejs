const mongoose = require('mongoose');
const { Schema } = mongoose;

const Cart = new Schema({ 
    user_id: String,
    products: [
        {
            product_id: String,
            quantity: Number,
        }
    ],
    expireAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 60 * 24
    }
}, {    
    timestamps: true
});

module.exports = mongoose.model('Cart', Cart, 'carts');