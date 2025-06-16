import React, { useState } from 'react';
import axios from 'axios';
import './styles/AuthForms.css';

function LoginForm() {
    const [response, setResponse] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('/api/auth/login', { username, password });
            setResponse(`Zalogowano! Token: ${res.data.token}`);
        } catch (err) {
            setResponse(`Błąd: ${err.response?.data || err.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <button onClick={handleLogin}>Zaloguj</button>

            <div style={{ marginTop: 20 }}>
                <strong>Odpowiedź backendu:</strong>
                <pre>{response}</pre>
            </div>
        </div>
    );
}

export default LoginForm;