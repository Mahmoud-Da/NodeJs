const fs = require("fs");

// Synchronous Version
const files = fs.readdirSync("./");
console.log(files);

// Asynchronous Version
fs.readdir("./", (error, files) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Result:", files);
  }
});

// Handling Errors
fs.readdir("$", (error, files) => {
  if (error) console.log("Error:", error);
  else console.log("Result:", files);
});
