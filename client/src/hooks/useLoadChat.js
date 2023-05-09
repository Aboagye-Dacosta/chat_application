import { io } from "socket.io-client";
import { useState } from "react";

function useLoadChat() {
  const [chatMessage, setChatMessage] = useState({});
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

  const sendMessage = (message) => {
    socket.emit("chat", { ...message });
  };

  socket.on("chat", (args) => {
    console.log("🚀 ~ file: useLoadChat.js:24 ~ socket.on ~ args:", args)
    setChatMessage(args);
  });

  return { chatMessage, sendMessage };
}

export default useLoadChat;
