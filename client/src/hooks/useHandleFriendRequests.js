//load chat from server
import { useMutation, gql } from "@apollo/client";

// const URL = "http://localhost:8000";

export default function useHandleFriendRequests() {
  const [sendFriendRequest] = useMutation(gql`
    mutation SendFriendRequest($id: ID!, $friendId: ID!) {
      sendFriendRequest(id: $id, friendId: $friendId)
    }
  `);

  const [acceptFriendRequest] = useMutation(gql`
    mutation AcceptFriendRequest($id: ID!, $friendId: ID!) {
      acceptFriendRequest(id: $id, friendId: $friendId)
    }
  `);

  const [declineFriendRequest] = useMutation(gql`
    mutation DeclineFriendRequest($id: ID!, $friendId: ID!) {
      declineFriendRequest(id: $id, friendId: $friendId)
    }
  `);

  const [removeFriend] = useMutation(gql`
    mutation RemoveFriend($id: ID!, $friendId: ID!) {
      removeFriend(id: $id, friendId: $friendId)
    }
  `);

  return {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
  };
}
