import React from 'react';
import './styles/Navbar.css';

function Navbar({ setView }) {
    return (
        <nav className="navbar">
            <button onClick={() => setView('login')}>Login</button>
            <button onClick={() => setView('register')}>Register</button>
        </nav>
    );
}

export default Navbar;