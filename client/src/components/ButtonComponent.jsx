function ButtonComponent({ type = "button", content }) {
  return (
    <button
      type={type}
      className={`bg-blue-600 px-3 py-2 hover:bg-blue-900 text-slate-100 rounded w-full select-none [&:not(:last-of-type)]:mb-3`}
    >
      {content}
    </button>
  );
}

export default ButtonComponent;
