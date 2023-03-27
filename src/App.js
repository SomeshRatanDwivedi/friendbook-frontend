import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Profile from "./pages/profile/Profile";
import Login from './pages/login/Login';
import "./app.css"

import { useAuth } from './hooks/authHook';
import Register from "./pages/register/Register";
import { BrowserRouter } from 'react-router-dom'
import Messenger from "./pages/messenger/Messenger";
import { useEffect } from "react";
import { useSocket } from "./providers/SocketProvider";



function App() {

   const auth = useAuth();


   return (
      <div className="app">
        
         <BrowserRouter>
            {auth.user && <Topbar/>}
           
            <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/profile/:id" element={<Profile />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/messanger/:id" element={<Messenger />} />
            </Routes>
         </BrowserRouter>
      </div>

   );
}

export default App;
