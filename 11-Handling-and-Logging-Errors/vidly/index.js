require("express-async-errors");
require("dotenv").config();
require("winston-mongodb");

const winston = require("winston");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");
const express = require("express");
const app = express();

process.on("uncaughtException", (exception) => {
  console.log("We got an uncaught exception");
  winston.error(exception.message, exception);
});

winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost:27017/vidly", // make sure to include port 27017
    level: "error", // log only errors
    collection: "log", // optional: name of log collection
  })
);

const p = Promise.reject(new Error("Failed miserably"));

p.then(() => console.log("Done"));

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
