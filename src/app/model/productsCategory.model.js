const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const { Schema } = mongoose;

const ProductCategory = new Schema({ 
    title: String,
    parentId: String,
    description: {
        type: String,
        default: ''
    },
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    deletedBy: {
        account_id: String,
        deletedAt: {
            type: Date,
            default: Date.now
        }
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date,
        }
    ],
    slug: {
        type: String, slug: 'title', unique: true
    }
}, {    
    timestamps: true
});

module.exports = mongoose.model('ProductCategory', ProductCategory, 'products-category');