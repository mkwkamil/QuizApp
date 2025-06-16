import React, { useState } from 'react';
import axios from 'axios';
import './styles/LoginForm.css';

function RegisterForm() {
    const [response, setResponse] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const res = await axios.post('/api/auth/register', { username, email, password });
            setResponse(res.data);
        } catch (err) {
            setResponse(`Błąd: ${err.response?.data || err.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{marginRight: 10}}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{marginRight: 10}}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{marginRight: 10}}
            />
            <button onClick={handleRegister}>Zarejestruj</button>

            <div style={{marginTop: 20}}>
                <strong>Odpowiedź backendu:</strong>
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
        </div>
    );
}

export default RegisterForm;