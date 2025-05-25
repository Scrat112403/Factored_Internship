import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/Login.js';
import Profile from './features/Profile';
import NotFound from './features/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
