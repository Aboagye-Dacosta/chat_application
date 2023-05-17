import React from "react";

function ProfileImage({
  username = "James",
  hasAvatar,
  userAvatar,
  styles,
  handleClick,
}) {
  const initials = username.slice(0, 2).toUpperCase();
  return (
    <div onClick={handleClick} className="shrink-0">
      {hasAvatar ? (
        <img
          src={userAvatar}
          alt=""
          className={"rounded-full w-7 h-7  object-cover " + styles}
        />
      ) : (
        <div
          className={
            "w-7 h-7 rounded-full bg-blue-600 text-white relative p-2 " + styles
          }
        >
          <span className="inline-block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
export default ProfileImage;
