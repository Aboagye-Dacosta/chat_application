import React from "react";
import ChatItem from "./ChatItem";

function ChatDisplay({ chats }) {
  return (
    <div className='flex-1 px-10 overflow-auto  scrollbar-thin scrollbar-thumb-[rgba(0,0,0,.8)]'>
      <ul>
        {chats.map((chat, index) => (
          <ChatItem key={chat._id} {...chat} />
        ))}
      </ul>
    </div>
  );
}

export default ChatDisplay;
