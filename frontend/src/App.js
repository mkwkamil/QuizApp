import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
    const [view, setView] = useState('login');

    return (
        <div>
            <Navbar setView={setView} />
            {view === 'login' && <LoginForm />}
            {view === 'register' && <RegisterForm />}
        </div>
    );
}

export default App;