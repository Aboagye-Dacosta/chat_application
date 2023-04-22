import React from "react";
import IconAdd from "./icons/IconAdd";
import IconSearch from "./icons/IconSearch";

function AddSearchPanel({ handleChange }) {
  return (
    <div className='relative w-full'>
      <div className='flex justify-between items-center bg-transparent py-2 px-3 text-white'>
        <p>Recent</p>
        <div>
          <span className='rounded-full h-8 w-8 bg-gray-400 text-white relative inline-block px-1 py-1 mr-1'>
            <IconSearch className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </span>
          <span className='rounded-full h-8 w-8 bg-gray-400 relative inline-block text-white'>
            <IconAdd className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </span>
        </div>
      </div>
      <input
        type='checkbox'
        name=''
        id=''
        className='peer absolute top-2 right-12 w-8 h-8 opacity-0'
      />
      <input
        type='text'
        placeholder='search'
        className='w-full  focus:outline-none focus:ring-0 bg-[rgba(0,0,0,.7)] rounded  max-h-0 peer-checked:max-h-[4rem] peer-checked:py-2 peer-checked:px-3 peer-checked:mt-2 peer-checked:mb-2 transition-all duration-300 ease-in-out text-white'
        onChange={handleChange}
      />
    </div>
  );
}

export default AddSearchPanel;
