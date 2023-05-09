import IconSend from "../components/icons/IconSend";
import IconEmojis from "../components/icons/IconEmojis";
import IconImage from "../components/icons/IconImage";
import { useState } from "react";
import useChatStore from "../hooks/useChatStore";
import { shallow } from "zustand/shallow";

function ChatFooter() {
  const [message, setMessage] = useState("");

  const [currentUser, selectedUser, sendChatMessage, refreshRecentChats] =
    useChatStore(
      (state) => [
        state.currentUser,
        state.selectedUser,
        state.sendChatMessage,
        state.refreshRecentChats,
      ],
      shallow
    );

  const handleMessageSend = () => {
    const currentUserId = currentUser._id;
    const selectedUserId = selectedUser._id;
    const createdAt = new Date().toISOString();

    const messageBody = {
      message,
      to: selectedUserId,
      from: currentUserId,
      createdAt,
    };

    sendChatMessage(messageBody);
    setMessage("");
  };

  return (
    <div className="mx-auto w-10/12 mb-3 flex items-center justify-start my-1 md:mb-10 bg-[rgba(0,0,0,.7)] rounded-lg ">
      <div className="flex items-center justify-center px-1 py-1 text-white">
        <IconEmojis className="mr-3  text-[1.5rem]" />
        <IconImage className="mr-3 text-[1.5rem]" />
      </div>
      <input
        type="text"
        className="flex-1 bg-transparent py-2 px-3 md:py-3  focus:outline-none focus:ring-0 text-white whitespace-normal "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div
        className="flex items-center justify-center px-1 py-1"
        onClick={() => {
          handleMessageSend();
          refreshRecentChats();
        }}
      >
        <IconSend className="mr-1 text-white text-[1.5rem]" />
      </div>
    </div>
  );
}

export default ChatFooter;
