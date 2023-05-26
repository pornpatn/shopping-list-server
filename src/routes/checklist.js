const express = require('express');
const { Checklist } = require('../database/schemas');
const { getIntValue, getSortOptions } = require('../utils/QueryParser');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    const sortOptions = getSortOptions(req.query.sort);
    const skip = getIntValue(req.query.skip, 0);
    const limit = getIntValue(req.query.limit, 10);
    const count = await Checklist.find().count();
    const data = await Checklist.find().sort(sortOptions).skip(skip).limit(limit);

    res.send({
        success: true,
        message: "Checklists retrived successfully",
        count,
        skip,
        limit,
        data
    });
});

router.get('/active', async (req, res) => {
    const queryOptions = {
        status: 'in-progress'
    };
    const sortOptions = getSortOptions(req.query.sort);
    const skip = getIntValue(req.query.skip, 0);
    const limit = getIntValue(req.query.limit, 10);
    const count = await Checklist.find(queryOptions).count();
    const data = await Checklist.find(queryOptions).sort(sortOptions).skip(skip).limit(limit).populate('items.product');

    res.send({
        success: true,
        message: "Checklists retrived successfully",
        count,
        skip,
        limit,
        data
    });
});

router.get('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findOne({ _id: req.params.id }).populate("items.product");
        res.send({
            success: true,
            message: 'Checklist retrived successfully',
            data: checklist
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Checklist doesn't exist!"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newChecklist = await Checklist.create(req.body);
        res.send({
            success: true,
            message: 'Checklist created successfully',
            data: newChecklist
        }).status(201);
    } catch {
        res.status(404).send({
            success: false,
            message: "Checklist could not be created"
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send({
            success: true,
            message: 'Update checklist successfully',
            data: checklist
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Checklist doesn't exist!"
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.deleteOne({ _id: req.params.id });
        res.status(204).send({
            success: true,
            message: 'Delete checklist successfully'
        });
    } catch {
        res.status(404).send({
            success: false,
            message: "Checklist doesn't exist!"
        });
    }
});
