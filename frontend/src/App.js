import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/Login';
import Profile from './features/Profile';
import NotFound from './features/NotFound';
import MainMenu from './features/main'; 
import Signin from './features/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
