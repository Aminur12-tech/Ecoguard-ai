import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Users, DollarSign, Upload, Settings, LogOut,
  User, Home, Map, Award
} from 'lucide-react';
import GuideDashboard from '../components/POIUpload';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('Traveller');
  const [stats, setStats] = useState({ trips: 0, ecoScore: 0, revenue: 0 });

  useEffect(() => {
    // Get role from localStorage (set in login)
    const role = localStorage.getItem('userRole') || 'Traveller';
    console.log(role);
    setUserRole(role);

    // Mock stats - replace with real API later
    if (role === 'Vendor') setStats({ trips: 12, ecoScore: 8.7, revenue: 24500 });
    if (role === 'Guide') setStats({ trips: 28, ecoScore: 9.2, revenue: 15600 });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleAddPOI = () => {
    window.location.href = '/guide-dashboard';
  }

  const RoleDashboard = () => {
    switch (userRole) {
      case 'Traveller':
        return (
          <div>
            <h2 className="text-3xl font-black text-gray-800 mb-8">Welcome Traveller! 🌍</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all">
                <MapPin className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">Plan Next Trip</h3>
                <p>Kaziriranga Eco-Route</p>
                <button className="mt-4 w-full bg-white/20 backdrop-blur-sm py-3 rounded-2xl font-bold hover:bg-white/30 transition-all">
                  Start Planning →
                </button>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all">
                <Award className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">Eco Score</h3>
                <p className="text-3xl font-black">{stats.ecoScore}/10</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-emerald-200 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-emerald-600" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl font-bold hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all">
                  🗺️ Find Routes
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all">
                  📊 Crowd Predict
                </button>
              </div>
            </div>
          </div>
        );

      case 'Vendor':
        return (
          <div>
            <h2 className="text-3xl font-black text-gray-800 mb-8">Vendor Dashboard 💰</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-8 rounded-3xl shadow-2xl">
                <DollarSign className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">₹{stats.revenue}</h3>
                <p>Monthly Revenue</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-2xl">
                <Users className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{stats.trips}</h3>
                <p>Bookings</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl">
                <Award className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{stats.ecoScore}</h3>
                <p>Eco Rating</p>
              </div>
            </div>
            <div className="bg-white/80 p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-6">Dynamic Pricing Active</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl font-bold hover:shadow-xl">
                  💰 Adjust Rates
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl font-bold hover:shadow-xl">
                  📅 View Bookings
                </button>
              </div>
            </div>
          </div>
        );

      case 'Guide':
        return (
          <div>
            <h2 className="text-3xl font-black text-gray-800 mb-8">Guide Dashboard 🗺️</h2>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-12 rounded-3xl shadow-2xl text-center mb-8">
              <Upload className="w-20 h-20 mx-auto mb-6 opacity-90" />
              <h3 className="text-3xl font-black mb-4">Earn 5% Commission</h3>
              <p className="text-xl">Submit Hidden Assam Gems</p>
              <button onClick={handleAddPOI} className="mt-6 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/50">
                + Add New POI
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 p-8 rounded-3xl shadow-xl">
                <h4 className="font-bold mb-4">Your POI Stats</h4>
                <div className="space-y-3 text-sm">
                  <div>Haflong Waterfall: <span className="font-bold text-emerald-600">127 votes</span></div>
                  <div>Panimur Tea: <span className="font-bold text-emerald-600">89 votes</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-2xl">
                <h4 className="font-bold mb-4">Eco Score</h4>
                <div className="text-4xl font-black">{stats.ecoScore}</div>
              </div>
            </div>
          </div>
        );

      case 'Admin':
        return (
          <div>
            <h2 className="text-3xl font-black text-gray-800 mb-8">Admin Control Panel ⚙️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl">
                <Settings className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Platform Stats</h3>
                <div className="text-2xl font-black">12,450 Users</div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl">
                <Users className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Pending POIs</h3>
                <div className="text-2xl font-black">23</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-2xl">
                <Award className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">CO₂ Saved</h3>
                <div className="text-2xl font-black">2,847kg</div>
              </div>
            </div>
            <div className="bg-white/80 p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-6">Admin Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl font-bold hover:shadow-xl">
                  👥 Manage Users
                </button>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl font-bold hover:shadow-xl">
                  🗺️ Approve POIs
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl font-bold hover:shadow-xl">
                  📊 Analytics
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-lg rounded-3xl p-6 mb-8 border border-gray-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-800">EcoGuard AI Dashboard</h1>
                <p className="text-emerald-600 font-semibold">{userRole} Panel</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <RoleDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
