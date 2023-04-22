function socket(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("hello", (args) => {
      console.log(args);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

module.exports = socket;
