import React from 'react';
import './styles/Navbar.css';

function Navbar({ setView }) {
    return (
        <nav className="navbar">
            <button onClick={() => setView('login')}>Login</button>
            <button onClick={() => setView('register')} style={{ marginLeft: 10 }}>Register</button>
        </nav>
    );
}

export default Navbar;