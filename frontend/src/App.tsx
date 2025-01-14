import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./services/Pages/Dashboard";
import AuthContainer from './services/Pages/AuthContainer';
import { useEffect, useState } from 'react';
import InnerPantryDashboard from './services/Pages/InnerPantryDashboard';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Me from './Components/ProtectedRoute/Me';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      setIsLoggedIn(true);
    }
  },[])
  return (
    <>
      <Router>
        <Routes>
          <Route path='/auth' element={<AuthContainer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/admin' element={<ProtectedRoute><Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  /></ProtectedRoute>} />
          <Route path='/pantry' element={<ProtectedRoute><InnerPantryDashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  /></ProtectedRoute>} />
          <Route path='/' element={<Me />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
