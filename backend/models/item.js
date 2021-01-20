const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BatchSchema = new Schema({
    date: { type: Date, unique: true },
    pounds: Number,
    fulfilled: Boolean,
})

var ItemSchema = new Schema({
    name: { type: String, unique: true },
    itemid: { type: String, unique: true },
    batches: [BatchSchema],
})

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;