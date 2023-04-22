import React from "react";

function InputComponent({
  title,
  name,
  type = "text",
  error = "",
  color = "black",
  handleChange,
}) {
  return (
    <div className='w-full h-max my-9'>
      <label
        htmlFor={title}
        className={
          "border border-black border-1 py-0 relative flex items-center justify-center mx-1  rounded " +
          (error && " border-red-500")
        }
      >
        <input
          onChange={handleChange}
          type={type}
          name={name}
          className='border-none  focus:outline-none focus:ring-0 w-full [&:not(:placeholder-shown)+span]:-translate-y-10 [&:focus+span]:-translate-y-10 bg-transparent py-2 px-1 z-10'
          placeholder=' '
        />
        <span
          className='absolute left-1 top-1/2 -translate-y-1/2 transition-transform duration-150 ease-in-out text-[.8rem]'
          style={{ color }}
        >
          {title}
        </span>
        <p className='p-0 ml-2 text-red-500 absolute left-0 top-10 text-[.7rem]'>{error}</p>
      </label>
    </div>
  );
}

export default InputComponent;
