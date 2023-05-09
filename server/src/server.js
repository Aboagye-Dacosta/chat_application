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

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

async function startNodeServer() {
  await connectMongo();
  socket(io);
  server.listen(PORT, () => {
    console.log(`server started on port ${PORT}...`);
  });
}

startNodeServer();
