const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
    date: Date,
    pounds: Number,
    fulfilled: Boolean,
})

const ItemSchema = new Schema({
    name: { type: String, unique: true },
    itemid: { type: String, unique: true },
    batches: [BatchSchema],
})

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
