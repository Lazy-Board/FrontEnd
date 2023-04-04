import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import StockDetail from "./components/Stock/StockDetail";
import NewsDetailView from "./components/News/NewsDetailView";
import UserSuccess from "./pages/UserSuccess";
import SelectWidget from "./pages/SelectWidget";
import UpdateWidget from "./pages/UpdateWidget";
import UpdatePassword from "./components/User/UpdatePassword";
import UserWithdrawal from "./components/User/UserWithdrawal";
import FindPassword from "./pages/FindPassword";
import LoginRedirect from "./components/User/LoginRedirect";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={accessToken ? <MainPage /> : <Navigate to='/login' replace={true}/>} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/user" element={accessToken ? <UserProfile /> : <Navigate to='/login' replace={true}/>} />
        <Route path="/user/userInfo" element={accessToken ? <EditUserInfo /> : <Navigate to='/login' replace={true}/>} />
        <Route path="/exchange" element={<ExchangeDetail />} />
        <Route path="/traffic" element={<TrafficDetail />} />
        <Route path="/stock" element={<StockDetail />} />
        <Route path="/news" element={<NewsDetailView />} />
        <Route path="/auth-success" element={<UserSuccess />} />
        <Route path="/select-widget" element={<SelectWidget />} />
        <Route path="/user/update-widget" element={<UpdateWidget />} />
        <Route path="/user/update-password" element={<UpdatePassword />} />
        <Route path="/user/withdrawal" element={<UserWithdrawal />} />
        <Route path="/user/login/google" element={<LoginRedirect />} />
      </Routes>
      <BottomBar />
      <Confirm />
      <SetLocationModal />
      <QuoteEditModal />
    </BrowserRouter>
  );
}

export default App;
