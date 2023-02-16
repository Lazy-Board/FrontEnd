import { useState } from "react";
import styled from "styled-components";

import "./App.css";
import YoutubeCarousel from "./components/YoutubeCarousel";
const Content = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  color: black;
`;
function App() {
  return (
    <Content className="max-w-md pt-16 pb-24 bg-stone-100 p-3">
      <YoutubeCarousel />
    </Content>
  );
}

export default App;
