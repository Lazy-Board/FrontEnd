import "./App.css";
<<<<<<< HEAD

import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import { RecoilRoot } from "recoil";
=======
import Signin from "./pages/Signin";
>>>>>>> 7b92a99e4916081f714810dd66ca71eec4586fd9

function App() {
  return (
    <RecoilRoot>
      <Signin />;
      <Signup />
    </RecoilRoot>
  );
}

export default App;
