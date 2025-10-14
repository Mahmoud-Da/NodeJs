const EventEmitter = require("events");

const emitter = new EventEmitter();

// Register a Listener
// other naming: e, event
emitter.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

// Raise an Event
emitter.emit("messageLogged", { id: 1, url: "http://example.com" });
