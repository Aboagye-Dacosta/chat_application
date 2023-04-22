import React from "react";

const state = {
  active: "online",
  inactive: "offline",
};

function FriendProfile({
  identifier = "John Doe",
  currentMsg = "Hello you are welcome",
  profile,
  status = "active",
}) {
  return (
    <div
      className='flex h-max items-center justify-center flex-row  md:justify-start w-full md:h-[4rem]   py-2 px-3 my-2 hover:bg-[rgba(0,0,0,.2)] text-ellipsis overflow-hidden text-white select-none cursor-pointer'
    >
      <img
        src={profile || "https://picsum.photos/200"}
        alt=''
        className='w-12 h-12 rounded-full mr-2 inline-block'
      />

      <div className='flex flex-col h-full flex-1  w-full'>
        <div className='flex flex-row  justify-between  items-center flex-1'>
          <h1 className='text-lg font-semibold'>
            {identifier}
          </h1>
          <p className='text-sm text-gray-500'>{state[status]}</p>
        </div>

        <p className='text-sm text-ellipsis overflow-hidden flex-1 text-gray-400 w-full'>
          {currentMsg}
        </p>
      </div>
    </div>
  );
}

export default FriendProfile;
