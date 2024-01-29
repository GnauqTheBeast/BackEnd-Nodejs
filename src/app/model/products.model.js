const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const { Schema } = mongoose;

const Product = new Schema({ 
    title: String,
    categoryId: {
        type: String, 
        default: ''
    },
    description: String,
    price: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
    slug: {
        type: String, slug: 'title', unique: true
    }
}, {    
    timestamps: true
});

module.exports = mongoose.model('Product', Product, 'products');