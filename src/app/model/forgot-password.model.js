const mongoose = require('mongoose');
const { Schema } = mongoose;

const forgotPassword = new Schema({ 
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        default: Date.now(),
        expires: 120
    }
}, {    
    timestamps: true
});

module.exports = mongoose.model('forgotPassword', forgotPassword, 'forgotPasswords');