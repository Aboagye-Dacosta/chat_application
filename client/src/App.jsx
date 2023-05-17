import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { shallow } from "zustand/shallow";

import useChatStore from "./hooks/useChatStore";
import ChatPage from "./pages/ChatPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import FriendsPage from "./pages/FriendsPage";
import useLoadChat from "./hooks/useLoadChat";

function App() {
  const { socket } = useLoadChat();
  const [setSocket] = useChatStore((state) => [state.setSocket], shallow);
  setSocket(socket);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/friends" element={<FriendsPage />} />
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
