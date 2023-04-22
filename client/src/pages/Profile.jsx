import React, { useCallback, useEffect, useState } from "react";
import IconImage from "../components/icons/IconImage";
import Clickable from "../components/Clickable";
import Background from "../components/Background";
import { httpCurrentUser } from "../hooks/fetchData";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const [optional, setOptional] = useState(false);

  const checkAuthorized = useCallback(async () => {
    const data = await httpCurrentUser();
    if (!data.status) {
      navigate("/register");
    }
  });

  useEffect(() => {
    checkAuthorized();
  }, [checkAuthorized]);

  return (
    <Background>
      <div className='h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col md:flex-row items-center justify-center w-ful'>
          <div className='w-[10rem] h-[10rem] rounded-full bg-red-300 relative mr-5'>
            <IconImage className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 h-1/2 text-[rgba(0,0,0,.7)]' />
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h3 className='font-bold text-[2rem] capitalize'>
              Welcome current user
            </h3>
            <Clickable
              className='px-3 py-2 bg-blue-600 hover:bg-blue-800 text-lg w-full text-center text-white my-2 rounded-sm relative'
              handleClick={(e) => console.log("upload image")}
            >
              <input
                type='file'
                name='image'
                id=''
                accept='image/*'
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0 z-10'
              />
              upload image
            </Clickable>
            <Clickable
              className='w-full text-center md:hover:underline md:hover:text-blue-600 hover:cursor-pointer'
              handleClick={() => setOptional((state) => !state)}
            >
              Select one of our suggested avatars
            </Clickable>
          </div>
        </div>
        {optional && (
          <>
            <div className='flex items-center justify-center w-full my-5'>
              {[1, 2, 3, 4].map((el) => (
                <Clickable className='avatar mx-3' key={el}>
                  <img
                    src={`https://picsum.photos/20${el}`}
                    alt=''
                    className='w-[4rem] h-[4rem] rounded-full'
                  />
                </Clickable>
              ))}
            </div>
            <Clickable
              className='px-3 py-2 bg-blue-600 hover:bg-blue-800 text-lg w-max text-center text-white my-2 rounded-sm'
              handleClick={(e) => console.log("upload image")}
            >
              save/proceed
            </Clickable>
          </>
        )}
      </div>
    </Background>
  );
}

export default Profile;
