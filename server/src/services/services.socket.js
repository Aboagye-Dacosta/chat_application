const {
  httpSaveChat,
  httpReadChats,
} = require("../controllers/chats/chats.controller");

function socket(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chat", async (args) => {
      await httpSaveChat(args);
      const data = await httpReadChats(args.from, args.to);
      socket.emit("chat", data);
    });
  });
}

module.exports = socket;
