import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import StockView from "./components/Stock/StockView";
import StockDetail from "./components/Stock/StockDetail";

function App() {
  const [count, setCount] = useState(0);

  return <StockDetail />;
}

export default App;
