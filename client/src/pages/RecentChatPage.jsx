import FriendProfile from "../components/FriendProfile";
import AddSearchPanel from "../components/AddSearchPanel";
import useChatStore from "../hooks/useChatStore";
import { shallow } from "zustand/shallow";
import { useQuery, gql } from "@apollo/client";

function RecentChatPage() {
  const [setRefreshRecentChats, setSelectedUser, currentUser] = useChatStore(
    (state) => [
      state.setRefreshRecentChats,
      state.setSelectedUser,
      state.currentUser,
    ],
    shallow
  );

  const handleClick = (friend) => {
    setSelectedUser(friend);
  };

  const { data, loading, refetch, error } = useQuery(
    gql`
      query {
        recentChattedUsers {
          to {
            _id
            username
            hasAvatar
            userAvatar
          }
          from {
            _id
            username
            hasAvatar
            userAvatar
          }
        }
      }
    `
  );

  setRefreshRecentChats(refetch);
  console.log(data, error);
  return (
    <>
      {loading || (
        <div className="w-screen md:w-full bg-[rgba(0,0,0,.9)] h-screen overflow-hidden md:pb-0 flex flex-col">
          <div className="flex justify-between items-center px-2 mt-1">
            <AddSearchPanel />
          </div>
          <ul className="overflow-auto scrollbar-thumb-[rgba(0,0,0,.8)] scrollbar-thin scrollbar-track-transparent flex-1 pb-8 flex flex-col">
            {data.recentChattedUsers.map((obj) => {
              let results = null;
              if (obj.to._id === currentUser._id) {
                results = (
                  <li key={obj.from._id} onClick={() => handleClick(obj.from)}>
                    <FriendProfile {...obj.from} />
                  </li>
                );
              } else {
                results = (
                  <li key={obj.to._id} onClick={() => handleClick(obj.to)}>
                    <FriendProfile {...obj.to} />
                  </li>
                );
              }
              return results;
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default RecentChatPage;
