const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
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
        checked: {
            type: Boolean,
            default: false,
        },
    }],
    content: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
}, { versionKey: false });

checklistSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = Date.now();
    next();
});

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
