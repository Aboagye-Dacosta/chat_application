import { useCallback, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AiOutlineReload } from "react-icons/all";
import AppLayout from "./AppLayout";
import useHandleFriendRequests from "../hooks/useHandleFriendRequests";
import useChatStore from "../hooks/useChatStore";
import FriendsPageItem from "../components/FriendsPageItem";

function FriendsPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const {
    acceptFriendRequest,
    declineFriendRequest,
    sendFriendRequest,
    removeFriend,
  } = useHandleFriendRequests();

  const [setSelectedUser, setCurrentUser] = useChatStore(
    (state) => [state.setSelectedUser, state.setCurrentUser],
    shallow
  );

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
    showSelected();
  }, []);

  const toggleAddButtonState = (data, userId) => {
    const {
      currentUser: { friendRequests, friendRequestsSent, friends },
    } = data;
    const results = [...friendRequests, ...friendRequestsSent, ...friends].find(
      (user) => user._id === userId
    );

    return results ? true : false;
  };

  const {
    loading,
    data,
    refetch: refetchUsers,
  } = useQuery(gql`
    {
      users {
        _id
        username
        hasAvatar
        userAvatar
      }
      currentUser {
        _id
        username
        email
        description
        hasAvatar
        userAvatar
        friends {
          _id
          username
          hasAvatar
          userAvatar
        }
        friendRequestsSent {
          _id
          username
          userAvatar
          hasAvatar
        }
        friendRequests {
          _id
          username
          userAvatar
          hasAvatar
        }
      }
    }
  `);

  useEffect(() => {
    setCurrentUser({
      _id: data?.currentUser?._id,
      username: data?.currentUser?.username,
      hasAvatar: data?.currentUser?.hasAvatar,
      userAvatar: data?.currentUser?.userAvatar,
      description: data?.currentUser?.description,
      email: data?.currentUser?.email,
    });
  }, [loading]);

  return (
    <AppLayout>
      {loading && show ? (
        <div className="bg-[rgba(0,0,0,0.8)] h-full overflow-hidden">
          <ul className="nav flex text-white px-4  pt-5 w-full relative">
            <div className="selected absolute top-full left-[20px]  bg-red-400  h-[1px] w-[150px] transition-transform duration-200"></div>
            <li
              className="nav-item text-center capitalize nav-item px-3 py-2 mr-1 md:hover:bg-black select-none w-[10rem]"
              style={{
                width: "150px",
              }}
              onClick={() => {
                refetchUsers();
                setShow(true);
              }}
            >
              Friends
            </li>

            <li
              className="nav-item text-center  capitalize px-3 py-2 mr-1 md:hover:bg-black select-none"
              style={{ width: "150px" }}
              onClick={() => {
                refetchUsers();
                setShow(false);
              }}
            >
              Users
            </li>
            <li
              className="nav-item text-center absolute right-4 top-1/2 -translate-y-1/2 capitalize px-3 py-2 mr-1 md:hover:bg-black select-none"
              onClick={async () => {
                await refetchUsers();
              }}
            >
              <AiOutlineReload className="text-[1.2rem] hover:bg-slate-800" />
            </li>
          </ul>
        </div>
      ) : (
        <div className="bg-[rgba(0,0,0,0.8)] h-full overflow-hidden">
          <ul className="nav flex text-white px-4  pt-5 w-full relative">
            <div className="selected absolute top-full left-[20px]  bg-red-400  h-[1px] w-[150px] transition-transform duration-200"></div>
            <li
              className="nav-item text-center capitalize nav-item px-3 py-2 mr-1 md:hover:bg-black select-none w-[10rem] rounded-md"
              style={{
                width: "150px",
              }}
              onClick={() => {
                refetchUsers();
                setShow(true);
              }}
            >
              Friends
            </li>

            <li
              className="nav-item text-center  capitalize px-3 py-2 mr-1 md:hover:bg-black select-none rounded-md"
              style={{ width: "150px" }}
              onClick={() => {
                refetchUsers();
                setShow(false);
              }}
            >
              Users
            </li>
            <li
              className="text-center absolute right-4 top-1/2 -translate-y-1/2 capitalize px-3 py-2 mr-1 md:hover:bg-black select-none rounded-md"
              onClick={async () => {
                await refetchUsers();
              }}
            >
              <AiOutlineReload className="text-[1.2rem]" />
            </li>
          </ul>

          {show ? (
            <ul className="mx-5 w-full lg:w-[20rem] lg:mx-3 flex flex-col items-start my-5">
              {data.currentUser.friends.map((user) => (
                <FriendsPageItem
                  key={user.id}
                  action={"Unfriend"}
                  data={user}
                  styles={"text-red-300"}
                  actionFunction={async (e) => {
                    e.stopPropagation();
                    await removeFriend({
                      variables: {
                        id: data.currentUser._id,
                        friendId: user._id,
                      },
                    });
                    await refetchUsers();
                  }}
                  handleClick={(e) => {
                    e.preventDefault();
                    setSelectedUser(user);
                    navigate("/");
                  }}
                />
              ))}
            </ul>
          ) : (
            <div className="lg:mx-5 h-full w-full text-white flex flex-col  items-center justify-start lg:grid lg:grid-cols-3 overflow-auto scrollbar-thin scrollbar-thumb-black lg:overflow-hidden">
              {data.currentUser.friendRequestsSent.length > 0 && (
                <div className="flex flex-col w-10/12 lg:w-[20rem] lg:mr-3 justify-start items-center lg:h-full ">
                  <h2 className="py-2 text-left w-full">Sent Requests</h2>
                  <ul className="mb-5 w-full lg:w-full">
                    {data.currentUser.friendRequestsSent.map((user) => (
                      <FriendsPageItem
                        key={user.id}
                        action={"cancel"}
                        styles={"text-red-300"}
                        data={user}
                        actionFunction={async () => {
                          await declineFriendRequest({
                            variables: {
                              id: data.currentUser._id,
                              friendId: user._id,
                            },
                          });
                          await refetchUsers();
                        }}
                      />
                    ))}
                  </ul>
                </div>
              )}
              {data.currentUser.friendRequests.length > 0 && (
                <div className="flex flex-col lg:h-full w-10/12 lg:w-[20rem] lg:mr-3 justify-start items-center ">
                  <h2 className="py-2 text-left w-full">Received Requests</h2>
                  <ul className="mb-5 w-full lg:w-full">
                    {data.currentUser.friendRequests.map((user) => (
                      <FriendsPageItem
                        key={user.id}
                        action={"confirm"}
                        data={user}
                        actionFunction={() => {
                          acceptFriendRequest({
                            variables: {
                              id: data.currentUser._id,
                              friendId: user._id,
                            },
                          });
                          refetchUsers();
                        }}
                        hasSecondButton={true}
                        secondActionFunction={async () => {
                          await declineFriendRequest({
                            variables: {
                              id: user._id,
                              friendId: data.currentUser._id,
                            },
                          });
                          await refetchUsers();
                        }}
                      />
                    ))}
                  </ul>
                </div>
              )}
              {data.users.length > 0 && (
                <div className="flex flex-col lg:h-full w-10/12 lg:w-[20rem] lg:mr-3 justify-start items-center">
                  <h2 className="py-2 text-left w-full">Users</h2>
                  <ul className="mb-5 w-full lg:w-full">
                    {data.users.map((user) => (
                      <FriendsPageItem
                        key={user.id}
                        action={"Add"}
                        data={user}
                        styles={"text-white"}
                        disabbled={toggleAddButtonState(data, user._id)}
                        actionFunction={async () => {
                          await sendFriendRequest({
                            variables: {
                              id: data.currentUser._id,
                              friendId: user._id,
                            },
                          });
                          await refetchUsers();
                        }}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}

export default FriendsPage;
