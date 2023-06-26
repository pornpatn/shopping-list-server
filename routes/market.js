const express = require('express');
const { Market } = require('../database/schemas');
const { getIntValue, getSortOptions } = require('../utils/QueryParser');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const sortOptions = getSortOptions(req.query.sort);
    const skip = getIntValue(req.query.skip, 0);
    const limit = getIntValue(req.query.limit, 10);
    const count = await Market.find().count();
    const data = await Market.find().sort(sortOptions).skip(skip).limit(limit);

    res.send({
        success: true,
        message: "Markets retrived successfully",
        count,
        skip,
        limit,
        data
    });
});

router.get('/:id', async (req, res) => {
    try {
        const market = await Market.findOne({ _id: req.params.id });
        res.send({
            success: true,
            message: 'Market retrived successfully',
            data: market
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Market doesn't exist!"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newMarket = await Market.create(req.body);
        res.send({
            success: true,
            message: 'Market created successfully',
            data: newMarket
        }).status(201);
    } catch {
        res.status(404).send({
            success: false,
            message: "Market could not be created"
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const market = await Market.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({
            success: true,
            message: 'Update market successfully',
            data: market
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Market doesn't exist!"
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const market = await Market.deleteOne({ _id: req.params.id });
        res.status(204).send({
            success: true,
            message: 'Delete market successfully'
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Market doesn't exist!"
        });
    }
});
