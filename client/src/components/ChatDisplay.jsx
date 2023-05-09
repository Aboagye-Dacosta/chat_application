import ChatItem from "./ChatItem";
import useChatStore from "../hooks/useChatStore";
import { shallow } from "zustand/shallow";
import { useQuery, gql } from "@apollo/client";
import useLoadChat from "../hooks/useLoadChat";

function ChatDisplay() {
  const [selectedUser, currentUser, setSendMessage, setCurrentUser] =
    useChatStore(
      (state) => [
        state.selectedUser,
        state.currentUser,
        state.setSendMessage,
        state.setCurrentUser,
      ],
      shallow
    );

  const { sendMessage, chatMessage } = useLoadChat();
  setSendMessage(sendMessage);
  console.log("🚀 ~ file: App.jsx:18 ~ App ~ chatMessage:", chatMessage);

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
        currentUser {
          _id
          username
          email
          hasAvatar
          description
          userAvatar
        }
      }
    `,
    {
      variables: { friendId: selectedUser._id },
    }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 px-10 overflow-auto  scrollbar-thin scrollbar-thumb-[rgba(0,0,0,.8)]">
        loading
      </div>
    );
  }

  setCurrentUser(data.currentUser);

  console.log("loading from display chat", data.currentUser);
  const getChatState = (chat) => {
    const state = chat.from === currentUser._id;
    return state;
  };

  let chatData = data.readChats;
  if (chatMessage.length > 0) {
    chatData = chatMessage;
  }

  return (
    <>
      {chatData.length > 0 ? (
        <div className="flex-1 px-10 overflow-auto  scrollbar-thin scrollbar-thumb-[rgba(0,0,0,.8)]">
          <ul>
            {chatData.map((chat) => (
              <ChatItem
                key={chat._id}
                date={new Date(Number(chat.createdAt)).toDateString()}
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
