import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import StockView from "./components/Stock/StockView";

function App() {
  const [count, setCount] = useState(0);

  return <StockView />;
}

export default App;
