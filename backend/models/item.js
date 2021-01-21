const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
  date: Date,
  pounds: Number,
  fulfilled: Boolean,
});

const ItemSchema = new Schema({
  name: { type: String, unique: true },
  itemId: { type: String, unique: true },
  batches: [BatchSchema],
});

const Item = mongoose.model("Item", ItemSchema);
const Batch = mongoose.model("Batch", BatchSchema);

module.exports = { Item, Batch };
