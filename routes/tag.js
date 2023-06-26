const express = require('express');
const { Product } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const tags = await Product.find().distinct('tags');
    res.send({
        success: true,
        message: "Tags retrived successfully",
        data: tags
    });
});
