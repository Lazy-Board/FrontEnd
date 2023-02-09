import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Signup from "./pages/Signup";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Signup />
    </RecoilRoot>
  );
}

export default App;
