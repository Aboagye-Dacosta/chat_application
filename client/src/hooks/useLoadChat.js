//load chat from server
import { useState, useEffect, useCallback } from "react";
import { Manager } from "socket.io-client";

const URL = "http://localhost:8000";


export default function useLoadChat(currentUser) {
  // const manager = new Manager(URL, {
  //   reconnectionDelayMax: 1000,
  //   query: {
  //     key: "value",
  //   },
  // });

  // const socket = manager.socket("/chat", {
  //   auth: {
  //     token: "123",
  //   },
  // });

  // manager.open((err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });

  return { sampleChat };
}
