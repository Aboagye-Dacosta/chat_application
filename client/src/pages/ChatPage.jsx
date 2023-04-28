import { useEffect, useState, useContext, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import ChatDisplay from "../components/ChatDisplay";
import ChatHeader from "../components/ChatHeader";
import ChatFooter from "../components/ChatFooter";
import RecentChatPage from "./RecentChatPage";
import SideNav from "../components/SideNav";
import Background from "../components/Background";
import FriendsPage from "./FriendsPage";

import { ChatContext } from "../hooks/useChatContext";
import { httpCurrentUser } from "../hooks/fetchData";

function ChatPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(true);
  const { showChat, selectedFriendId } = useContext(ChatContext);

  const checkLoggedIn = useCallback(async () => {
    const data = await httpCurrentUser();
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

  const { data, loading, error } = useQuery(gql`
    query {
      recentChattedUsers {
        to {
          _id
          username
        }
      }
    }
  `);

  console.log(data);

  return (
    <>
      {loading || (
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
                  <RecentChatPage recentUsers={data} error={error} />
                  <div className='bg-[rgba(0,0,0,.8)]  md:flex flex-col w-ful backdrop:blur-sm relative flex-1 h-full overflow-hidden '>
                    {selectedFriendId && (
                      <ChatHeader lastSeen='last seen' username='John Doe' />
                    )}
                    <ChatDisplay />
                    {selectedFriendId && <ChatFooter />}
                  </div>
                </div>
                <div className='md:hidden overflow-hidden'>
                  {!showChat && (
                    <RecentChatPage recentUsers={data} error={error} />
                  )}
                  {showChat && (
                    <div className='bg-[rgba(0,0,0,.8)] flex flex-col w-ful backdrop:blur-sm relative flex-1 h-screen overflow-hidden pb-[3rem]'>
                      <ChatHeader lastSeen='last seen' username='John Doe' />
                      <ChatDisplay />
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
      )}
    </>
  );
}

export default ChatPage;
