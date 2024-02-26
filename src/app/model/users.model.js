const mongoose = require('mongoose');
const { Schema } = mongoose;
const randomTokenHelper = require('../helpers/generate.helper'); 

const User = new Schema({ 
    fullName: String,
    email: String,
    password: String, 
    cart_id: String,
    tokenUser: {
        type: String,
        default: randomTokenHelper(20)
    },
    deleted: {
        type: Boolean,
        default: false
    },
    avatar: String,
}, {    
    timestamps: true
});

module.exports = mongoose.model('User', User, 'users');