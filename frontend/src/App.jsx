import react from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoutes';
import NavBar from './components/NavBar';
import GeoBackground from './components/GeoBackground';
import Characters from './pages/Characters';
import Episodes from './pages/Episodes';
import Profile from './pages/Profile';
import Logout from './components/Logout';
import ChatBot from './pages/ChatBot';

function App() {
  return (
    <BrowserRouter>
    <GeoBackground/>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/logout' element={<Logout />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/characters' element={<Characters />}/>
        <Route path='/episodes' element={<Episodes />}/>
        <Route path='/chat' element={<ChatBot />}/>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
