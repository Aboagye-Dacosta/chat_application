import { useQuery, gql } from "@apollo/client";

import FriendProfile from "../components/FriendProfile";
import AddSearchPanel from "../components/AddSearchPanel";
import { useContext } from "react";
import { ChatContext } from "../hooks/useChatContext";
import Clickable from "../components/Clickable";

function RecentChatPage() {
  const { loading, error, data } = useQuery(
    gql`
      query users {
        users {
          _id
          username
          email
          friends {
            _id
            username
            email
          }

          friendRequests {
            _id
            username
            email
          }
        }
      }
    `
  );

  const { handleToggleShow } = useContext(ChatContext);
  const handleClick = (e) => {
    handleToggleShow();
  };

  return (
    <div className='w-screen md:w-full bg-[rgba(0,0,0,.9)] h-screen overflow-hidden md:pb-0'>
      <div className='flex justify-between items-center px-2 mt-1'>
        <AddSearchPanel />
      </div>
      <ul className='overflow-auto scrollbar-thumb-[rgba(0,0,0,.8)] scrollbar-thin scrollbar-track-transparent h-full pb-3 flex flex-col'>
        {data?.users?.map((user) => (
          <Clickable handleClick={handleClick} key={user._id}>
            <li key={user._id}>
              <FriendProfile identifier={user.username} />
            </li>
          </Clickable>
        ))}
      </ul>
    </div>
  );
}

export default RecentChatPage;
