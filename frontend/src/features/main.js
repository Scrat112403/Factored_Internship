import { useNavigate } from 'react-router-dom';
import styles from '../index.css';

export default function MainMenu() {
  const navigate = useNavigate();

  return (

    <div className={styles.header}>
      <h1>Factored AI</h1>
      <h2>Get to know your team!</h2>
        <button onClick={() => navigate('/login')}>
                Log In
        </button>
            <div>

        <button onClick={() => navigate('/signin')}>
                Sign In
                
        </button>
        <div className="background-overlay">
        <div className="background-container">
            {[...Array(10)].map((_, i) => (
                <div key={i} className={`column col-${i + 1}`} />
            ))}
    </div>
    </div>
    </div>
    </div>
  );
}
