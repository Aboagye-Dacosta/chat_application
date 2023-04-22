function Background(props) {
  return (
    <div className='w-full  min-h-screen bg-gradient-to-br from-[rgba(216,125,125,0.39)] to-[rgba(255,255,255,0.9)] '>
      {props.children}
    </div>
  );
}

export default Background;
