const express = require('express');
const path = require('path');

const { requireAuth } = require('./authMiddleware');
const checklist = require('./checklist');
const market = require('./market');
const order = require('./order');
const product = require('./product');
const category = require('./category');
const tag = require('./tag');

const router = express.Router();

router.use('/api/checklist', requireAuth, checklist);
router.use('/api/market', requireAuth, market);
router.use('/api/order', requireAuth, order);
router.use('/api/product', requireAuth, product);
router.use('/api/category', requireAuth, category);
router.use('/api/tag', requireAuth, tag);

router.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
