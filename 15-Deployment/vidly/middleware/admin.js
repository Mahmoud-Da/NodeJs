module.exports = function (req, res, next) {
  // Authorization middleware runs before this and sets req.user
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
