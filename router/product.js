const router = require('express').Router();
const Product = require('../controllers/product')

// router.get('/v1/products', (req, res) => {
//     Product.getAllProducts(req, res)
// })

router.get('/v1/products', (req, res) => {
    Product.getProducts(req, res)
});

module.exports = router;