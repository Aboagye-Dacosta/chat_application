import IconSend from "../components/icons/IconSend";
import IconEmojis from "../components/icons/IconEmojis";
import IconImage from "../components/icons/IconImage";

function ChatFooter() {
  return (
    <div className='mx-auto w-10/12 mb-3 flex items-center justify-start my-1 md:mb-10 bg-[rgba(0,0,0,.7)] rounded-lg '>
      <div className='flex items-center justify-center px-1 py-1 text-white'>
        <IconEmojis className='mr-3  text-[1.5rem]' />
        <IconImage className='mr-3 text-[1.5rem]' />
      </div>
      <input
        type='text'
        className='flex-1 bg-transparent py-2 px-3 md:py-3  focus:outline-none focus:ring-0 text-white whitespace-normal '
      />
      <div className='flex items-center justify-center px-1 py-1'>
        <IconSend className='mr-1 text-white text-[2rem]' />
      </div>
    </div>
  );
}

export default ChatFooter;
