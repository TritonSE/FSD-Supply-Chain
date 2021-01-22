const {Schema, model} = require('mongoose');

const BatchSchema = new Schema({
    itemname: {type: String, index: true},
    indate: Date,
    outdate: Date,
    pounds: Number,
    fulfilled: Boolean,
});

// There can only be one batch for a given item name and out date.
BatchSchema.index({itemname: 1, outdate: 1}, {unique: true});

const Batch = model('Batch', BatchSchema);

module.exports = Batch;