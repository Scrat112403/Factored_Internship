//Import hooks and styles
import { useNavigate } from 'react-router-dom';
import styles from '../index.css';

//Main landing page
export default function MainMenu() {
  //Hook to navigate
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <h1>Factored AI</h1>
      <h2>Get to know your team!</h2>

      {/* Log In button*/}
      <button onClick={() => navigate('/login')}>
        Log In
      </button>

      <div>
        {/* Sign In button */}
        <button onClick={() => navigate('/signin')}>
          Sign In
        </button>

        {/* Background overlay and animated columns */}
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
