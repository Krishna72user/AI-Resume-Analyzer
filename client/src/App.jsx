import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { NavBar } from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import About from './pages/About'
import { Analyze } from './pages/Analyze'
import { Register } from './pages/Register'
import { Login } from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/analyze' element={<Analyze />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
