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
      query GetCurrentUsers($currentUserId: ID!) {
        recentChattedFriends(currentUserId: $currentUserId) {
          _id
          username
          email
          hasAvatar
          description
          userAvatar
        }
      }
    `,
    { variables: { currentUserId: currentUser._id } }
  );

  setRefreshRecentChats(refetch);
  return (
    <>
      {loading ? (
        <div className="w-screen md:w-full bg-[rgba(0,0,0,.9)] h-screen overflow-hidden md:pb-0 flex flex-col">
          <div className="flex justify-between items-center px-2 mt-1">
            <AddSearchPanel />
          </div>
        </div>
      ) : (
        <div className="w-screen md:w-full bg-[rgba(0,0,0,.9)] h-screen overflow-hidden md:pb-0 flex flex-col">
          <div className="flex justify-between items-center px-2 mt-1">
            <AddSearchPanel />
          </div>
          <ul className="overflow-auto scrollbar-thumb-[rgba(0,0,0,.8)] scrollbar-thin scrollbar-track-transparent flex-1 pb-8 flex flex-col">
            {data.recentChattedFriends.map((friend) => (
              <li key={friend._id} onClick={() => handleClick(friend)}>
                <FriendProfile {...friend} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default RecentChatPage;
