require("dotenv").config();

const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { connectMongo } = require("./services/services.mongoose");
const socket = require("./services/services.socket");
const {
  httpSaveChat,
  httpReadChats,
} = require("./controllers/chats/chats.controller");

const PORT = process.env.PORT;
const server = http.createServer(app);
const userIds = {};
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("userDetails", (data) => {
    userIds[data._id] = socket.id;
    console.log("loading from services.socket", userIds);
  });

  socket.on("chat", async (args) => {
    await httpSaveChat(args);
    const data = await httpReadChats(args.from, args.to);

    const messageBody = {
      to: args.to,
      from: args.from,
      data,
    };

    socket.emit("chat", messageBody);
    socket.to(userIds[args.to]).emit("chat", messageBody);
  });
});

async function startNodeServer() {
  await connectMongo();
  // socket(io);
  server.listen(PORT, () => {
    console.log(`server started on port ${PORT}...`);
  });
}

startNodeServer();
