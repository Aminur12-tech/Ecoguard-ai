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
import ExplorePlaces from './components/ExplorePlaces';
import ExploreBookings from './components/ExploreBookings';
import VendorDashboard from './components/VendorDashboard';
import AdminDashboard from './components/AdminDashboard';
import CrowdForcasting from './pages/CrowdForecasting';
import HomestayDetails from "./pages/HomestayDetails";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import HomestayManagement from "./pages/HomestayManagement";
import BookingManagement from "./pages/BookingManagement";

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
          <Route path='/explore-places' element={<ProtectedRoute><ExplorePlaces /></ProtectedRoute>} />
          <Route path='/bookings' element={<ProtectedRoute><ExploreBookings /></ProtectedRoute>} />
          <Route path='/vendor/dashboard' element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
          <Route path='/admindashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path='/crowd-forecasting' element={<ProtectedRoute><CrowdForcasting /></ProtectedRoute>} />
          <Route path="/homestays/:id" element={<ProtectedRoute><HomestayDetails /></ProtectedRoute>} />
          <Route path="/places/kaziranga" element={<ProtectedRoute><PlaceDetailsPage /></ProtectedRoute>} />
          <Route path="/vendor/listings" element={<ProtectedRoute><HomestayManagement /></ProtectedRoute>} />
          <Route path ="/vendor/bookings" element={<ProtectedRoute><BookingManagement /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
