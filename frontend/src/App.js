import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const testLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      setResponse(`Zalogowano! Token: ${res.data.token}`);
    } catch (err) {
      setResponse(`Błąd: ${err.response?.data || err.message}`);
    }
  };

  return (
      <div style={{ padding: 20 }}>
        <h1>Test backendu</h1>
        <div>
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
          <button onClick={testLogin}>Testuj login</button>
        </div>
        <div style={{ marginTop: 20 }}>
          <strong>Odpowiedź backendu:</strong>
          <pre>{response}</pre>
        </div>
      </div>
  );
}

export default App;