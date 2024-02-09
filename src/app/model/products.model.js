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
    createdBy: {
        account_id: String,
        createdAt: Date
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date,
        }
    ],
    featured: Boolean,
    slug: {
        type: String, slug: 'title', unique: true
    }
}, {    
    timestamps: true
});

module.exports = mongoose.model('Product', Product, 'products');