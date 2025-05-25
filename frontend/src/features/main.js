import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1>Factored AI</h1>

      <Button variant="contained" onClick={() => navigate('/login')}>
        Login
      </Button>

      <Button variant="outlined" onClick={() => navigate('/signin')}>
        Signin
      </Button>
    </div>
  );
}
