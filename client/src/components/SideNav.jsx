import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import IconFriends from "../components/icons/IconFriends";
import IconMessage from "../components/icons/IconMessage";
import IconBack from "../components/icons/IconBack";
import Clickable from "./Clickable";
import ProfileImage from "./ProfileImage";
import useChatStore from "../hooks/useChatStore";

function SideNav() {
  const [currentUser, setSelectedUser] = useChatStore(
    (state) => [state.currentUser, state.setSelectedUser],
    shallow
  );

  return (
    <>
      <div className="flex py-1 md:flex-col items-center justify-between bg-[rgba(0,0,0)] md:py-5 text-white">
        <ul className="flex md:flex-col items-center justify-center">
          {false && (
            <Clickable
              className="md:hidden"
              handleClick={() => handleToggleShow()}
            >
              <li className="link md:mt-3 mr-1 md:mr-0  rounded-full p-2 hover:bg-gray-500 transition-all duration-200 ">
                <IconBack className="text-[1.2rem]" />
              </li>
            </Clickable>
          )}
          <Link to="/chat">
            <li
              className={
                "link md:mt-3 mr-1 md:mr-0  rounded-full p-2 hover:bg-gray-500 transition-all duration-200 "
              }
              onClick={() => setSelectedUser({})}
            >
              <IconMessage className="text-[1.2rem]" />
            </li>
          </Link>
          <Link to="/friends">
            <li
              className={
                "link md:mt-3 rounded-full p-2 hover:bg-gray-500 transition-all duration-200 "
              }
            >
              <IconFriends className="text-[1.2rem]" />
            </li>
          </Link>
        </ul>
        <ProfileImage
          hasAvatar={currentUser.hasAvatar}
          userAvatar={currentUser.userAvatar}
          username={currentUser.username}
        />
      </div>
    </>
  );
}

export default SideNav;
