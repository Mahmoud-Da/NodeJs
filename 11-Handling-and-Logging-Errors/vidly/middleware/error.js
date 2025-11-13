module.exports = function (err, req, res, next) {
  // Handle and log the error
  res.status(500).send("Something failed.");
};
