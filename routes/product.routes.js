// level-up-gamer-backend/routes/product.routes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

module.exports = router;