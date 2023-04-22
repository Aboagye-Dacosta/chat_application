import React, { useCallback, useContext, useEffect, useState } from "react";
import { ChatContext } from "../hooks/useChatContext";

function FriendsPage() {
  const [show, setShow] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const {
    graphqlUsers: {
      refetch: refetchUsers,
      error,
      loading,
      data: {
        users: loadedUsers,
        currentUser: { friends, friendRequests, friendRequestsSent },
      },
    },
    currentUser,
    sendFriendRequest: [sendFriendRequest],
    acceptFriendRequest: [acceptFriendRequest],
    declineFriendRequest: [declineFriendRequest],
    removeFriend: [removeFriend],
  } = useContext(ChatContext);

if (loading) return <div>Loading</div>;
  if (error) console.log(error);

  const [users, setUsers] = useState(loadedUsers);

  const handleDataManipulation = useCallback(() => {
    const data = users.filter((user) => user?._id !== currentUser.user._id);
    setFilteredUsers(data);
  }, []);

  const toggleAddButtonState = (userId) => {
    const results = [...friendRequests, ...friendRequestsSent, ...friends].find(
      (user) => user._id == userId
    );
    return results ? true : false;
  };

  //selected tab effect
  const showSelected = useCallback(() => {
    const selector = document.querySelector(".selected");
    document.querySelector(".nav").addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-item")) {
        const xOffset = Number(e.offsetX);
        const clientX = Number(e.clientX);
        const width = parseInt(e.target.style.width);
        const x = clientX - xOffset;

        if (x < width) selector.style.transform = `translateX(${0}px)`;
        else {
          selector.style.transform = `translateX(${width}px)`;
        }
      }
    });
  }, []);

  useEffect(() => {
    refetchUsers();
    handleDataManipulation();
    showSelected();
    refetchUsers();
  }, [showSelected]);

  

  return (
    <div className='bg-[rgba(0,0,0,0.8)] h-full overflow-hidden'>
      <ul className='nav flex text-white px-4  pt-5 w-full relative'>
        <div className='selected absolute top-full left-[20px]  bg-red-400  h-[1px] w-[150px] transition-transform duration-200'></div>
        <li
          className='text-center capitalize nav-item px-3 py-2 mr-1 md:hover:bg-black select-none w-[10rem]'
          style={{
            width: "150px",
          }}
          onClick={() => {
            refetchUsers();
            setShow(true);
            setUsers(loadedUsers);
          }}
        >
          Friends
        </li>

        <li
          className='nav-item text-center  capitalize px-3 py-2 mr-1 md:hover:bg-black select-none'
          style={{ width: "150px" }}
          onClick={() => {
            refetchUsers();
            setShow(false);
            setUsers(loadedUsers);
          }}
        >
          Users
        </li>
        <li
          className='text-center absolute right-4 top-1/2 -translate-y-1/2 capitalize px-3 py-2 mr-1 md:hover:bg-black select-none'
          onClick={async () => {
            await refetchUsers();
            setUsers(loadedUsers);
          }}
        >
          reload
        </li>
      </ul>

      {show ? (
        <ul className='mx-5 w-full lg:w-[20rem] lg:mx-3 flex flex-col items-start my-5'>
          {friends.map((user) => (
            <li
              key={user._id}
              className='flex items-center justify-start w-full px-3 py-2 bg-[rgba(0,0,0,.6)] select-none text-white cursor-pointer mb-3'
              // onClick={(e) => {
              //   removeFriend({
              //     variables: { id: currentUser.user._id, friendId: user._id },
              //   });
              // }}
            >
              <img
                src='https://picsum.photos/2000'
                alt=''
                className='rounded-full w-7 h-7 mr-4'
              />
              <span className='flex-1 ml-2'> {user.username}</span>
              <button
                className='text-red-500'
                onClick={async () => {
                  await removeFriend({
                    variables: { id: currentUser.user._id, friendId: user._id },
                  });
                  await refetchUsers();
                  setUsers(loadedUsers);
                }}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className='lg:mx-5 h-full w-full text-white flex flex-col  items-center justify-start lg:grid lg:grid-cols-3 overflow-auto scrollbar-thin scrollbar-thumb-black lg:overflow-hidden'>
          {friendRequestsSent.length > 0 && (
            <div className='flex flex-col w-10/12 lg:w-[20rem] lg:mr-3 justify-start items-center lg:h-full '>
              <h2 className='py-2 text-left w-full'>Sent Requests</h2>
              <ul className='mb-5 w-full lg:w-full'>
                {friendRequestsSent.map((user) => (
                  <li
                    className='flex justify-between items-center w-full  bg-[rgba(0,0,0,.8)] px-3 py-2 mb-3 select-none cursor-pointer'
                    key={user._id}
                  >
                    <img src='' alt='' className='w-7 h-7 rounded-full' />
                    <span className='flex-1 ml-2'>{user.username}</span>
                    <button
                      onClick={async () => {
                        await declineFriendRequest({
                          variables: {
                            id: currentUser.user._id,
                            friendId: user._id,
                          },
                        });
                        await refetchUsers();
                        setUsers(loadedUsers);
                      }}
                    >
                      cancel
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {friendRequests.length > 0 && (
            <div className='flex flex-col lg:h-full w-10/12 lg:w-[20rem] lg:mr-3 justify-start items-center '>
              <h2 className='py-2 text-left w-full'>Received Requests</h2>
              <ul className='mb-5 w-full lg:w-full'>
                {friendRequests.map((user) => (
                  <li
                    className='flex  justify-between items-center  w-full  bg-[rgba(0,0,0,.8)] px-3 py-2 mb-3 select-none cursor-pointer'
                    key={user._id}
                  >
                    <img src='' alt='' className='w-7 h-7 rounded-full' />
                    <span className='self-start flex-1 ml-2'>
                      {user.username}
                    </span>
                    <button
                      className='mr-2 text-red-500'
                      onClick={async () => {
                        await declineFriendRequest({
                          variables: {
                            id: user._id,
                            friendId: currentUser.user._id,
                          },
                        });
                        await refetchUsers();
                        setUsers(loadedUsers);
                      }}
                    >
                      decline
                    </button>
                    <button
                      onClick={() => {
                        acceptFriendRequest({
                          variables: {
                            id: currentUser.user._id,
                            friendId: user._id,
                          },
                        });
                        refetchUsers();
                        setUsers(loadedUsers);
                      }}
                    >
                      confirm
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {filteredUsers.length > 0 && (
            <div className='flex flex-col lg:h-full w-10/12 lg:w-[20rem] lg:mr-3 justify-start items-center'>
              <h2 className='py-2 text-left w-full'>Users</h2>
              <ul className='mb-5 w-full lg:w-full'>
                {filteredUsers.map((user) => (
                  <li
                    className='flex  w-full  justify-between items-center bg-[rgba(0,0,0,.8)] px-3 py-2 mb-3 select-none cursor-pointer'
                    key={user.id}
                  >
                    <img src='' alt='' className='w-7 h-7 rounded-full' />
                    <span className='flex-1 ml-2'>{user.username}</span>
                    <button
                      className='disabled:text-gray-400'
                      disabled={toggleAddButtonState(user._id)}
                      onClick={async () => {
                        await sendFriendRequest({
                          variables: {
                            id: currentUser.user._id,
                            friendId: user._id,
                          },
                        });
                        await refetchUsers();
                        setUsers(loadedUsers);
                      }}
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FriendsPage;
