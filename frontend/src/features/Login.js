import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/profile/1');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Container>
  );
}

export default Login;
