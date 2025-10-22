// const p = new Promise((resolve, reject) => {
//   // Asynchronous operation
//   resolve(1); // Successful result
//   // reject(new Error('Something went wrong')); // Failure example
// });

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1); // Return result after 2 seconds
//   }, 2000);
// });

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Something failed"));
  }, 2000);
});

p.then((result) => console.log(result)) // Called when resolved
  .catch((error) => console.log(error.message)); // Called when rejected
