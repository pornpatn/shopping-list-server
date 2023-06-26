const express = require('express');
const path = require('path');

const checklist = require('./checklist');
const market = require('./market');
const order = require('./order');
const product = require('./product');
const category = require('./category');
const tag = require('./tag');

const router = express.Router();

router.use('/api/checklist', checklist);
router.use('/api/market', market);
router.use('/api/order', order);
router.use('/api/product', product);
router.use('/api/category', category);
router.use('/api/tag', tag);

router.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
