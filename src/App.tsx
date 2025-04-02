import './App.css'

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Wtw from './pages/Wtw';
import MyCloset from './pages/MyCloset';
import MyRecord from './pages/MyRecord';
import SideBar from './components/SideBar';
import GuestBook from './pages/GuestBook';

function App() {

  return (
    <div className="app-container">
      <SideBar />
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/wtw' element={<Wtw />} />
          <Route path='/mycloset' element={<MyCloset />} />
          <Route path='/myrecord' element={<MyRecord />} />
          <Route path='/guestbook' element={<GuestBook />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
