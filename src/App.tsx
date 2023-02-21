import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/MenuBars/TopBar";
import BottomBar from "./components/MenuBars/BottomBar";
import MainPage from "./components/MainPage/MainPage";
import ExchangeDetail from "./components/Exchange/ExchangeDetail";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/exchange" element={<ExchangeDetail />} />
      </Routes>
      <BottomBar />
    </BrowserRouter>
  );
}

export default App
