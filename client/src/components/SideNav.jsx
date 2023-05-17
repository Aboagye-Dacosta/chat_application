import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import {
  AiFillMessage,
  BsFillPeopleFill,
  IoArrowBackOutline,
} from "react-icons/all";

import Clickable from "./Clickable";
import ProfileImage from "./ProfileImage";
import useChatStore from "../hooks/useChatStore";
import { useState } from "react";
import ProfileDetail from "./ProfileDetail";

function SideNav() {
  const [
    currentUser,
    setSelectedUser,
    refreshRecentChats,
    showChat,
    setShowChat,
  ] = useChatStore(
    (state) => [
      state.currentUser,
      state.setSelectedUser,
      state.refreshRecentChats,
      state.showChat,
      state.setShowChat,
    ],
    shallow
  );

  const [toggleProfile, setToggleProfile] = useState(false);
  const toggleShowChat = () => {
    setShowChat(false);
    setSelectedUser({});
  };

  return (
    <>
      <div className="flex py-1 md:flex-col items-center justify-between bg-[rgba(0,0,0)] md:py-5 text-white">
        <ul className="flex md:flex-col items-center justify-center">
          {showChat && (
            <Clickable
              className="md:hidden"
              handleClick={() => toggleShowChat()}
            >
              <li className="link md:mt-3 mr-1 md:mr-0  rounded-full p-2 hover:bg-gray-500 transition-all duration-200 text-white">
                <IoArrowBackOutline className="text-[1.2rem]" />
              </li>
            </Clickable>
          )}
          <Link to="/">
            <li
              className={
                "link md:mt-3 mr-1 md:mr-0 rounded-full p-2 hover:bg-gray-500 transition-all duration-200 "
              }
              onClick={() => {
                refreshRecentChats();
                setSelectedUser({});
              }}
            >
              <AiFillMessage className="text-[1.2rem]" />
            </li>
          </Link>
          <Link to="/friends">
            <li
              className={
                "link md:mt-3 rounded-full p-2 hover:bg-gray-500 transition-all duration-200 "
              }
            >
              <BsFillPeopleFill className="text-[1.2rem]" />
            </li>
          </Link>
        </ul>
        <div className="relative">
          <ProfileImage
            hasAvatar={currentUser.hasAvatar}
            userAvatar={currentUser.userAvatar}
            username={currentUser.username}
            handleClick={() => setToggleProfile((state) => !state)}
          />
          <ProfileDetail
            state={toggleProfile}
            data={currentUser}
            styles={" bottom-[2rem] left-7"}
            closeCallback={() => setToggleProfile(false)}
          />
        </div>
      </div>
    </>
  );
}

export default SideNav;
