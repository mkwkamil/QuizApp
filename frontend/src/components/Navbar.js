import React from 'react';
import './styles/Navbar.css';
import {Link} from "react-router-dom";

function Navbar({ user, setUser }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUser(null);
    }
    
    return (
        <nav className="navbar">
            {user ? (
                <>
                    <Link to="/profile" className="navbar-button">Profil</Link>
                    <button className="navbar-button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="navbar-button">Login</Link>
                    <Link to="/register" className="navbar-button">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;