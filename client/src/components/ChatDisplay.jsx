import React, { useContext, useEffect } from "react";
import ChatItem from "./ChatItem";
import { ChatContext } from "../hooks/useChatContext";
import { gql, useQuery } from "@apollo/client";

function ChatDisplay() {
  const { selectedFriendId } = useContext(ChatContext);
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
        }
      }
    `,
    {
      variables: { friendId: selectedFriendId },
    }
  );

  refetch();

  return (
    <>
      {loading ||
        (data ? (
          <div className='flex-1 px-10 overflow-auto  scrollbar-thin scrollbar-thumb-[rgba(0,0,0,.8)]'>
            <ul>
              {data.readChats.map((chat, index) => (
                <ChatItem
                  key={chat._id}
                  date={new Date(Number(chat.createdAt)).toDateString()}
                  current={chat.from === data.currentUser._id}
                  message={chat.message}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className='flex items-center justify-center flex-1 px-10 overflow-auto  scrollbar-thin scrollbar-thumb-[rgba(0,0,0,.8)]'>
            welcome
          </div>
        ))}
    </>
  );
}

export default ChatDisplay;
