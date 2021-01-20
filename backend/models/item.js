const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
    date: { type: Date, unique: true },
    pounds: Number,
    fulfilled: Boolean,
})

const ItemSchema = new Schema({
    name: { type: String, unique: true },
    itemid: { type: String, unique: true },
    batches: [BatchSchema],
})

const Item = mongoose.model('item', ItemSchema);
const Batch = mongoose.model('batch', BatchSchema);
module.exports = {Item, Batch};