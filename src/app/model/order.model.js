const mongoose = require('mongoose');
const { Schema } = mongoose;

const Order = new Schema({ 
    user_id: String,
    cart_id: String,
    userInfo: {
        fullName: String, 
        phoneNumber: String,
        address: String,
    },
    status: {
        type: String,
        default: 'initiate',
    },
    products: [
        {
            product_id: String,
            price: Number,
            quantity: Number,
        }
    ],
}, {    
    timestamps: true
});

module.exports = mongoose.model('Order', Order, 'orders');