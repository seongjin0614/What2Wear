import './App.css'

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Wtw from './pages/Wtw';
import MyCloset from './pages/MyCloset';
import MyRecord from './pages/MyRecord';
import SideBar from './components/SideBar';

function App() {

  return (
    <>
      <SideBar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/wtw' element={<Wtw />} />
          <Route path='/mycloset' element={<MyCloset />} />
          <Route path='/myrecord' element={<MyRecord />} />
        </Routes>
      </main>
    </>

  )
}

export default App
