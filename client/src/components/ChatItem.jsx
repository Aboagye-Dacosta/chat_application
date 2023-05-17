import ProfileImage from "./ProfileImage";

function ChatItem({
  message,
  date,
  current = true,
  hasAvatar,
  userAvatar,
  username,
}) {
  const textOrder = current ? " " : "order-2";
  const datePos = current ? "self-end" : "self-start";
  const chatPos = current ? "justify-end pr-10" : "justify-start pl-10";
  const bg = current ? "bg-[rgba(0,0,0,.5)]" : "bg-blue-500";
  const imgPos = current ? "-right-5" : "-left-5";

  return (
    <li
      className={
        "flex flex-row items-center text-white  my-2 py-3 w-full relative " +
        chatPos
      }
    >
      <div className={"max-w-sm flex flex-col " + textOrder}>
        <div
          className={
            "py-2 px-3 rounded-xl mx-1 flex items-center justify-center " + bg
          }
        >
          <span>{message}</span>
        </div>
        <div className={"px-3 pt-1 text-sm text-gray-400 " + datePos}>
          {date}
        </div>
      </div>
      <div
        className={
          "w-8 h-8 rounded-full absolute bottom-4 " + bg + " " + imgPos
        }
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
          <ProfileImage
            hasAvatar={hasAvatar}
            userAvatar={userAvatar}
            username={username}
          />
        </div>
      </div>
    </li>
  );
}

export default ChatItem;
