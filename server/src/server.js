require("dotenv").config();

const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { connectMongo } = require("./services/services.mongoose");
const socket = require("./services/services.socket");

const PORT = process.env.PORT;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

async function startNodeServer() {
  socket(io);
  await connectMongo();
  server.listen(PORT, () => {
    console.log(`server started on port ${PORT}...`);
  });
}

startNodeServer();
