const { Schema, model } = require("mongoose");

const BatchSchema = new Schema({
  itemName: { type: String, index: true },
  batchId: { type: String, unique: true },
  inDate: Date,
  outDate: Date,
  poundsTotal: Number,
  poundsRemaining: Number,
});

BatchSchema.index({ itemName: 1, outDate: 1, batchId: 1 });

const Batch = model("Batch", BatchSchema);

module.exports = { Batch };