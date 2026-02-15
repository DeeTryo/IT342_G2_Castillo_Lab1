import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage'
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
