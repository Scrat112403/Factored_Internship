import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './login.css';

export default function Login() {
  const [user, setuser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginUser = async (user, password) => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login error');
    }

    return data; // { userId }
  };

  const handleLogin = async () => {
    try {
      setError('');
      const { userId } = await loginUser(user.trim(), password); // trim para limpiar espacios
      navigate(`/profile/${userId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className={styles.headerlogin}>
      <h1>Factored AI</h1>
      <h2>Login</h2>

      <div className={styles.input}>
        <input
          type="text"
          id="user"
          name="user"
          value={user}
          onChange={(e) => setuser(e.target.value)}
          placeholder="Enter your user"
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

      <button onClick={handleLogin}>
        Log In</button>
      <div className="background-container">
            {[...Array(10)].map((_, i) => (
                <div key={i} className={`column col-${i + 1}`} />
            ))}
    </div>
    </div>
  );
}
