<<<<<<< HEAD
import { useState } from "react";
import styled from "styled-components";
=======
import "./App.css";

import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import { RecoilRoot } from "recoil";
>>>>>>> cce4a7ba54fea62f0e22419790d72217b6e04a1f

import "./App.css";
import YoutubeCarousel from "./components/YoutubeCarousel";
const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;
function App() {
  return (
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
  );
}

export default App;
