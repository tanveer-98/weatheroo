import './App.css'
// import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element = {<Login/>}/>
        <Route index path="/register" element = {<Register/>}/>
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
