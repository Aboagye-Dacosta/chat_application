import ChatItem from "./ChatItem";
import useChatStore from "../hooks/useChatStore";
import { shallow } from "zustand/shallow";
import { useQuery, gql } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import ProfileDetail from "./ProfileDetail";

function ChatDisplay() {
  const [chatMessages, setMessage] = useState([]);
  const [selectedUser, currentUser, socket] = useChatStore(
    (state) => [state.selectedUser, state.currentUser, state.socket],
    shallow
  );

  const { loading, data, refetch } = useQuery(
    gql`
      query ReadChats($friendId: ID!) {
        readChats(friendId: $friendId) {
          _id
          message
          to
          from
          createdAt
        }
      }
    `,
    {
      variables: { friendId: selectedUser._id },
    }
  );

  const refetchData = useCallback(async () => {
    const { data } = await refetch();
    setMessage(data.readChats);
  });

  useEffect(() => {
    setMessage(data?.readChats || []);
  }, [loading]);

  useEffect(() => {
    refetchData();
  }, [selectedUser]);

  const getChatState = (chat) => {
    const state = chat.from === currentUser._id;
    return state;
  };

  socket.on("chat", (args) => {
    if (
      (args.from === currentUser._id || selectedUser._id === args.from) &&
      (args.to === currentUser._id || selectedUser._id === args.to)
    ) {
      setMessage(args.data);
    }
  });

  return (
    <>
      {loading == false && chatMessages?.length > 0 ? (
        <div className="displayChat flex-1 px-10 overflow-auto  scrollbar-thin scrollbar-thumb-[rgba(0,0,0,.8)]">
          <ul>
            {chatMessages.map((chat) => (
              <ChatItem
                key={chat._id}
                date={chat.createdAt}
                current={getChatState(chat)}
                message={chat.message}
                hasAvatar={
                  getChatState(chat)
                    ? currentUser.hasAvatar
                    : selectedUser.hasAvatar
                }
                userAvatar={
                  getChatState(chat)
                    ? currentUser.userAvatar
                    : selectedUser.userAvatar
                }
                userName={
                  getChatState(chat)
                    ? currentUser.username
                    : selectedUser.username
                }
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1 px-10 overflow-auto  scrollbar-thin scrollbar-thumb-[rgba(0,0,0,.8)]">
          welcome
        </div>
      )}
    </>
  );
}

export default ChatDisplay;
