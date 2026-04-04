import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import GuideDashboard from './pages/GuideDashboard';
import TravellerDashboard from './pages/TravellerDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/guide-dashboard" element={<ProtectedRoute><GuideDashboard /></ProtectedRoute>} />
          <Route path="/traveller-dashboard" element={<ProtectedRoute><TravellerDashboard /></ProtectedRoute>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
