import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/MenuBars/TopBar";
import BottomBar from "./components/MenuBars/BottomBar";
import MainPage from "./components/MainPage/MainPage";
import QuoteEditModal from './components/Quote/QuoteEditModal'
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <BottomBar />
      <QuoteEditModal />
    </BrowserRouter>
  );
}

export default App
