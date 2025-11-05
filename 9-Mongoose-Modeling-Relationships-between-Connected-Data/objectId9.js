// _id: 5a724953ab83547957541e6a

// 12 bytes
//   4 bytes: timestamp
//   3 bytes: machine identifier
//   2 bytes: process identifier
//   3 bytes: counter

// 1 byte = 8 bits
// 2 ^ 8 = 256
// 2 ^ 24 = 16M

// Driver -> MongoDB

const mongoose = require("mongoose");

// Create a new ObjectID
const id = new mongoose.Types.ObjectId();
console.log(id);

// get the Time stamp of an Object ID
console.log(id.getTimestamp());

// Validating ObjectIDs
const isValid = mongoose.Types.ObjectId.isValid("1234");
console.log(isValid); // false
