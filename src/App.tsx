import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/MenuBars/TopBar";
import BottomBar from "./components/MenuBars/BottomBar";
import UserProfile from "./components/User/UserProfile";
import MainPage from "./components/MainPage/MainPage";
import Confirm from "./components/Modal/Confirm";
import EditUserInfo from "./components/User/EditUserInfo";
import TrafficDetail from "./components/Traffic/TrafficDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/user/userInfo" element={<EditUserInfo />} />
        <Route path="/traffic" element={<TrafficDetail />} />
      </Routes>
      <BottomBar />
      <Confirm />
    </BrowserRouter>
  );
}

export default App
