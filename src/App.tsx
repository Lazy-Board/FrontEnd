import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Signin from "./pages/signin";

function App() {
  const [count, setCount] = useState(0);

  return <Signin />;
}

export default App;
