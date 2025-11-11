console.log("Before");
const user = getUser(1);
console.log(user);

// 3 ways to handle Asynchronous Code
// Callbacks
// Promises
// Async/Await

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    return { id: id, githubUsername: "mosh" };
  }, 2000);

  // only this return valid at the time of calling the function
  // but that not what we want
  return 1;
}

console.log("After");
