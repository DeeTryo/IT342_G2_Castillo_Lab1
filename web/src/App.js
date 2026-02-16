import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage'
import Dashboard from './Dashboard';
import ProfilePage from './ProfilePage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
