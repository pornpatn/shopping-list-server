const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
}, { versionKey: false });

marketSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = Date.now();
    next();
});

const Market = mongoose.model('Market', marketSchema);

module.exports = Market;
