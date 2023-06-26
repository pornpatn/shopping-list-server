const express = require('express');
const { Order } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const orders = await Order.find({}).populate("items.product market");
    res.send({ message: "Orders retrived successfully", orders });
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id }).populate("items.product market");
        res.send({ message: 'Order retrived successfully', order });
    } catch {
        res.status(404).send({ message: "Order doesn't exist!" });
    }
});

router.post('/', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.send({ message: 'Order created successfully', order: newOrder }).status(201);
    } catch {
        res.status(404).send({ message: "Order could not be created" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({ message: 'Update order successfully', order });
    } catch {
        res.status(404).send({ message: "Order doesn't exist!" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.deleteOne({ _id: req.params.id });
        res.status(204).send({ message: 'Delete order successfully' });
    } catch {
        res.status(404).send({ message: "Order doesn't exist!" });
    }
});
