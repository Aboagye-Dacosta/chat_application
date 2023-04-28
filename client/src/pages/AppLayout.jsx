import { Routes, Route } from "react-router-dom";

import ChatPage from "./ChatPage";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import { ChatContext, useChatContext } from "../hooks/useChatContext";
import ProductListings from "./ProductListings";

function AppLayout() {
  return (
    <Routes>
      <Route exact path='/chat' element={<ChatPage />} />
      <Route exact path='/login' element={<Login />}></Route>
      <Route exact path='/register' element={<Register />}></Route>
      <Route exact path='/profile' element={<Profile />}></Route>
      <Route
        exact
        path='/ProductListings'
        element={<ProductListings />}
      ></Route>
      <Route
        exact
        path='/'
        element={
          <ChatContext.Provider value={useChatContext()}>
            <ChatPage />
          </ChatContext.Provider>
        }
      />
    </Routes>
  );
}

export default AppLayout;
