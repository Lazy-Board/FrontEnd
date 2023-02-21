import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/MenuBars/TopBar";
import BottomBar from "./components/MenuBars/BottomBar";
import UserProfile from "./components/User/UserProfile";
import MainPage from "./pages/MainPage";
import Confirm from "./components/Modal/Confirm";
import SetLocationModal from "./components/Weather/SetLocationModal";
import EditUserInfo from "./components/User/EditUserInfo";
import ExchangeDetail from "./components/Exchange/ExchangeDetail";
import QuoteEditModal from "./components/Quote/QuoteEditModal";
import TrafficDetail from "./components/Traffic/TrafficDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TodoList from "./pages/TodoList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/user/userInfo" element={<EditUserInfo />} />
        <Route path="/exchange" element={<ExchangeDetail />} />
        <Route path="/traffic" element={<TrafficDetail />} />
        <Route path="/login" element={<Signin />} />;
        <Route path="/signup" element={<Signup />} />;
        <Route path="/todo" element={<TodoList />} />;
      </Routes>
      <BottomBar />
      <Confirm />
      <SetLocationModal />
      <QuoteEditModal />
    </BrowserRouter>
  );
}

export default App;
