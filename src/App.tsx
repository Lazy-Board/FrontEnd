import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/MenuBars/TopBar";
import BottomBar from "./components/MenuBars/BottomBar";
import UserProfile from "./components/User/UserProfile";
import MainPage from "./components/MainPage/MainPage";
import Confirm from "./components/Modal/Confirm";
import EditUserInfo from "./components/User/EditUserInfo";
import TrafficDetail from "./components/Traffic/TrafficDetail";
import UserSuccess from "./components/MainPage/UserSuccess";
import SelectWidget from "./components/MainPage/SelectWidget";
import "./App.css";

// 로그인X일 때 메인화면 접근 못하게
// 로그인O일 때 로그인/회원가입 화면 접근 못하게

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/user/userInfo" element={<EditUserInfo />} />
        <Route path="/traffic" element={<TrafficDetail />} />
        <Route path="/auth-success" element={<UserSuccess/>}/>
        <Route path="/select-widget" element={<SelectWidget />} />
      </Routes>
      <BottomBar />
      <Confirm />
    </BrowserRouter>
  );
}

export default App
