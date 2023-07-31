import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";



function App() {
  const {user} = useContext(AuthContext)
  
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path="/" element={user?<Home/>:<Register/>}/>
      <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
      <Route path="/Register" element={user?<Navigate to="/"/>:<Register/>}/>
      <Route path="/profile/:username" element={<Profile/>}/>
      <Route path="/messenger" element={user?<Messenger/>:<Navigate to="/"/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
