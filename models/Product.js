// level-up-gamer-backend/models/Product.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: { 
        type: String,
        required: true
    },
    category: {
        type: String 
    },
    stock: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', ProductSchema);