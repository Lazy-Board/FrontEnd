<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from "react";
import styled from "styled-components";
=======
import "./App.css";

import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import { RecoilRoot } from "recoil";
>>>>>>> cce4a7ba54fea62f0e22419790d72217b6e04a1f

=======
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
import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import TodoList from "./pages/TodoList";
>>>>>>> 6ca9a20464695530fb5e294ce430dd895670ec6f
import "./App.css";

function App() {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      <YoutubeCarousel />
    </Content>
=======
    <RecoilRoot>
      <Signin />;
      <Signup />
    </RecoilRoot>
>>>>>>> cce4a7ba54fea62f0e22419790d72217b6e04a1f
=======
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
>>>>>>> 6ca9a20464695530fb5e294ce430dd895670ec6f
  );
}

export default App;
