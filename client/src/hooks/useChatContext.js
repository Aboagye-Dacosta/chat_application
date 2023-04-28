import { useState, createContext, useCallback } from "react";
import { gql, useMutation } from "@apollo/client";

export const ChatContext = createContext();

export function useChatContext() {
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
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isSmallDev, setIsSmallDev] = useState(false);
  //     users {
  //       _id
  //       username
  //     }
  //     currentUser {
  //       _id
  //       username
  //       friends {
  //         _id
  //         username
  //       }
  //       friendRequestsSent {
  //         _id
  //         username
  //       }
  //       friendRequests {
  //         _id
  //         username
  //       }
  //     }
  //   }
  // `);

  const sendFriendRequest = useMutation(gql`
    mutation SendFriendRequest($id: ID!, $friendId: ID!) {
      sendFriendRequest(id: $id, friendId: $friendId)
    }
  `);

  const acceptFriendRequest = useMutation(gql`
    mutation AcceptFriendRequest($id: ID!, $friendId: ID!) {
      acceptFriendRequest(id: $id, friendId: $friendId)
    }
  `);

  const declineFriendRequest = useMutation(gql`
    mutation DeclineFriendRequest($id: ID!, $friendId: ID!) {
      declineFriendRequest(id: $id, friendId: $friendId)
    }
  `);

  const removeFriend = useMutation(gql`
    mutation RemoveFriend($id: ID!, $friendId: ID!) {
      removeFriend(id: $id, friendId: $friendId)
    }
  `);

  const handleToggleShow = useCallback(() => {
    setShowChat((prev) => !prev);
  }, []);

  const handleSetIsSmallDev = useCallback((value) => {
    setIsSmallDev(value);
  }, []);

  return {
    selectedFriendId,
    setSelectedFriendId,
    showChat,
    isSmallDev,
    handleToggleShow,
    handleSetIsSmallDev,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    sampleChat,
  };
}
