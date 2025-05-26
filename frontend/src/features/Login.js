//Import custom CSS styles and hooks
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from '../index.css'; 

//Component for user login
export default function Login() {
  //State hooks for user input and error message
  const [user, setuser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Hook to navigate to other routes
  const navigate = useNavigate();

  //Sends login request to the backend
  const loginUser = async (user, password) => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }) //Sends user credentials as JSON
    });

    const data = await response.json(); //Parses the JSON response

    if (!response.ok) {
      //If server responds with error
      throw new Error(data.message || 'Login error');
    }

    return data; //Returns userId
  };

  //Handler function when the login button is clicked
  const handleLogin = async () => {
    try {
      setError(''); //Clears any previous error
      const { userId } = await loginUser(user.trim(), password); //Tries to log in
      navigate(`/profile/${userId}`); //Redirects to the user profile page
    } catch (error) {
      //If login fails
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className={styles.header}>
      <h1>Factored AI</h1>

      {/* Input for username */}
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

      {/* Input for password */}
      <div className={styles.input}>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      {/* Error message display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Login button */}
      <button onClick={handleLogin}>
        Log In
      </button>

      {/* Background animation (visual columns) */}
      <div className="background-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`column col-${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
