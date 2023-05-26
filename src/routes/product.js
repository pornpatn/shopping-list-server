const express = require('express');
const { Product } = require('../database/schemas');
const { getIntValue, getSortOptions } = require('../utils/QueryParser');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const sortOptions = getSortOptions(req.query.sort);
    const skip = getIntValue(req.query.skip, 0);
    const limit = getIntValue(req.query.limit, 10);
    const count = await Product.find().count();
    const data = await Product.find().sort(sortOptions).skip(skip).limit(limit);

    res.send({
        success: true,
        message: "Products retrived successfully",
        count,
        skip,
        limit,
        data
    });
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        res.send({
            success: true,
            message: 'Product retrived successfully',
            data: product
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Product doesn't exist!"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.send({
            success: true,
            message: 'Product created successfully',
            data: newProduct
        }).status(201);
    } catch {
        res.status(404).send({
            success: false,
            message: "Product could not be created"
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({
            success: true,
            message: 'Update product successfully',
            data: product
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Product doesn't exist!"
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id });
        res.status(204).send({
            success: true,
            message: 'Delete product successfully'
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Product doesn't exist!"
        });
    }
});
