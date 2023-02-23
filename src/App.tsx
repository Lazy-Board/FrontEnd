import "./App.css";

import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Signin />
      <Signup />
    </RecoilRoot>
  );
}

export default App;
