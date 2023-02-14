import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Signin from "./pages/Signin";

function App() {
  const [count, setCount] = useState(0);

  return <Signin />;
}

export default App;
