var _ = require("underscore");

// The require() function follows a sequence when resolving a module:
// Core Module Check
// Local File or Folder Check
// node_modules Folder Check

var result = _.contains([1, 2, 3], 2);
console.log(result);
