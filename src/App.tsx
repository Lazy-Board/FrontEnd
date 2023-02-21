import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/MenuBars/TopBar";
import BottomBar from "./components/MenuBars/BottomBar";
import SetLocationModal from "./components/Weather/SetLocationModal";
import MainPage from "./components/MainPage/MainPage";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <BottomBar />
      <SetLocationModal />
    </BrowserRouter>
  );
}

export default App
