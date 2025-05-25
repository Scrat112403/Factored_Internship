import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    const data = await response.json(); // { userId }
    return data;
  };

  const handleLogin = async () => {
    try {
      setError('');
      const { userId } = await loginUser(email, password);
      navigate(`/profile/${userId}`); // Redirige al perfil real
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return (
    <div className="header">
      <h1>Factored AI</h1>
      <h2>Login</h2>

      <div className="input">
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="input">
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}
