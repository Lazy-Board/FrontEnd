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
import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import { RecoilRoot } from "recoil";

import TodoList from "./pages/TodoList";

const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;
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
        <Route path="/Signup" element={<Signup />} />;
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
