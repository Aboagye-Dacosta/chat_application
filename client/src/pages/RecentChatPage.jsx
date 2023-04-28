import FriendProfile from "../components/FriendProfile";
import AddSearchPanel from "../components/AddSearchPanel";
import { useContext } from "react";
import { ChatContext } from "../hooks/useChatContext";

function RecentChatPage({ recentUsers, error }) {
  const { handleToggleShow, setSelectedFriendId } = useContext(ChatContext);

  if (error) {
    console.log(error);
  }

  console.log(recentUsers);

  const handleClick = (friendId) => {
    setSelectedFriendId(friendId);
    handleToggleShow();
  };

  

  return (
    <div className='w-screen md:w-full bg-[rgba(0,0,0,.9)] h-screen overflow-hidden md:pb-0 flex flex-col'>
      <div className='flex justify-between items-center px-2 mt-1'>
        <AddSearchPanel />
      </div>
      <ul className='overflow-auto scrollbar-thumb-[rgba(0,0,0,.8)] scrollbar-thin scrollbar-track-transparent flex-1 pb-8 flex flex-col'>
        {recentUsers.recentChattedUsers.map((obj) => (
          <li key={obj.to._id} onClick={() => handleClick(obj.to._id)}>
            <FriendProfile identifier={obj.to.username} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentChatPage;
