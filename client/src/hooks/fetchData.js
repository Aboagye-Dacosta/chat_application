import { useQuery, gql } from "@apollo/client";
const BASE_URL = "http://localhost:8000/api/users";

const options = (userData) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
});

//create user
const httpRegisterUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, options(user));
    return await response.json();
  } catch (err) {
    return {
      message: err.message,
      status: false,
    };
  }
};

//login user
const httpLoginUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, options(user));
    return await response.json();
  } catch (err) {
    return {
      message: err.message,
      status: false,
    };
  }
};

//get current user
const httpCurrentUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/current`);
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      message: err.message,
      status: false,
    };
  }
};



export { httpRegisterUser, httpCurrentUser, httpLoginUser };
