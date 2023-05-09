import IconPhone from "../components/icons/IconPhone";
import IconVideo from "../components/icons/IconVideo";
import IconMore from "../components/icons/IconMore";
import useChatStore from "../hooks/useChatStore";
import ProfileImage from "./ProfileImage";

function ChatHeader() {
  const selectedUser = useChatStore((state) => state.selectedUser);
  return (
    <>
      <div className="flex flex-row items-center justify-between py-3 px-3 h-[4rem] bg-transparent my-3 mx-2">
        <div className="flex  items-center flex-row text-white">
          <ProfileImage
            hasAvatar={selectedUser?.hasAvatar}
            userAvatar={selectedUser?.userAvatar}
            username={selectedUser?.username}
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
            <IconPhone className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white " />
          </span>
          <span className="rounded-full h-8 w-8 bg-[rgba(0,0,0,.5)] text-white relative inline-block px-1 py-1 mr-1">
            <IconVideo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white " />
          </span>
          <span className="rounded-full h-8 w-8 bg-[rgba(0,0,0,.5)] text-white relative inline-block px-1 py-1 mr-1">
            <IconMore className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white " />
          </span>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
