const { Schema, model } = require("mongoose");

const BatchSchema = new Schema({
  itemName: { type: String, index: true },
  inDate: Date,
  outDate: Date,
  poundsTotal: Number,
  poundsRemaining: Number,
});

// Ensure that there is only one batch for a given item name and out date.
BatchSchema.index({ itemName: 1, outDate: 1 }, { unique: true });

const Batch = model("Batch", BatchSchema);

module.exports = { Batch };
