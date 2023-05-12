const {
  httpSaveChat,
  httpReadChats,
} = require("../controllers/chats/chats.controller");

const userIds = {};

function socket(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("userDetails", (data) => {
      userIds[data._id] = socket.id;
      console.log("loading from services.socket", userIds);
    });

    socket.on("chat", async (args) => {
      await httpSaveChat(args);
      const data = await httpReadChats(args.from, args.to);
      
    });
  });
}

module.exports = socket;
