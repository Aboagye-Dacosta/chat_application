import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useQuery, gql } from "@apollo/client";

import ChatDisplay from "../components/ChatDisplay";
import ChatHeader from "../components/ChatHeader";
import ChatFooter from "../components/ChatFooter";
import RecentChatPage from "./RecentChatPage";
import AppLayout from "./AppLayout";

import { httpCurrentUser } from "../hooks/fetchData";
import useChatStore from "../hooks/useChatStore";

function ChatPage() {
  const navigate = useNavigate();
  const [setCurrentUser, setIsUserLoggedIn, selectedUser, socket] =
    useChatStore(
      (state) => [
        state.setCurrentUser,
        state.setIsUserLoggedIn,
        state.selectedUser,
        state.socket,
      ],
      shallow
    );

  const checkLoggedIn = useCallback(async () => {
    const data = await httpCurrentUser();
    if (!data.status) {
      navigate("/login");
    } else {
      setIsUserLoggedIn(true);
    }
  }, []);

  checkLoggedIn();

  const { data, loading } = useQuery(gql`
    query {
      currentUser {
        _id
        username
        email
        hasAvatar
        description
        userAvatar
      }
    }
  `);

  if (loading) {
    return <div>Loading ...</div>;
  }

  setCurrentUser(data.currentUser);
  socket.emit("userDetails", { _id: data.currentUser._id });
  const selectedUserState = Object.keys(selectedUser).length > 0;
  return (
    <AppLayout>
      <div className="hidden lg:grid grid-cols-[_minmax(20rem,2fr),5fr] overflow-hidden">
        <RecentChatPage />
        <div className="bg-[rgba(0,0,0,.8)]  md:flex flex-col w-ful backdrop:blur-sm relative flex-1 h-full overflow-hidden ">
          {selectedUserState && (
            <>
              <ChatHeader lastSeen="last seen" username="John Doe" />
              <ChatDisplay />
              <ChatFooter />
            </>
          )}
        </div>
      </div>
      {/* <div className="lg:hidden overflow-hidden">
        {!selectedUserState && <RecentChatPage />}
        {selectedUserState && (
          <div className="bg-[rgba(0,0,0,.8)] flex flex-col w-ful backdrop:blur-sm relative flex-1 h-screen overflow-hidden pb-[3rem]">
            <ChatHeader lastSeen="last seen" username="John Doe" />
            <ChatDisplay />
            <ChatFooter />
          </div>
        )}
      </div> */}
    </AppLayout>
  );
}

export default ChatPage;
