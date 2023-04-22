import { useState, createContext, useEffect, useCallback } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { httpCurrentUser } from "./fetchData";

export const ChatContext = createContext();

export function useChatContext() {
  const [showChat, setShowChat] = useState(false);
  const [isSmallDev, setIsSmallDev] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const graphqlUsers = useQuery(gql`
    {
      users {
        _id
        username
      }
      currentUser {
        _id
        username
        friends {
          _id
          username
        }
        friendRequestsSent {
          _id
          username
        }
        friendRequests {
          _id
          username
        }
      }
    }
  `);

  // console.log(graphqlUsers);

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

  const fetchCurrentUser = useCallback(async () => {
    const data = await httpCurrentUser();
    setCurrentUser(data);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleToggleShow = useCallback(() => {
    setShowChat((prev) => !prev);
  }, []);

  const handleSetIsSmallDev = useCallback((value) => {
    setIsSmallDev(value);
  }, []);

  return {
    currentUser,
    graphqlUsers,
    showChat,
    isSmallDev,
    handleToggleShow,
    handleSetIsSmallDev,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
  };
}
