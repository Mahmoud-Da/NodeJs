const { Rental } = require("../models/rental");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("Customer ID not provided");

  if (!req.body.movieId) return res.status(400).send("Movie ID not provided");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("Rental not found");

  if (rental.dateReturned)
    return res.status(400).send("Rental is already processed");

  res.status(200).send();
});

module.exports = router;
