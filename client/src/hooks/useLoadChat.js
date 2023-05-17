import { io } from "socket.io-client";

function useLoadChat() {
  const socket = io();

  socket.on("connect", () => {
    console.log("socket connect successfully");
  });

  socket.on("disconnect", (reason) => {
    console.log("🚀 ~ file: useLoadChat.js:11 ~ useLoadChat ~ reason:", reason);
    if ((reason = "io server disconnect")) {
      socket.connect();
    }
  });

  return { socket };
}

export default useLoadChat;
