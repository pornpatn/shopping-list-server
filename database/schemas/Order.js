const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        default: 'in-progress',
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        qty: Number,
        unit: String,
        checked: {
            type: Boolean,
            default: false,
        },
    }],
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
    },
    market: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Market',
    },
    content: String,
    scheduleDeliveryDate: Date,
    deliveryDate: Date,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
}, { versionKey: false });

orderSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
