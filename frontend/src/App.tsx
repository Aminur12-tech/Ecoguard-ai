import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';
// import GuideDashboard from './components/GuideDashboard';
import TravellerDashboard from './components/TravellerDashboard';
import EcoRoute from './components/EcoRoute';
import POIUpload from './components/POIUpload';
import MyTrips from './components/MyTrips';
import PlanRoute from './components/PlanRoute';

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
          {/* <Route path="/guide-dashboard" element={<ProtectedRoute><GuideDashboard /></ProtectedRoute>} /> */}
          <Route path="/traveller-dashboard" element={<ProtectedRoute><TravellerDashboard /></ProtectedRoute>} />
          <Route path="/eco-route" element={<ProtectedRoute><EcoRoute /></ProtectedRoute>} />
          <Route path="/poi-upload" element={<ProtectedRoute><POIUpload /></ProtectedRoute>} />
          <Route path='/mytrips' element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
          <Route path='/plane-route' element={<ProtectedRoute><PlanRoute /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
