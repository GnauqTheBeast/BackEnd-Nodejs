const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = new Schema({ 
    title: String,
    description: String,
    price: Number,
    image: String,
    status: String,
    deleted: Boolean,
});

module.exports = mongoose.model('Product', Product, 'products');