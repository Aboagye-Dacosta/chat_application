import React from "react";
import ProfileImage from "./ProfileImage";

const state = {
  active: "online",
  inactive: "offline",
};

function FriendProfile({
  username,
  currentMsg,
  hasAvatar,
  status = "active",
  userAvatar,
}) {
  return (
    <div className="flex mx-1 h-max items-center justify-center flex-row  md:justify-start w-[98%] md:h-[4rem] py-1 px-2 hover:bg-[rgba(0,0,0,.2)] text-ellipsis overflow-hidden text-white select-none cursor-pointer rounded-md">
      <ProfileImage
        hasAvatar={hasAvatar}
        username={username}
        userAvatar={userAvatar}
        styles={"mr-4"}
      />
      <div className="flex flex-col h-full flex-1  w-full">
        <div className="flex flex-row  justify-between  items-center flex-1">
          <h1 className="text-lg font-semibold">{username}</h1>
          <p className="text-sm text-gray-500">{state[status]}</p>
        </div>

        <p className="text-sm text-ellipsis overflow-hidden flex-1 text-gray-400 w-full">
          last chat message
        </p>
      </div>
    </div>
  );
}

export default FriendProfile;
