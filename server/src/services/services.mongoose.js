const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db...");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

function connectMongo() {
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function disconnectMongo() {
  return mongoose.disconnect();
}
connectMongo();
module.exports = {
  connectMongo,
  disconnectMongo,
  mongoose,
};
