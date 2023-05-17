import { useState } from "react";
import { shallow } from "zustand/shallow";
import { MdSend, BsEmojiSmile, BsFileEarmarkFill } from "react-icons/all";
import useChatStore from "../hooks/useChatStore";

function ChatFooter() {
  const [message, setMessage] = useState("");

  const [currentUser, selectedUser, socket, refreshRecentChats] = useChatStore(
    (state) => [
      state.currentUser,
      state.selectedUser,
      state.socket,
      state.refreshRecentChats,
    ],
    shallow
  );

  const handleMessageSend = () => {
    const currentUserId = currentUser._id;
    const selectedUserId = selectedUser._id;
    const text = message.trim();
    const messageBody = {
      message: text,
      to: selectedUserId,
      from: currentUserId,
    };

    const regex = /([^\s].*)/;
    if (regex.test(messageBody.message)) {
      socket.emit("chat", messageBody);
      refreshRecentChats();
    }
    setMessage("");
  };

  return (
    <div className="mx-auto w-10/12 mb-3 flex items-center justify-start my-1 md:mb-10 rounded-lg ">
      <div className="flex items-center justify-center px-1 py-1 text-white self-end">
        <BsEmojiSmile className="mr-3  text-[1.1rem]" />
        <BsFileEarmarkFill className="mr-3 text-[1rem]" />
      </div>
      <div className="flex-1 flex items-center justify-center bg-[rgba(0,0,0,.6)] rounded-md px-2 py-2">
        <textarea
          type="text"
          className="flex-1 bg-transparent  px-3 md:py-3 h-[2.5rem] max-h-[4rem] focus:outline-none focus:ring-0 text-white whitespace-normal scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent"
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
          <MdSend className="mr-1 text-white text-[1.5rem]" />
        </div>
      </div>
    </div>
  );
}

export default ChatFooter;
