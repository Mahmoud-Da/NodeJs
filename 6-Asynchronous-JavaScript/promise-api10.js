const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("Asynchronous operation 1");
    // resolve(1);
    () => reject(new Error("Something failed")), 2000;
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Asynchronous operation 2");
    resolve(2);
  }, 3000);
});

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log("Error:", error.message));

Promise.race([p1, p2])
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error.message));
