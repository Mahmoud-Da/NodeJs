const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.status(401).send();
});

module.exports = router;
