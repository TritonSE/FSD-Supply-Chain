const express = require("express");
const router = express.Router();

router.post("/addItem", function (req, res, next) {
  res.send(req.body);
});

module.exports = router;
