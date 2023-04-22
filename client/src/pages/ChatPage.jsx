import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ChatDisplay from "../components/ChatDisplay";
import ChatHeader from "../components/ChatHeader";
import ChatFooter from "../components/ChatFooter";
import RecentChatPage from "./RecentChatPage";
import SideNav from "../components/SideNav";
import Background from "../components/Background";
import FriendsPage from "./FriendsPage";
import useLoadChat from "../hooks/useLoadChat";
import { ChatContext } from "../hooks/useChatContext";
import { httpCurrentUser } from "../hooks/fetchData";

function ChatPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  const [selected, setSelected] = useState(true);
  const { sampleChat } = useLoadChat(currentUser);
  const { showChat, graphqlUsers } = useContext(ChatContext);
  const { loading } = graphqlUsers;

  const checkLoggedIn = useCallback(async () => {
    const data = await httpCurrentUser();
    setCurrentUser(data);

    if (!data.status) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  const handleCurrent = () => {
    setSelected(true);
  };

  const handleFriends = () => {
    setSelected(false);
  };

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <Background>
      <div className='w-screen flex flex-col md:grid md:grid-cols-[3rem,5fr] md:w-11/12 md:mx-auto h-screen md:my-2  md:h-[calc(100vh-2rem)]'>
        <SideNav
          handleCurrent={handleCurrent}
          handleFriends={handleFriends}
          selected={selected}
        />
        {selected ? (
          <>
            <div className='hidden md:grid grid-cols-[_minmax(20rem,2fr),5fr] overflow-hidden'>
              <RecentChatPage />
              <div className='bg-[rgba(0,0,0,.8)]  md:flex flex-col w-ful backdrop:blur-sm relative flex-1 h-full overflow-hidden '>
                <ChatHeader lastSeen='last seen' username='John Doe' />
                <ChatDisplay chats={sampleChat} />
                <ChatFooter />
              </div>
            </div>
            <div className='md:hidden overflow-hidden'>
              {!showChat && <RecentChatPage />}
              {showChat && (
                <div className='bg-[rgba(0,0,0,.8)] flex flex-col w-ful backdrop:blur-sm relative flex-1 h-screen overflow-hidden pb-[3rem]'>
                  <ChatHeader lastSeen='last seen' username='John Doe' />
                  <ChatDisplay chats={sampleChat} />
                  <ChatFooter />
                </div>
              )}
            </div>
          </>
        ) : (
          <FriendsPage />
        )}
      </div>
    </Background>
  );
}

export default ChatPage;
