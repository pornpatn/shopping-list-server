const express = require('express');
const { Order } = require('../database/schemas');
const { getIntValue, getSortOptions } = require('../utils/QueryParser');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const sortOptions = getSortOptions(req.query.sort);
    const skip = getIntValue(req.query.skip, 0);
    const limit = getIntValue(req.query.limit, 10);
    const count = await Order.find().count();
    const data = await Order.find().sort(sortOptions).skip(skip).limit(limit);

    res.send({
        success: true,
        message: "Orders retrived successfully",
        count,
        skip,
        limit,
        data
    });
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id }).populate("items.product  market");
        res.send({
            success: true,
            message: 'Order retrived successfully',
            data: order
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Order doesn't exist!"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.send({
            success: true,
            message: 'Order created successfully',
            data: newOrder
        }).status(201);
    } catch {
        res.status(404).send({
            success: false,
            message: "Order could not be created"
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({
            success: true,
            message: 'Update order successfully',
            data: checklist
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Order doesn't exist!"
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.deleteOne({ _id: req.params.id });
        res.status(204).send({
            success: true,
            message: 'Delete order successfully'
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Order doesn't exist!"
        });
    }
});
