import React from "react";

function Clickable({ handleClick, children, ...rest }) {
  return (
    <div onClick={handleClick} {...rest}>
      {children}
    </div>
  );
}

export default Clickable;
