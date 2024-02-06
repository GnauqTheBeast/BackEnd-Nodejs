const mongoose = require('mongoose');
const { Schema } = mongoose;
const randomTokenHelper = require('../helpers/generate.helper'); 

const Account = new Schema({ 
    fullName: String,
    email: String,
    password: String, 
    token: {
        type: String,
        default: randomTokenHelper(20)
    },
    role_id: String,
    status: {
        type: String,
        default: 'active',
    },
    deleted: {
        type: Boolean,
        default: false
    },
    avatar: String,
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

module.exports = mongoose.model('Account', Account, 'accounts');