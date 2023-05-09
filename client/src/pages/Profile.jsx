import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";

import Background from "../components/Background";
import IconImage from "../components/icons/IconImage";

function Profile() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState();
  const [value, setValue] = useState("");
  const [results, setPostResults] = useState({
    status: false,
  });

  const { loading, data } = useQuery(gql`
    query {
      currentUser {
        _id
        username
        hasAvatar
      }
    }
  `);
  const maxNumber = 1;

  const handleTextArea = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  const handleSkip = () => {
    navigate("/");
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("description", value);
    formData.append("file", images[0]?.file);
    try {
      const response = await fetch("/api/users/uploads/profile", {
        method: "POST",
        body: formData,
      });
      const results = await response.json();
      setPostResults(results);
    } catch (error) {
      console.log("🚀 ~ file: Profile.jsx:50 ~ handleSave ~ error:", error);
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const buttonState = (imageList) => {
    return imageList.length == 0 && value == "" ? true : false;
  };

  useEffect(() => {
    if (results.status || data?.currentUser?.hasAvatar) {
      navigate("/");
    }
  }, [results, loading]);

  return (
    <>
      {loading || (
        <Background>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="flex flex-col md:flex-row w-full justify-center items-start mt-5">
                <div className="relative w-[20rem] md:min-w-[20rem] h-[20rem] border border-slate-400">
                  {imageList.length == 0 && (
                    <IconImage className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem]" />
                  )}
                  {imageList.map((image, index) => {
                    setIndex(index);
                    return (
                      <img
                        src={image["data_url"]}
                        alt=""
                        className="absolute w-[13rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      />
                    );
                  })}
                </div>

                <div className="flex flex-col  min-w-[20rem] md:ml-3">
                  <h1 className="text-lg font-bold py-1">
                    Welcome {data.currentUser.username} - (Additional
                    Information)
                  </h1>
                  {imageList.length == 0 && (
                    <button
                      onClick={onImageUpload}
                      {...dragProps}
                      style={isDragging ? { color: "red" } : undefined}
                      className="w-full bg-blue-400 px-3 py-2 text-white text-center self-end mb-2 rounded-md"
                    >
                      Upload Image
                    </button>
                  )}
                  {imageList.length > 0 && (
                    <div className="flex items-center justify-center w-full my-3 self-end">
                      <button
                        onClick={() => onImageUpdate(index)}
                        className="flex-1 bg-blue-400 px-3 py-2 rounded-md text-white text-center"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onImageRemove(index)}
                        className="flex-1"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <textarea
                    className="px-3 py-2 bg-white ring-0 focus:ring-0 border-none focus:outline-none "
                    id=""
                    value={value}
                    onChange={handleTextArea}
                    placeholder="some about you"
                  />

                  <div className="flex self-end items-center justify-center mt-2 w-full">
                    <button
                      className={
                        "px-3 py-2 text-center font-bold flex-1 rounded-md " +
                        (buttonState(imageList)
                          ? "bg-gray-400 text-gray-300"
                          : "bg-blue-400 text-white")
                      }
                      disabled={buttonState(imageList)}
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-2 text-center font-bold flex-1  rounded-md"
                      onClick={handleSkip}
                    >
                      skip
                    </button>
                  </div>
                </div>
              </div>
            )}
          </ImageUploading>
        </Background>
      )}

      {/* <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <input type="text" name="username" id="" />
        <input type="file" name="profile" id="" />
        <input type="submit" value="Submit" />
      </form> */}
    </>
  );
}
export default Profile;
{
  /* <div className="upload__image-wrapper">
  <button
    style={isDragging ? { color: "red" } : undefined}
    onClick={onImageUpload}
    {...dragProps}
  >
    Click or Drop here
  </button>
  &nbsp;
  <button onClick={onImageRemoveAll}>Remove all images</button>
  {imageList.map((image, index) => (
    <div key={index} className="image-item">
      <img src={image["data_url"]} alt="" width="100" />
      <div className="image-item__btn-wrapper">
        <button onClick={() => onImageUpdate(index)}>Update</button>
        <button onClick={() => onImageRemove(index)}>Remove</button>
      </div>
    </div>
  ))} */
}
// </div>;
