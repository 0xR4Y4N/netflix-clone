import React from 'react'
import Navbar from './component/Navbar';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import { AuthContextProvider } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoutes from './component/ProtectedRoutes';
function App() {
  const nagivate = useNavigate();
  return (
    <>
      <AuthContextProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signin' element={<Login/>}></Route>
          <Route path='/signup' element={<Register/>}></Route>
          <Route path='/account' element={<ProtectedRoutes><Account/></ProtectedRoutes>}></Route>
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
