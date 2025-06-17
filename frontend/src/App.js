import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from "./components/Profile";
import Mainpage from "./components/Mainpage";

function App() {
    const [user, setUser] = useState(localStorage.getItem('username'));
    
    return (
        <div>
            <Router>
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route path={"/"} element={<Mainpage />} />
                    <Route path="/login" element={<LoginForm setUser={setUser} />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/profile" element={user ? <Profile />: <Navigate to="/login" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;