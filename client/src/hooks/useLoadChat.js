//load chat from server
import { useState, useEffect, useCallback } from "react";
import { Manager } from "socket.io-client";

const URL = "http://localhost:8000";

const sampleChat = [
  {
    _id: "1",
    message: "hello there",
    current: true,
    date: "11-12-2020",
    image: "https://picsum.photos/200",
  },
  {
    _id: "2",
    message: "hello",
    current: false,
    date: "11-12-2020",
    image: "https://picsum.photos/300",
  },
  {
    _id: "3",
    message: "did the test come out well?",
    current: true,
    date: "11-12-2020",
    image: "https://picsum.photos/200",
  },
  {
    _id: "4",
    message: "yes, it did",
    current: false,
    date: "11-12-2020",
    image: "https://picsum.photos/300",
  },
  {
    _id: "5",
    message:
      "Sorry for everything that's happened. I'm glad we're friends again and I pray nothing comes in between us again. I love you so much",
    current: true,
    date: "11-12-2020",
    image: "https://picsum.photos/200",
  },
];

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
