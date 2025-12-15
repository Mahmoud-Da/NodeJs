const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly", // make sure to include port 27017
      level: "error", // log only errors
      collection: "log", // optional: name of log collection
    })
  );
};
