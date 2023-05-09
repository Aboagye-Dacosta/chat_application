import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useQuery, gql } from "@apollo/client";
import useChatStore from "../hooks/useChatStore";
import { httpCurrentUser } from "../hooks/fetchData";

function LoadData() {
  const navigate = useNavigate();
  const [setCurrentUser, setIsUserLoggedIn, isUserLoggedIn] =
    useChatStore(
      (state) => [
        state.setCurrentUser,
        state.setIsUserLoggedIn,
        state.isUserLoggedIn,
      ],
      shallow
    );

  const checkLoggedIn = useCallback(async () => {
    const data = await httpCurrentUser();
    if (!data.status) {
      navigate("/login");
    } else {
      setIsUserLoggedIn(true);
    }
  }, []);

  checkLoggedIn();

  const { data, loading } = useQuery(gql`
    query {
      currentUser {
        _id
        username
        email
        hasAvatar
        description
        userAvatar
      }
    }
  `);

  if (loading) {
    return (
      <div>
        <img src="../../public/images/Iphone-spinner-2.gif" alt="" />
      </div>
    );
  }

  setCurrentUser(data.currentUser);

  if (isUserLoggedIn) {
    navigate("/chat");
  }

}

export default LoadData;
