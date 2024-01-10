const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({ 
    email: String,
    phone: String,
    username: String,
    password: String,
    birthDate: String
});

module.exports = mongoose.model('User', User, 'users');