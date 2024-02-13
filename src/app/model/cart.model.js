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
}, {    
    timestamps: true
});

module.exports = mongoose.model('Cart', Cart, 'carts');