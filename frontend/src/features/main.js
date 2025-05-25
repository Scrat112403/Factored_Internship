import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './main.css';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <h1>Factored AI</h1>

      <button onClick={() => navigate('/login')}>
        Login
      </button>
      <div>

      <button onClick={() => navigate('/signin')}>
        Signin
      </button>
    </div>
    </div>
  );
}
