//Import routing and page components 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/Login';
import Profile from './features/Profile';
import MainMenu from './features/main'; 
import Signin from './features/Signin';

//Root component of the application
function App() {
  return (
    <Router>
      {/* All the defined routes for the application */}
      <Routes>
        {/* Home route - shows the main menu */}
        <Route path="/" element={<MainMenu />} /> 

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Sign up page */}
        <Route path="/signin" element={<Signin />} />  

        {/* User profile page */}
        <Route path="/profile/:id" element={<Profile />} />

        {/* Another route for MainMenu */}
        <Route path="/main" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
