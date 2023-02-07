import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/menuBars/TopBar';
import BottomBar from './components/menuBars/BottomBar';
import UserProfile from './components/user/UserProfile';
import MainPage from './view/MainPage';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/user' element={<UserProfile />}></Route>
      </Routes>
      <BottomBar />
    </BrowserRouter>
  )
}

export default App
