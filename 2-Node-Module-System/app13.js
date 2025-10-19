// Load the HTTP module
const http = require("http");

// Create an HTTP server instance
const server = http.createServer();

// ---------------
// 1. Handle socket-level events
// ---------------

// The 'connection' event is raised whenever a client connects to the server
server.on("connection", (socket) => {
  console.log("New connection established...");
});

// ---------------
// 2. Handle HTTP requests using a callback function
// ---------------

// Instead of using the 'connection' event for building HTTP services,
// we usually pass a callback directly to createServer().
// Let’s redefine the server for clarity.

const serverWithHandler = http.createServer((req, res) => {
  // Log each incoming request
  console.log(`Incoming request: ${req.method} ${req.url}`);

  // Handle the root route
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  // Handle another route: /api/courses
  else if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }

  // Handle unknown routes
  else {
    res.statusCode = 404;
    res.write("Page Not Found");
    res.end();
  }
});

// ---------------
// 3. Start listening on port 3000
// ---------------

serverWithHandler.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
