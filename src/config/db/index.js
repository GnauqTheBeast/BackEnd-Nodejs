const mongoose = require('mongoose');

const ConnectDb = () => {
    mongoose.connect("mongodb+srv://quangnguyenngoc314:zBSXrnOocOfWiv7k@product.a5feo6t.mongodb.net/ProductManagement")
        .then(() => console.log('Database is connected'))
        .catch(() => console.log('Database is not connected'));
}

module.exports = ConnectDb;