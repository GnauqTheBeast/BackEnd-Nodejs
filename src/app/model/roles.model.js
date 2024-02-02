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
    deletedAt: Date
}, {    
    timestamps: true
});

module.exports = mongoose.model('Role', Role, 'roles');