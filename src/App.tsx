import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import StockView from "./components/Stock/StockView";
import StockDetail from "./components/Stock/StockDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <StockView />
        <Routes>
          <Route path="/stock" element={<StockDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
