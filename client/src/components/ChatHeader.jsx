import { GiPhone, FaVideo, FiMoreHorizontal } from "react-icons/all";

import useChatStore from "../hooks/useChatStore";
import ProfileImage from "./ProfileImage";
import { useState } from "react";

import ProfileDetail from "./ProfileDetail";

function ChatHeader() {
  const [profileState, setProfileState] = useState(false);
  const selectedUser = useChatStore((state) => state.selectedUser);
  return (
    <>
      <div className="flex flex-row items-center justify-between py-3 px-3 h-[4rem] bg-transparent my-3 mx-2">
        <div className="flex  items-center flex-row text-white relative">
          <ProfileDetail
            styles={"top-[4rem] left-10"}
            data={selectedUser}
            state={profileState}
            closeCallback={() => setProfileState(false)}
          />
          <ProfileImage
            hasAvatar={selectedUser?.hasAvatar}
            userAvatar={selectedUser?.userAvatar}
            username={selectedUser?.username}
            styles={"mr-4"}
            handleClick={() => setProfileState(!profileState)}
          />
          <p className="flex flex-col">
            <span className="text-lg font-semibold">
              {selectedUser?.username}
            </span>
            <span className="text-sm text-gray-500">lastSeen</span>
          </p>
        </div>

        <div className="md:flex flex-row w-max ">
          <span className="rounded-full h-8 w-8 bg-[rgba(0,0,0,.5)] text-white relative inline-block px-1 py-1 mr-1">
            <GiPhone className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white " />
          </span>
          <span className="rounded-full h-8 w-8 bg-[rgba(0,0,0,.5)] text-white relative inline-block px-1 py-1 mr-1">
            <FaVideo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white " />
          </span>
          <span className="rounded-full h-8 w-8 bg-[rgba(0,0,0,.5)] text-white relative inline-block px-1 py-1 mr-1">
            <FiMoreHorizontal className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white " />
          </span>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
