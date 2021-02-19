const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
  name: { type: String, unique: true },
});

const Item = model("Item", ItemSchema);

module.exports = { Item };
