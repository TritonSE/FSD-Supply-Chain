const express = require("express");
const { Item, Batch } = require("../models/item");
const router = express.Router();
const { toUTCMidnight } = require("../helpers/dateHelpers");

router.get("/getAllItems", (req, res, next) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.error(err);
    }
    res.send(items, 200);
  });
});

router.post("/addItem", (req, res, next) => {
  // validate body params
  const itemName = req.body["itemName"];
  const itemId = req.body["itemId"];
  const weight = req.body["weight"];
  const today = toUTCMidnight(new Date());

  if (itemName === undefined && itemId === undefined) {
    res.send("Either itemName or itemId is required!", 400);
    return;
  }

  if (weight === undefined) {
    res.send("Weight is required!", 400);
    return;
  }

  // create batch object
  const batch = new Batch({
    date: today,
    pounds: weight,
    fulfilled: false,
  });

  // check if the item already exist
  Item.findOne({ name: itemName }, (err, item) => {
    if (err) {
      console.error(err);
    }

    if (item === null) {
      // item does not exist, so create one and add the batch
      let newItem = new Item({
        name: itemName,
        itemId: itemId,
        batches: [batch],
      });
      newItem.save();
    } else {
      // if item already exist with same date, combine the two batches
      for (let batch of item.batches) {
        if (batch.date.toString() === today.toString()) {
          // combine batches
          batch.pounds += weight;
          item.save();
          return;
        }
      }

      // append batch to item's batches since the batch doesn't already exist
      item.batches.push(batch);
      item.save();
    }
  });

  res.send("Added!", 202);
});

module.exports = router;
