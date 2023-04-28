import { useContext } from "react";
import IconFriends from "../components/icons/IconFriends";
import IconMessage from "../components/icons/IconMessage";
import IconBack from "../components/icons/IconBack";
import Clickable from "./Clickable";
import { ChatContext } from "../hooks/useChatContext";

function SideNav({ handleCurrent, handleFriends, selected }) {
  const {
    handleToggleShow,
    showChat,
  } = useContext(ChatContext);
  return (
    <div className='flex py-1  md:flex-col items-center justify-between bg-[rgba(0,0,0)] md:py-5 text-white'>
      <ul className='flex md:flex-col items-center justify-center'>
        {showChat && (
          <Clickable
            className='md:hidden'
            handleClick={() => handleToggleShow()}
          >
            <li className='link md:mt-3 mr-1 md:mr-0  rounded-full p-2 hover:bg-gray-500 transition-all duration-200 '>
              <IconBack className='text-[1.2rem]' />
            </li>
          </Clickable>
        )}
        <Clickable
          handleClick={(e) => {
            handleCurrent();
          }}
        >
          <li
            className={
              "link md:mt-3 mr-1 md:mr-0  rounded-full p-2 hover:bg-gray-500 transition-all duration-200 " +
              (selected && "bg-gray-500")
            }
          >
            <IconMessage className='text-[1.2rem]' />
          </li>
        </Clickable>
        <Clickable handleClick={(e) => handleFriends()}>
          <li
            className={
              "link md:mt-3 rounded-full p-2 hover:bg-gray-500 transition-all duration-200 " +
              (!selected && "bg-gray-500")
            }
          >
            <IconFriends className='text-[1.2rem]' />
          </li>
        </Clickable>
      </ul>
      <img
        src={"https://picsum.photos/300"}
        alt=''
        className='w-8 h-8 rounded-full mr-2 inline-block'
      />
    </div>
  );
}

export default SideNav;
