import * as React from "react";

function IconAdd(props) {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth={0}
      viewBox='0 0 16 16'
      height='1em'
      width='1em'
      {...props}
    >
      <path
        fillRule='evenodd'
        d='M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z'
        clipRule='evenodd'
      />
      <path
        fillRule='evenodd'
        d='M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z'
        clipRule='evenodd'
      />
    </svg>
  );
}

export default IconAdd;
