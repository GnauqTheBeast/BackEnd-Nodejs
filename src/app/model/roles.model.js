const mongoose = require('mongoose');
const { Schema } = mongoose;

const Role = new Schema({ 
    title: String,
    description: {
        type: String,
        default: ''
    },
    permissions: {
        type: Array,
        default: []
    },
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
    deletedAt: {
        account_id: String,
        deletedAt: {
            type: Date,
            default: Date.now
        }
    },
}, {    
    timestamps: true
});

module.exports = mongoose.model('Role', Role, 'roles');