import React from "react";

function Container({ children }) {
  return (
    <div className='py-5 mt-10 px-10 w-full h-max flex items-center justify-center'>
      {children}
    </div>
  );
}

export default Container;
