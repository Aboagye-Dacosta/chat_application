import React from "react";

function ProfileImage({ username = "James", hasAvatar, userAvatar }) {
  const initials = username.slice(0, 2).toUpperCase();
  return (
    <>
      {hasAvatar ? (
        <img src={userAvatar} alt="" className="rounded-full w-7 h-7 mr-4" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white relative p-2">
          <span className="inline-block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {initials}
          </span>
        </div>
      )}
    </>
  );
}
export default ProfileImage;
