import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/MenuBars/TopBar';
import BottomBar from './components/MenuBars/BottomBar';
import UserProfile from './components/User/UserProfile';
import MainPage from './pages/MainPage';
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