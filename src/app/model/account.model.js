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
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    avatar: String,
    deletedAt: Date,
}, {    
    timestamps: true
});

module.exports = mongoose.model('Account', Account, 'accounts');