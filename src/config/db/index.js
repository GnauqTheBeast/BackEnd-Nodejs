const mongoose = require('mongoose');

const ConnectDb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/ProductManagement')
        .then(() => console.log('Database is connected'))
        .catch(() => console.log('Database is not connected'));
}

module.exports = ConnectDb;