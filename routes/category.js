const express = require('express');
const { Category } = require('../database/schemas');
const { getIntValue, getSortOptions } = require('../utils/QueryParser');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const sortOptions = getSortOptions(req.query.sort);
    const skip = getIntValue(req.query.skip, 0);
    const limit = getIntValue(req.query.limit, 10);
    const count = await Category.find().count();
    const data = await Category.find().sort(sortOptions).skip(skip).limit(limit);

    res.send({
        success: true,
        message: "Categories retrived successfully",
        count,
        skip,
        limit,
        data
    });
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        res.send({
            success: true,
            message: 'Category retrived successfully',
            data: category
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Category doesn't exist!"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.send({
            success: true,
            message: 'Category created successfully',
            data: newCategory
        }).status(201);
    } catch {
        res.status(404).send({
            success: false,
            message: "Category could not be created"
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({
            success: true,
            message: 'Update category successfully',
            data: category
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Category doesn't exist!"
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.deleteOne({ _id: req.params.id });
        res.status(204).send({
            success: true,
            message: 'Delete category successfully'
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Category doesn't exist!"
        });
    }
});
